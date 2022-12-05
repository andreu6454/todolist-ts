import React, {useCallback, useEffect} from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {TodoList} from "./Todolist/TodoList";
import {addTodolistTC, fetchTodolistsTC, TodolistDomainType} from "./todolists-reducer";
import {useAppDispatch, useAppSelector} from "../../state/store";
import {AddItemForm} from "../../Components/AddItemForm/AddItemForm";
import {v1} from "uuid";
import {Navigate} from "react-router-dom";

const TodolistsList = () => {
    useEffect(() => {
        if(!isLoggined){
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists);
    const isLoggined = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    if(!isLoggined){
        return <Navigate to={'/login'}/>
    }
    return <>
        <Grid container style={{padding: "20px"}}>
            <div>
                <h3> Create New Todolist </h3>
                <AddItemForm key={v1()} callBack={addTodolist}/>
            </div>
        </Grid>
        <Grid container spacing={3}>
            {todolists.map((el) => {
                return (<Grid item>
                        <Paper style={{padding: "10px"}} variant="outlined">
                            <TodoList
                                key={el.id}
                                todolist={el}
                            />
                        </Paper>
                    </Grid>
                )
            })
            }
        </Grid>
    </>
};

export default TodolistsList;