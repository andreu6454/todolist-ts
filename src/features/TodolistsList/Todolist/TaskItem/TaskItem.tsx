import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../Components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useAppDispatch} from "../../../../state/store";
import {removeTaskTC, updateTaskTC} from "../../tasks-reducer";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";


const TaskItem = memo((props: { task: TaskType }) => {
    const dispatch = useAppDispatch()

    const onClickHandler = useCallback(() => dispatch(removeTaskTC({
        todolistId: props.task.todoListId,
        taskId: props.task.id
    })), [dispatch, props.task.id, props.task.todoListId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        let newStatus
        newIsDoneValue ? newStatus = TaskStatuses.Completed : newStatus = TaskStatuses.New
        dispatch(updateTaskTC(props.task.id, {status: newStatus}, props.task.todoListId));
    }, [dispatch, props.task.id, props.task.todoListId])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        if(props.task.title !== newValue){
            dispatch(updateTaskTC(props.task.id, {title: newValue}, props.task.todoListId));
        }
    }, [dispatch, props.task.id, props.task.todoListId])

    return (
        <li className={props.task.status === TaskStatuses.Completed ? "isDone" : ""}>
            <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onChangeHandler} defaultChecked
                      size="small"/>
            <EditableSpan title={props.task.title} callBack={onTitleChangeHandler}/>
            <IconButton aria-label="delete" onClick={onClickHandler} size={"small"}>
                <Delete/>
            </IconButton>
        </li>
    );
});

export default TaskItem;