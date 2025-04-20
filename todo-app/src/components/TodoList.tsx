import {IItem, ITodo} from "@interfaces/ITodo.ts";
import TodoItem from "@components/TodoItem.tsx";

interface TodoProps {
    todoList: ITodo;
    onStatusChange: (item: IItem, checked: boolean, todoList: ITodo) => void;
    recentlyUpdated: string[];
}

export default function TodoList({todoList, onStatusChange, recentlyUpdated}: TodoProps) {
    return (
        <div className={"bg-dark w-fit"}>
            <div className={"flex flex-col p-4"}>
                <h1 className={"text-dark-font text-xl"}>{todoList.title}</h1>
                <ul>
                    {todoList.items.map((item) => (
                        <TodoItem item={item} todoList={todoList} onStatusChange={onStatusChange}
                                  highlight={recentlyUpdated.includes(item._id)}/>))
                    }
                </ul>
            </div>
        </div>
    );
}
