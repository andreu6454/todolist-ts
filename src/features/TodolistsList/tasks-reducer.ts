import {Dispatch} from 'redux'
import {
    ResultStatus,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from "../../api/todolist-api";
import {AppRootStateType} from "../../state/store";
import {setErrorAC, setStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "./todolists-reducer";

const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk<any, { todolistId: string }, { rejectValue: string }>(
    'fetchTasks', async ({todolistId}, thunkAPI) => {
        try {
            const response = await todolistsAPI.getTasks(todolistId);
            return response.data;
        } catch (error) {
            return handleServerNetworkError(error, thunkAPI);
        }
    }
)
export const removeTaskTC = createAsyncThunk<any, { todolistId: string, taskId: string }, { rejectValue: string }>(
    'removeTask', async ({todolistId, taskId}, thunkAPI) => {
        return todolistsAPI.deleteTask(todolistId, taskId)
            .then(response => ({todolistId, taskId}))
            .catch(error => handleServerNetworkError(error, thunkAPI))
    }
)
// export const fetchTasksTC_ = (todolistId: string) => (dispatch: Dispatch) => {
//     dispatch(setStatusAC({status: 'loading'}))
//     todolistsAPI.getTasks(todolistId)
//         .then((res) => {
//             const tasks = res.data.items
//             const action = setTasksAC({tasks, todolistId})
//             dispatch(action)
//             dispatch(setStatusAC({status: 'idle'}))
//         })
//         .catch((e) => {
//             //handleServerNetworkError(e, dispatch)
//         })
// }
// export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
//     dispatch(setStatusAC({status: 'loading'}))
//     todolistsAPI.deleteTask(todolistId, taskId)
//         .then(res => {
//             const action = removeTaskAC({taskId, todolistId})
//             dispatch(action)
//             dispatch(setStatusAC({status: 'idle'}))
//         })
//         .catch((e) => {
//             //handleServerNetworkError(e, dispatch)
//         })
// }
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === ResultStatus.OK) {
                const task = res.data.data.item
                dispatch(addTaskAC({task}))
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError<{ item: TaskType }>(res.data, dispatch)
            }
        })
        .catch((e) => {
            //handleServerNetworkError(e, dispatch)
        })
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setStatusAC({status: 'loading'}))
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setStatusAC({status: 'idle'}))
                    dispatch(updateTaskAC({taskId, model: domainModel, todolistId}))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setErrorAC({error: res.data.messages[0]}))
                    } else {
                        dispatch(setErrorAC({error: 'Some error occurred'}))
                    }
                    dispatch(setStatusAC({status: 'failed'}))
                }
            })
            .catch((e) => {
                //handleServerNetworkError(e, dispatch)
            })
    }

const taskSlice = createSlice({
    name: "task",
    initialState: initialState,
    reducers: {
        addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC: (state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) => {
            const task = state[action.payload.todolistId]
            const index = task.findIndex((t) => t.id === action.payload.taskId)
            task[index] = {...task[index], ...action.payload.model}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        })
            .addCase(fetchTasksTC.fulfilled, (state, action) => {
                state[action.payload.items[0].todoListId] = action.payload.items
            })
            .addCase(removeTaskTC.fulfilled, (state, action) => {
                const task = state[action.payload.todolistId]
                const index = task.findIndex((t) => t.id === action.payload.taskId)
                if (index > -1) {
                    task.splice(index, 1)
                }
            })
    }
})
export const tasksReducer = taskSlice.reducer

// actions

export const {addTaskAC, updateTaskAC} = taskSlice.actions

// thunks


// types


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}