import React, {FC, useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskID: string) => void;
    changeFilter: (filter: FilterValuesType) => void;
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>("New Task")
    const [error, setError] = useState<string| null>(null)

    const tasksItems = props.tasks.map((task: TaskType) => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id ,e.currentTarget.checked);
        }
        return (
            <li key={task.id} className={task.isDone ? "is-done": ""}>
                <input type="checkbox"
                       onChange={onChangeHandler}
                       checked={task.isDone}
                />
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}> x</button>
            </li>
        )
    })


    const onClickAddTask = () => {
        if (title.trim() !== ""){
            props.addTask(title.trimLeft());
            setTitle("");
        } else {
            setError("Field is required");
        }

    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        e.key === "Enter" && onClickAddTask();
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onClickSetFilterCreator = (filter : FilterValuesType) => () => {
            props.changeFilter(filter);
        }

    return (
        <div>
            <h3> {props.title} </h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                    className={error ? "error" : ""}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onClickSetFilterCreator("all")}>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onClickSetFilterCreator("active")}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onClickSetFilterCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;
