import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
})

export const authAPI = {
    login(data: loginType) {
        return instance.post('/auth/login', data)
    },
    me() {
        return instance.get('/auth/me')
    },
    logout() {
        return instance.delete('/auth/login')
    }
}

export type loginType = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: string
}

export type logoutType = {
    resultCode: auth_ResultCode
    messages: string,
    data: {}
}

export enum auth_ResultCode {
    OK = 0,
    ERROR = 1,
    CAPTCHA = 10
}