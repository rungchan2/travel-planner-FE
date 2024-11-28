import {requestHandler} from "@/api/http";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    name: string;
    email: string;
    password: string;
    gender: string;
    provider: string;
}


export const login = (payload: LoginPayload) => {
    return requestHandler('post', '/api/users/login', payload);
}

export const signup = (payload: SignupPayload) => {
    return requestHandler('post', '/api/users/signup', payload);
}

