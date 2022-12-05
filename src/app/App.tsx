import React, {useEffect} from 'react';
import './App.css';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import ButtonAppBar from "../Components/ButtonAppBar/ButtonAppBar";
import {useAppDispatch, useAppSelector} from "../state/store";
import {TaskType} from "../api/todolist-api";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../Components/ErrorSnackBar/ErrorSnackBar";
import TodolistsList from "../features/TodolistsList/TodolistsList";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {CircularProgress} from "@mui/material";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const dispatch = useAppDispatch()
    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(()=>{
        dispatch(initializeAppTC())
    },[])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <ButtonAppBar/>
            <ErrorSnackbar/>
            {status === "loading" && <LinearProgress/>}
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={ <TodolistsList/>}/>
                    <Route path={'/login'} element={ <Login/>}/>
                    <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
