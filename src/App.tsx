import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./Components/AddItemForm";
import {Container, Grid, Paper} from '@mui/material';
import ButtonAppBar from "./Components/ButtonAppBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTodolistAC} from "./state/todolists-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists);

    const dispatch = useDispatch()

    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatch(action)
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <div>
                        <h3> Create New Todolist </h3>
                        <AddItemForm callBack={addTodolist}/>
                    </div>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map( el => {
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
