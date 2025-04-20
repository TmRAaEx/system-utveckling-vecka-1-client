import {IItem, ITodo} from "@interfaces/ITodo.ts";

interface TodoItemProps {
    item: IItem;
    todoList: ITodo;
    onStatusChange: (item: IItem, checked: boolean, todoList: ITodo) => void;
    highlight?: boolean;
}

export default function TodoItem({item, todoList, onStatusChange, highlight}: TodoItemProps) {
    console.log(item)
    return (
        <li
            className={`
                text-dark-font flex flex-row min-w-[200px] justify-between p-1 transition
                ${highlight ? "text-green-500 animate-pulse rounded" : ""}
            `}
        >
            <p>{item.title}</p>
            <div className={"relative group inline-block cursor-pointer"}>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                    <path
                        fill="#FFFFFF"
                        d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z">
                    </path>
                </svg>
                <div
                    className="absolute z-10 bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-3 py-2 rounded-md text-sm text-white bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <p>{item.status.changed_by}</p>
                    <p>{item.status.changed_at.toString().split("T")[0]}</p>
                </div>

            </div>
            <input
                type={"checkbox"}
                checked={item.status?.value === "klar"}
                onChange={(e) => onStatusChange(item, e.target.checked, todoList)}
            />
        </li>
    );
}