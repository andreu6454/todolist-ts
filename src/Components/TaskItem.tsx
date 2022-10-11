import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {useDispatch} from "react-redux";
import {TaskType} from "../TodoList";

type TaskItemType = {
    task: TaskType,
    todolistId: string
}

const TaskItem = (props: TaskItemType) => {
    const dispatch = useDispatch()

    const onClickHandler = () =>dispatch(removeTaskAC(props.task.id, props.todolistId))

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId));
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId));
    },[dispatch,props.task.id,props.todolistId])

    return (
        <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox checked={props.task.isDone} onChange={onChangeHandler} defaultChecked size="small"/>
            <EditableSpan title={props.task.title} callBack={onTitleChangeHandler}/>
            <IconButton aria-label="delete" onClick={onClickHandler} size={"small"}>
                <Delete />
            </IconButton>
        </li>
    );
};

export default TaskItem;