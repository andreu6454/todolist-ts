import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TodoList} from "../features/TodolistsList/TodoList";
import {AddItemForm} from "../Components/AddItemForm/AddItemForm";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import ButtonAppBar from "../Components/ButtonAppBar/ButtonAppBar";
import {useAppDispatch, useAppSelector} from "../state/store";
import {addTodolistTC, fetchTodolistsTC, TodolistDomainType} from "../features/TodolistsList/todolists-reducer";
import {v1} from "uuid";
import {TaskType} from "../api/todolist-api";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../Components/ErrorSnackBar/ErrorSnackBar";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    let todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists);
    let status = useAppSelector<RequestStatusType>(state => state.app.status)

    const dispatch = useAppDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    return (
        <div className="App">
            <ButtonAppBar/>
            <ErrorSnackbar/>
            {status === "loading" && <LinearProgress/>}
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <div>
                        <h3> Create New Todolist </h3>
                        <AddItemForm key={v1()} callBack={addTodolist}/>
                    </div>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {
                        return (<Grid item>
                                <Paper style={{padding: "10px"}} variant="outlined">
                                    <TodoList
                                        key={el.id}
                                        todolist={el}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
