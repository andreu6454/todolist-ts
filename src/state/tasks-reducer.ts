import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    todolistId: string
    isDone: boolean
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    todolistId: string
    title: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType;

let initialState: TasksStateType = {}

export const tasksReducer = (state= initialState, action: ActionsType): TasksStateType => {
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
        case "CHANGE-TASK-STATUS":{
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

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todolistId, taskId }
}
export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string,
                                   isDone: boolean,
                                   todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string,
                                  title: string,
                                  todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}