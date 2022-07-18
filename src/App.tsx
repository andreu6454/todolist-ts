import React from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

function App() {
    const tasks: Array <TaskType> = [
        {id:1, title:"HTML", isDone: true},
        {id:2, title:"CSS", isDone: true},
        {id:3, title:"TS", isDone: false}
    ]
    return (
        <div className="App">
            <TodoList
                title={"Learn React"}
                tasks={tasks}
            />
            <TodoList title={"Learn Typescript"} tasks={tasks}/>
            <TodoList title={"Learn English"} tasks={tasks}/>

        </div>
    );
}

export default App;
