import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const toDoListTitle = " Learn React"
    const [tasks, setTasks] = useState<Array <TaskType>>([
        {id: v1(), title:"HTML", isDone: true},
        {id: v1(), title:"CSS", isDone: true},
        {id: v1(), title:"TS", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([...tasks, newTask])
    }

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(task => task.id !== taskID))
    }

    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter);
    }

    let tasksForRender ;

    switch (filter){
        case "completed":
            tasksForRender = tasks.filter(task => task.isDone)
            break
        case "active":
            tasksForRender = tasks.filter(task => !task.isDone)
            break
        default:
            tasksForRender = tasks
            break
    }

    return (
        <div className="App">
            <TodoList
                title={toDoListTitle}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />

        </div>
    );
}

export default App;
