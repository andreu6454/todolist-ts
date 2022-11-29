import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'd8adfd60-620f-47ba-87c1-aaf7fa3e0e58'
    }
})

export const todolistApi = {

    getToDoLists(){
        return instance.get<Array<ToDoListType>>('/todo-lists')
    },

    createToDoList(title: string){
        return instance.post<ResponseType<{item:ToDoListType}>>('/todo-lists',{title: title})
    },

    deleteToDoList(id: string) {
        return instance.delete<ResponseType>(`/todo-lists/${id}`)
    },

    updateToDoList(id: string, title: string){
        return instance.put<ResponseType>(`/todo-lists/${id}`, {title: title})
    },

    getTasks(todolistId: string){
        return instance.get<ResponceGetTasktype>(`/todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string){
        return instance.post<ResponseType>(`/todo-lists/${todolistId}/tasks`,{title})
    },

    deleteTask(todolistId: string, taskId:string){
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },

    updateTask(todolistId: string, taskId: string, title: string){
        return instance.put<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`,{title})
    }
}

type ToDoListType = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number
}
type TaskType = {
    "id": string,
    "title": string,
    "description": null | string,
    "todoListId": string,
    "order": number,
    "status": number,
    "priority": number,
    "startDate": null | string,
    "deadline": null | string,
    "addedDate": string
}
type ResponseType<T = {}> = {
    resultCode: number,
    fieldsErrors: [],
    messages: Array<string>,
    data: T,
}

type ResponceGetTasktype = {
    data: Array<TaskType>,
    error: null | string,
    totalCount: number
}