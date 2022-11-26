import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../../state/tasks-reducer";
import {todolistsReducer} from "../../state/todolists-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to buy?", filter: "all"},
        {id: "todolistId2", title: "What to learn?", filter: "all"}
    ],
    tasks:{
        "todolistId1":[
            {id: '1', title: 'Milk', isDone: true},
            {id: '2', title: 'Car', isDone: false},
            {id: '3', title: 'Water', isDone: false}],
        "todolistId2":[
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}]
    }
}

export const storybookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)
export const ReduxStoreProviderDecorator = (storyFn: () => JSX.Element) => {
    return <Provider store={storybookStore}> {storyFn()}</Provider>
}