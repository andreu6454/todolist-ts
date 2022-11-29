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
        const taskId = "8692137b-930e-4618-b4ae-88b386e78e39"
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



