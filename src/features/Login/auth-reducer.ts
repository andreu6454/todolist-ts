import {Dispatch} from 'redux'
import {setStatusAC} from '../../app/app-reducer'
import {auth_ResultCode, authAPI, loginType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isLoggedIn = action.payload.value
        }
    }
})
export const authReducer = authSlice.reducer
export const {setIsLoggedInAC} = authSlice.actions
// thunks
export const loginTC = (data: loginType) => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === auth_ResultCode.OK) {
                dispatch(setStatusAC({status: 'succeeded'}))
                dispatch(setIsLoggedInAC({value: true}))
            } else {
                handleServerNetworkError({message: res.data.messages[0]}, dispatch)
                console.log(res.data.messages[0])
            }
        })
        .catch((e) => {
            handleServerNetworkError(e, dispatch)
        })
}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
