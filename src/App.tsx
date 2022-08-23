import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from 'uuid';
import {AddItemForm} from "./Components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}
type TasksStateType = {
    [key:string]: Array<TaskType>
}

function App() {
    const todolistID1 = v1();
    const todolistID2 = v1();
    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const updateTask = (todolistId: string, taskId: string, newTitle: string) =>{
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId? {...el, title: newTitle} : el)})
    }
    const updateTodolist = (todolistId: string,newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistId? {...el, title: newTitle}: el))
    }
    const addTodoList = (newTitle: string) =>{
        const newTodolistId = v1()
        const newTodolist:TodolistsType = {id: newTodolistId, title: newTitle, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [newTodolistId]: [{id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true}]});
    }
    const removeTask = (todolistId: string, taskId: string) =>{
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== taskId)});
    }
    const addTask = (todolistId: string, title: string) =>{
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]});
    }
    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) =>{
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)
        });
    }
    const changeFilter = (todolistId: string, value: FilterValuesType) =>{
        setTodolists(todolists.map((el) => el.id === todolistId ? {...el, filter: value} : el))
    }
    const removeTodolist = (todolistId: string) =>{
        setTodolists(todolists.filter(el => el.id !== todolistId))
        delete tasks[todolistId]
    }

    return (
        <div className="App">
            <div>
                <h3> Create New Todolist </h3>
                <AddItemForm callBack={addTodoList}/>
            </div>
            {todolists.map((el) => {

                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }
                return (
                    <TodoList
                        key={el.id}
                        todolistId={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodolist={removeTodolist}
                        updateTask={updateTask}
                        updateTodolist={updateTodolist}
                    />
                )
            })}
        </div>
    );
}

export default App;
