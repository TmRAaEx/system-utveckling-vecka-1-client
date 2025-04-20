import {IItem, ITodo} from "@interfaces/ITodo.ts";

interface TodoItemProps {
    item: IItem;
    todoList: ITodo;
    onStatusChange: (item: IItem, checked: boolean, todoList: ITodo) => void;
    highlight?: boolean;
}

export default function TodoItem({item, todoList, onStatusChange, highlight}: TodoItemProps) {
    return (
        <li
            className={`
                text-dark-font flex flex-row min-w-[200px] justify-between p-1 transition
                ${highlight ? "text-green-500 animate-pulse rounded" : ""}
            `}
        >
            <p>{item.title}</p>
            <input
                type={"checkbox"}
                checked={item.status?.value === "klar"}
                onChange={(e) => onStatusChange(item, e.target.checked, todoList)}
            />
        </li>
    );
}