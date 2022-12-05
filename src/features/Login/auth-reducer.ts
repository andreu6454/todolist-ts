import {Dispatch} from 'redux'
import {setStatusAC} from '../../app/app-reducer'
import {SetErrorActionType} from "../../app/app-reducer";
import {SetStatusActionType} from "../../app/app-reducer";
import {auth_ResultCode, authAPI, loginType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
    isLoggedIn: false,
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: loginType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === auth_ResultCode.OK) {
                dispatch(setStatusAC('succeeded'))
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerNetworkError({message: res.data.messages[0]},dispatch)
                console.log(res.data.messages[0])
            }
        })
        .catch((e) => {
            handleServerNetworkError(e, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetStatusActionType | SetErrorActionType
