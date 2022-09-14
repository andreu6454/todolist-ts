import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskACType | AddTaskACType
    | ChangeTaskStatusACType | ChangeTaskTitleACType
    | AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
            }
        }
        case "ADD-TASK":{

            const newTask = {id:v1(), title: action.title, isDone: false}

            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId]]
            }
        }
        case "CHANGE-Task-STATUS":{
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(
                    task => task.id === action.taskId? {...task, isDone: action.isDone}: task
                )
            }
        }
        case "CHANGE-TASK-TITLE":{
            return {
                ...state,
                [action.todolistId]:state[action.todolistId].map(
                    task => task.id === action.taskId? {...task, title: action.title} : task
                )
            }
        }
        case "ADD-TODOLIST":{
            return {
                ...state,
                [action.todolistId]:[]
            }
        }
        case "REMOVE-TODOLIST":{
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId,
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD-TASK',
        title,
        todolistId
    } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return{
        type: "CHANGE-Task-STATUS",
        taskId,
        isDone,
        todolistId
    } as const

}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return{
        type: 'CHANGE-TASK-TITLE',
        title,
        taskId,
        todolistId
    } as const
}
