import {useEffect, useState} from "react";
import {IItem, ITodo} from "@interfaces/ITodo.ts";
import apiClient from "@services/requests.ts";
import {socket} from "../socket.ts";


export const useTodo = () => {
    const [error, setError] = useState<string | null>();
    const [todos, setTodos] = useState<ITodo[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [recentlyUpdatedItemIds, setRecentlyUpdatedItemIds] = useState<string[]>([]);


    useEffect(() => {
        const getData = async () => {
            await getTodos()
        }
        getData()


    }, [])


    socket.on("todo:updated", (updatedTodo: ITodo) => {
        // Hämta aktuell todo innan vi sätter ny
        const prevTodo = todos.find(t => t._id === updatedTodo._id);
        if (!prevTodo) return;

        // Jämför item-statusar
        const updatedItemIds = updatedTodo.items
            .filter(updatedItem => {
                const oldItem = prevTodo.items.find(i => i._id === updatedItem._id);
                return oldItem && oldItem.status?.value !== updatedItem.status?.value;
            })
            .map(item => item._id);

        // Sätt highlight på ändrade items
        setRecentlyUpdatedItemIds(updatedItemIds);

        // Ta bort highlight efter 1.2s
        setTimeout(() => {
            setRecentlyUpdatedItemIds([]);
        }, 1000);

        // Uppdatera todos
        setTodos(prevState =>
            prevState.map(todo =>
                todo._id === updatedTodo._id ? updatedTodo : todo
            )
        );
    });


    const getTodos = async () => {
        setLoading(true);
        try {
            const todoResponse = await apiClient.get<ITodo[]>("/todos")
            setTodos(todoResponse)
        } catch (error) {
            setError((error instanceof Error) ? error.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    }


    const updateTodo = async (item: IItem, status: any, user: any, todo: ITodo) => {
        setLoading(true);
        const payload = {
            updatedItem: {
                _id: item._id,
                title: item.title,
                status: {
                    changed_by: user._id,
                    value: status,
                },
            },
        }
        try {


            // uppdatera lokala todo-listan
            const updatedItems = todo.items.map((i) =>
                i._id === item._id
                    ? {...i, status: {...i.status, value: status, changed_by: user._id}}
                    : i
            );

            setTodos(prevState => prevState.map(current =>
                (current._id == todo._id ? {...current, items: updatedItems} : current)
            ))
            socket.emit("todo:update", {...todo, items: updatedItems})
            apiClient.patch(`/todos/update/${todo._id}`, payload);
        } catch (error) {
            setError((error instanceof Error) ? error.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    }

    return {todos, loading, error, recentlyUpdatedItemIds, getTodos, updateTodo}
}