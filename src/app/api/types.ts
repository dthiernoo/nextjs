export type Todo = {
    id: number,
    title: string,
    description?: string,
    completed: boolean
}

export type Context = {
    params: {
        todoId: string
    }
}