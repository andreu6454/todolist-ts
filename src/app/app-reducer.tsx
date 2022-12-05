import {Dispatch} from "redux";
import {auth_ResultCode, authAPI} from "../api/auth-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false as boolean
}

export type AppReducerStateType = typeof initialState

export const appReducer = (state: AppReducerStateType = initialState, action: ActionsType): AppReducerStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setStatusAC = (status: RequestStatusType) => {
    return {
        type: "APP/SET-STATUS",
        status
    } as const
}
export const setErrorAC = (error: null | string) => {
    return {
        type: "APP/SET-ERROR",
        error
    } as const
}
export const setInitializedAC = (isInitialized: boolean) => {
    return {
        type: "APP/SET-INITIALIZED",
        isInitialized
    } as const
}
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC('loading'))
    authAPI.me().then(res => {
        dispatch(setStatusAC('idle'))
        if (res.data.resultCode === auth_ResultCode.OK) {
            dispatch(setIsLoggedInAC(true));
        } else {
            dispatch(setIsLoggedInAC(false))
        }
    }).finally(()=>{
        dispatch(setInitializedAC(true))
    })
}

export type SetStatusActionType = ReturnType<typeof setStatusAC>
export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type SetInitializedActionType = ReturnType<typeof setInitializedAC>
type ActionsType = SetStatusActionType | SetErrorActionType | SetInitializedActionType