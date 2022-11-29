import React, {useEffect, useState} from "react";
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'task-API'
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "84240294-a8d1-4e0d-a854-0b1598df0e31"
        todolistApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "84240294-a8d1-4e0d-a854-0b1598df0e31"
        const title = "New Task"
        todolistApi.createTask(todolistId,title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "84240294-a8d1-4e0d-a854-0b1598df0e31"
        const taskId = "38bd2a20-e46c-4d94-911f-bb284442a147"
        todolistApi.deleteTask(todolistId,taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "84240294-a8d1-4e0d-a854-0b1598df0e31"
        const taskId = "49dddeae-ef43-4d5c-a69e-a42c28571432"
        const title = "new title"
        todolistApi.updateTask(todolistId,taskId,title)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}



