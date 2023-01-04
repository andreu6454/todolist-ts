import {TasksStateType} from "../../app/App";
import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "../../features/TodolistsList/tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "../../features/TodolistsList/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/todolist-api";

let startState: TasksStateType = {}

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1', title: 'CSS', status: TaskStatuses.Completed, description: '',
                priority: TaskPriorities.Low, addedDate: '', startDate: '',
                todoListId: 'todolistId1', deadline: '', order: 0
            },
            {
                id: '2', title: 'React', status: TaskStatuses.New, description: '',
                priority: TaskPriorities.Low, addedDate: '', startDate: '',
                todoListId: 'todolistId1', deadline: '', order: 0
            },
            {
                id: '3', title: 'task3', status: TaskStatuses.New, description: '',
                priority: TaskPriorities.Low, addedDate: '', startDate: '',
                todoListId: 'todolistId1', deadline: '', order: 0
            }
        ],
        'todolistId2': [
            {
                id: '1', title: '2task1', status: TaskStatuses.Completed, description: '',
                priority: TaskPriorities.Low, addedDate: '', startDate: '',
                todoListId: 'todolistId1', deadline: '', order: 0
            },
            {
                id: '2', title: '2task2', status: TaskStatuses.New, description: '',
                priority: TaskPriorities.Low, addedDate: '', startDate: '',
                todoListId: 'todolistId1', deadline: '', order: 0
            },
            {
                id: '3', title: '3task3', status: TaskStatuses.New, description: '',
                priority: TaskPriorities.Low, addedDate: '', startDate: '',
                todoListId: 'todolistId1', deadline: '', order: 0
            }
        ],
    }
})
test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC({taskId: '2', todolistId: 'todolistId2'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
    const task: TaskType = {
        id: '4', title: '2task4', status: TaskStatuses.New, description: '',
        priority: TaskPriorities.Low, addedDate: '', startDate: '',
        todoListId: 'todolistId1', deadline: '', order: 0
    }
    const action = addTaskAC({task})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('2task4')
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
    const action = updateTaskAC({taskId: '2', model: {status: TaskStatuses.New}, todolistId: 'todolistId2'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed)
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New)
})

test('title of specified task should be changed', () => {
    const action = updateTaskAC({taskId: '2', model: {title: 'taskTitle'}, todolistId: 'todolistId2'})

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('React')
    expect(endState['todolistId2'][1].title).toBe('taskTitle')
})

test('new array should be added when new todolist is added', () => {

    const action = addTodolistAC({
        todolist: {
            id: 'newId', title: 'newTitle', order: 0, addedDate: ''
        }
    })
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')

    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC({id: 'todolistId2'})

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})