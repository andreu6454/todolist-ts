import React from 'react';
import './App.css';
import TodoList from "./TodoList";

function App() {
    return (
        <div className="App">
            <TodoList title={"Learn React"}/>
            <TodoList title={"Learn Typescript"}/>
            <TodoList title={"Learn English"}/>

        </div>
    );
}

export default App;
