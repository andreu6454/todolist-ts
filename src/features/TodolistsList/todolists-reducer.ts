import {Dispatch} from 'redux'
import {ResultStatus, todolistsAPI, TodolistType} from "../../api/todolist-api";
import {RequestStatusType, setStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodolistDomainType> = []

const todolistSlice = createSlice({
    name: "todolist",
    initialState: initialState,
    reducers: {
        removeTodolistAC: (state, action: PayloadAction<{ id: string }>) => {
            const index = state.findIndex((tl) => tl.id === action.payload.id)
            if(index >= 0){
                state.splice(index,1)
            }
        },
        addTodolistAC: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: "idle"})
        },
        changeTodolistTitleAC: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const index = state.findIndex((tl) => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC: (state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) => {
            const index = state.findIndex((tl) => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodolistsAC: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        },
        changeTodoListEntityStatusAC: (state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) => {
            const index = state.findIndex((tl) => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        }
    }
})
export const todolistsReducer = todolistSlice.reducer

// actions
export const {removeTodolistAC,addTodolistAC,changeTodolistTitleAC,
    changeTodolistFilterAC, setTodolistsAC,changeTodoListEntityStatusAC} = todolistSlice.actions

// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC({todolists:res.data}))
                dispatch(setStatusAC({status: 'idle'}))
            })
            .catch((e) => {
                handleServerNetworkError(e, dispatch)
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        dispatch(changeTodoListEntityStatusAC({id: todolistId, entityStatus: "loading"}))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC({id:todolistId}))
                dispatch(setStatusAC({status: 'idle'}))
                if (res.data.resultCode === 1) {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch((e) => {
            handleServerNetworkError(e.message, dispatch)
            dispatch(changeTodoListEntityStatusAC({id: todolistId, entityStatus: "failed"}))
        })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === ResultStatus.OK) {
                    dispatch(addTodolistAC({todolist:res.data.data.item}))
                    dispatch(setStatusAC({status: 'idle'}))
                } else {
                    handleServerAppError<{ item: TodolistType }>(res.data, dispatch)
                }
            })
            .catch((e) => {
                handleServerNetworkError(e, dispatch)
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC({status: 'loading'}))
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC({id: id, title: title}))
                dispatch(setStatusAC({status: 'idle'}))
            })
            .catch((e) => {
                handleServerNetworkError(e, dispatch)
            })
    }
}

// types

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}