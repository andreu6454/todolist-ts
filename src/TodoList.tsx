import {Button, Checkbox, IconButton} from '@mui/material';
import React, {ChangeEvent, memo, useCallback} from 'react';
import {TodolistsType} from './App';
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";

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
    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id,"all")),[dispatch,todolist.id]);
    const onActiveClickHandler =useCallback( () => dispatch(changeTodolistFilterAC(todolist.id,"active")),[dispatch,todolist.id]);
    const onCompletedClickHandler =useCallback( () => dispatch(changeTodolistFilterAC(todolist.id,"completed")),[dispatch,todolist.id]);

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
            <EditableSpan title={todolist.title} callBack={changeTodolistTitle} />
            <IconButton aria-label="delete" onClick={removeTodolist} size={"small"}>
                <Delete />
            </IconButton>
        </h3>

        <AddItemForm callBack={addTask}/>

        <ul>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () =>dispatch(removeTaskAC(t.id, todolist.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, todolist.id));
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, todolist.id));
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox checked={t.isDone} onChange={onChangeHandler} defaultChecked size="small"/>
                        <EditableSpan title={t.title} callBack={onTitleChangeHandler}/>
                        <IconButton aria-label="delete" onClick={onClickHandler} size={"small"}>
                            <Delete />
                        </IconButton>
                    </li>
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
