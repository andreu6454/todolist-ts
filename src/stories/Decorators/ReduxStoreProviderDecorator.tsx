import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {combineReducers} from "redux";
import {tasksReducer} from "../../features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../../features/TodolistsList/todolists-reducer";
import {TaskPriorities} from "../../api/todolist-api";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "../../app/app-reducer";
import {authReducer} from "../../features/Login/auth-reducer";
import {BrowserRouter} from "react-router-dom";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to buy?", filter: "all", addedDate: "", order: 0, entityStatus: "idle"},
        {id: "todolistId2", title: "What to learn?", filter: "all", addedDate: "", order: 0, entityStatus: "idle"}
    ],
    tasks: {
        "todolistId1": [
            {
                id: '1',
                title: 'Milk',
                status: 0,
                addedDate: "",
                order: 0,
                todoListId: "todolistId1",
                deadline: "",
                startDate: "",
                description: "",
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: 'Car',
                status: 0,
                addedDate: "",
                order: 0,
                todoListId: "todolistId1",
                deadline: "",
                startDate: "",
                description: "",
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: 'Water',
                status: 0,
                addedDate: "",
                order: 0,
                todoListId: "todolistId1",
                deadline: "",
                startDate: "",
                description: "",
                priority: TaskPriorities.Low
            }],
        "todolistId2": [
            {
                id: '1',
                title: 'CSS',
                status: 0,
                addedDate: "",
                order: 0,
                todoListId: "todolistId1",
                deadline: "",
                startDate: "",
                description: "",
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: 'JS',
                status: 0,
                addedDate: "",
                order: 0,
                todoListId: "todolistId1",
                deadline: "",
                startDate: "",
                description: "",
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: 'React',
                status: 0,
                addedDate: "",
                order: 0,
                todoListId: "todolistId1",
                deadline: "",
                startDate: "",
                description: "",
                priority: TaskPriorities.Low
            }]
    },
    app: {
        status: "idle",
        error: null,
        isInitialized: false,
    },
    auth: {
        isLoggedIn: false
    }
}

export const storybookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})
export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storybookStore}> {storyFn()}</Provider>
}
export const BrowserRouterDecorator = (storyFn: () => JSX.Element) => {
    return <BrowserRouter> {storyFn()}</BrowserRouter>
}