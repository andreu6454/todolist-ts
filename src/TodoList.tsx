import {Button, IconButton} from '@mui/material';
import React, {memo, useCallback, useEffect} from 'react';
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "./state/store";
import {addTaskTC, fetchTasksTC} from "./state/tasks-reducer";
import {
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    removeTodolistTC,
    TodolistDomainType,
} from "./state/todolists-reducer";
import TaskItem from "./Components/TaskItem";
import {v1} from "uuid";
import {TaskStatuses, TaskType} from "./api/todolist-api";


type PropsType = {
    todolist: TodolistDomainType
}

export const TodoList = memo(({todolist}: PropsType) => {

    useEffect(() => {
        dispatch(fetchTasksTC(todolist.id))
    }, [])

    let tasks = useAppSelector<Array<TaskType>>(state => state.tasks[todolist.id]);
    const dispatch = useAppDispatch()

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(title, todolist.id))
    }, [dispatch, todolist.id])
    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistTC(todolist.id))
    }, [dispatch, todolist.id])
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleTC(todolist.id, title))
    }, [dispatch, todolist.id])
    const onAllClickHandler = useCallback(() =>
        dispatch(changeTodolistFilterAC(todolist.id, "all")
        ), [dispatch, todolist.id]);
    const onActiveClickHandler = useCallback(() =>
        dispatch(changeTodolistFilterAC(todolist.id, "active")
        ), [dispatch, todolist.id]);
    const onCompletedClickHandler = useCallback(() =>
        dispatch(changeTodolistFilterAC(todolist.id, "completed")
        ), [dispatch, todolist.id]);

    let allTodolistTasks = tasks;
    let tasksForTodolist = allTodolistTasks;

    if (todolist.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>
        <h3>
            <EditableSpan key={v1()} title={todolist.title} callBack={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist} size={"small"}>
                <Delete/>
            </IconButton>
        </h3>

        <AddItemForm callBack={addTask}/>

        <ul>
            {
                tasksForTodolist.map(t => {
                    return <TaskItem key={t.id} task={t}/>
                })
            }
        </ul>
        <div>
            <Button size={"small"} variant={todolist.filter === 'all' ? "outlined" : "contained"} color="secondary"
                    onClick={onAllClickHandler}>All</Button>
            <Button size={"small"} variant={todolist.filter === 'active' ? "outlined" : "contained"} color="success"
                    onClick={onActiveClickHandler}>
                Active
            </Button>
            <Button size={"small"} variant={todolist.filter === 'completed' ? "outlined" : "contained"} color="error"
                    onClick={onCompletedClickHandler}>
                Completed
            </Button>

        </div>
    </div>
});
