import {Button, IconButton} from '@mui/material';
import React, {memo, useCallback} from 'react';
import {TodolistsType} from './App';
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";
import TaskItem from "./Components/TaskItem";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistsType
}

export const TodoList = memo(({todolist}: PropsType) => {
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolist.id]);
    const dispatch = useDispatch()

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title,todolist.id))
    }, [dispatch,todolist.id])
    const removeTodolist =useCallback( () => {
        dispatch(removeTodolistAC(todolist.id))
    },[dispatch,todolist.id])
    const changeTodolistTitle =useCallback( (title: string) => {
        dispatch(changeTodolistTitleAC(todolist.id,title))
    },[dispatch,todolist.id])
    const onAllClickHandler = useCallback(() =>
        dispatch(changeTodolistFilterAC(todolist.id,"all")
        ),[dispatch,todolist.id]);
    const onActiveClickHandler =useCallback( () =>
        dispatch(changeTodolistFilterAC(todolist.id,"active")
        ),[dispatch,todolist.id]);
    const onCompletedClickHandler =useCallback( () =>
        dispatch(changeTodolistFilterAC(todolist.id,"completed")
        ),[dispatch,todolist.id]);

    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;

    if (todolist.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
    }

    return <div>
        <h3>
            <EditableSpan key={v1()} title={todolist.title} callBack={changeTodolistTitle} />
            <IconButton aria-label="delete" onClick={removeTodolist} size={"small"}>
                <Delete />
            </IconButton>
        </h3>

        <AddItemForm callBack={addTask}/>

        <ul>
            {
                tasksForTodolist.map(t => {
                    return <TaskItem key={t.id} task={t} todolistId={todolist.id}/>
                })
            }
        </ul>
        <div>
            <Button size={"small"} variant={todolist.filter === 'all' ? "outlined" : "contained"} color="secondary" onClick={onAllClickHandler}>All</Button>
            <Button size={"small"} variant={todolist.filter === 'active' ? "outlined":"contained"} color="success" onClick={onActiveClickHandler}>
                Active
            </Button>
            <Button size={"small"} variant={todolist.filter === 'completed' ? "outlined":"contained"} color="error" onClick={onCompletedClickHandler}>
                Completed
            </Button>

        </div>
    </div>
});
