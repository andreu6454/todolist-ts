import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";


export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const toDoListTitle = " Learn React"
    const [tasks, setTasks] = useState<Array <TaskType>>([
        {id:1, title:"HTML", isDone: true},
        {id:2, title:"CSS", isDone: true},
        {id:3, title:"TS", isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(task => task.id !==taskID))
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
