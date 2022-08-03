import React, {FC, useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskID: string) => void;
    changeFilter: (filter: FilterValuesType) => void;
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props: TodoListPropsType) => {

    const [title, setTitle] = useState<string>("New Task")

    const tasksItems = props.tasks.map((task: TaskType) => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}> x</button>
            </li>
        )
    })

    const onClickAddTask = () => {
        title !== "" && props.addTask(title)
        setTitle("")
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onClickAddTask()
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickSetFilterCreator = (filter : FilterValuesType) => () => {
            props.changeFilter(filter)
        }


    return (
        <div>
            <h3> {props.title} </h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyDown={onKeyDownAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {tasksItems}
            </ul>
            <div>
                <button onClick={onClickSetFilterCreator("all")}>All
                </button>
                <button onClick={onClickSetFilterCreator("active")}>Active
                </button>
                <button onClick={onClickSetFilterCreator("completed")}>Completed
                </button>
            </div>
        </div>
    );
};


export default TodoList;
