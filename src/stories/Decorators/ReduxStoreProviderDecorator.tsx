import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../../state/tasks-reducer";
import {todolistsReducer} from "../../state/todolists-reducer";
import {TaskPriorities} from "../../api/todolist-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState:AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to buy?", filter: "all", addedDate: "", order: 0},
        {id: "todolistId2", title: "What to learn?", filter: "all", addedDate: "", order: 0}
    ],
    tasks:{
        "todolistId1":[
            {id: '1', title: 'Milk', status: 0, addedDate: "", order: 0, todoListId: "todolistId1", deadline: "", startDate: "", description:"", priority: TaskPriorities.Low},
            {id: '2', title: 'Car', status: 0, addedDate: "", order: 0, todoListId: "todolistId1", deadline: "", startDate: "", description:"", priority: TaskPriorities.Low},
            {id: '3', title: 'Water', status: 0, addedDate: "", order: 0, todoListId: "todolistId1", deadline: "", startDate: "", description:"", priority: TaskPriorities.Low}],
        "todolistId2":[
            {id: '1', title: 'CSS',status: 0, addedDate: "", order: 0, todoListId: "todolistId1", deadline: "", startDate: "", description:"", priority: TaskPriorities.Low},
            {id: '2', title: 'JS', status: 0, addedDate: "", order: 0, todoListId: "todolistId1", deadline: "", startDate: "", description:"", priority: TaskPriorities.Low},
            {id: '3', title: 'React', status: 0, addedDate: "", order: 0, todoListId: "todolistId1", deadline: "", startDate: "", description:"", priority: TaskPriorities.Low}]
    }
}

export const storybookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)
export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storybookStore}> {storyFn()}</Provider>
}