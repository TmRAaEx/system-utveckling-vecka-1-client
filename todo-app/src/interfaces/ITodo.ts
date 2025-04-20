export interface IStatus {
    value: "ej klar" | "klar";
    changed_by: string // referens till User
    changed_at: Date;
}

export interface IItem {
    _id: string;
    title: string;
    status: IStatus;
}

export interface ITodo {
    _id: string;
    title: string;
    items: IItem[];
    createdAt?: Date;
    updatedAt?: Date;
}
