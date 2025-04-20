import TodoList from "@components/TodoList.tsx";
import {useTodo} from "@hooks/useTodo.ts";
import {IItem, IStatus, ITodo} from "@interfaces/ITodo.ts";

const user = {
    _id: "67ff6ce29d388a4716a9aaca",
    name: "TmRAaEx",
    email: "tmraaex@gmail.com",
};

export default function Home() {
    const {todos, loading, error, updateTodo, recentlyUpdatedItemIds} = useTodo();

    const handleStatusChange = async (item: IItem, checked: boolean, todoList: ITodo) => {
        const newStatus: IStatus["value"] = checked ? "klar" : "ej klar";
        await updateTodo(item, newStatus, user, todoList);
    };

    return (
        <>
            {loading && <>Loading...</>}
            {error && <>{error}</>}
            <ul className={"flex flex-col"}>
                {todos.map((todoList) => (
                    <li key={todoList._id}>
                        <TodoList todoList={todoList} onStatusChange={handleStatusChange} recentlyUpdated={recentlyUpdatedItemIds}/>
                    </li>
                ))}
            </ul>
        </>
    );
}
