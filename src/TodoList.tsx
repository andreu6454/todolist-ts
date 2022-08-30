import {Button, Checkbox, IconButton} from '@mui/material';
import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";
import {Delete} from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    updateTask:(todolistId: string, taskId: string ,newTitle: string) => void
    updateTodolist:(todolistId: string,newTitle: string) => void
    filter: FilterValuesType
}

export function TodoList(props: PropsType) {
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const updateTodolistHandler = (newTitle: string) => {
        props.updateTodolist(props.todolistId, newTitle)
    }
    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todolistId,newTitle)
    }
    const updateTaskHandler = (taskId:string , newTitle: string ) => {
        props.updateTask(props.todolistId, taskId, newTitle)
    }

    const onAllClickHandler = () => props.changeFilter(props.todolistId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistId, "completed");



    return <div>
        <h3>
            <EditableSpan title={props.title} callBack={updateTodolistHandler} />
            <IconButton aria-label="delete" onClick={removeTodolistHandler} size={"small"}>
                <Delete />
            </IconButton>
        </h3>

        <AddItemForm callBack={addTaskHandler}/>

        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(props.todolistId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox checked={t.isDone} onChange={onChangeHandler} defaultChecked size="small"/>
                        <EditableSpan title={t.title} callBack={(newTitle) => updateTaskHandler(t.id, newTitle)}/>
                        <IconButton aria-label="delete" onClick={onClickHandler} size={"small"}>
                            <Delete />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button size={"small"} variant={props.filter === 'all' ? "outlined" : "contained"} color="secondary" onClick={onAllClickHandler}>All</Button>
            <Button size={"small"} variant={props.filter === 'active' ? "outlined":"contained"} color="success" onClick={onActiveClickHandler}>
                Active
            </Button>
            <Button size={"small"} variant={props.filter === 'completed' ? "outlined":"contained"} color="error" onClick={onCompletedClickHandler}>
                Completed
            </Button>

        </div>
    </div>
}
