import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import ButtonAppBar from "../Components/ButtonAppBar/ButtonAppBar";
import {useAppSelector} from "../state/store";
import {TaskType} from "../api/todolist-api";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../Components/ErrorSnackBar/ErrorSnackBar";
import TodolistsList from "../features/TodolistsList/TodolistsList";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let status = useAppSelector<RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <ButtonAppBar/>
            <ErrorSnackbar/>
            {status === "loading" && <LinearProgress/>}
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}

export default App;
