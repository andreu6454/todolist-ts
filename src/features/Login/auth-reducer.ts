import {authAPI, loginType, logoutType} from "../../api/auth-api";
import {handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
}

export const loginTC = createAsyncThunk<loginType, loginType, { rejectValue: string }>('login', async (params, thunkAPI) => {
    try {
        const response = await authAPI.login(params);
        return response.data;
    } catch (error) {
        return handleServerNetworkError(error, thunkAPI);
    }
})
export const logoutTC = createAsyncThunk<logoutType, void, { rejectValue: string }>('logout', async (params, thunkAPI) => {
    try {
        const response = await authAPI.logout();
        return response.data;
    } catch (error) {
        return handleServerNetworkError(error, thunkAPI);
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC: (state, action: PayloadAction<{ value: boolean }>) => {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers(builder){
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        .addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
})
export const authReducer = authSlice.reducer
export const {setIsLoggedInAC} = authSlice.actions

