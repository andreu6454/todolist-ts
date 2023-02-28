import {Dispatch} from "redux";
import {auth_ResultCode, authAPI} from "../api/auth-api";
import {loginTC, logoutTC, setIsLoggedInAC} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false as boolean
}

const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setErrorAC: (state, action: PayloadAction<{ error: null | string }>) => {
            state.error = action.payload.error
        },
        setInitializedAC: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
            state.isInitialized = action.payload.isInitialized
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginTC.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(loginTC.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loginTC.rejected, (state,payload) => {
                state.status = 'failed'
                state.error = payload.payload || ""
            })
            .addCase(logoutTC.fulfilled, (state) => {
                state.status = 'succeeded'
            })
            .addCase(logoutTC.pending, (state) => {
                state.status = 'loading'
            })
    }
})

export const appReducer = appSlice.reducer
export const setStatusAC = appSlice.actions.setStatusAC
export const setErrorAC = appSlice.actions.setErrorAC
export const setInitializedAC = appSlice.actions.setInitializedAC
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setStatusAC({status: 'loading'}))
    authAPI.me().then(res => {
        dispatch(setStatusAC({status: 'idle'}))
        if (res.data.resultCode === auth_ResultCode.OK) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {
            dispatch(setIsLoggedInAC({value: false}))
        }
    }).finally(() => {
        dispatch(setInitializedAC({isInitialized: true}))
    })
}
