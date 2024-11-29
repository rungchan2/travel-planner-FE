import { requestHandlerFB } from '@/api/fb_http.ts';

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


// export const login = (payload: LoginPayload) => {
//     return requestHandler('post', '/api/users/login', payload);
// }

// export const signup = (payload: SignupPayload) => {
//     return requestHandler('post', '/api/users/signup', payload);
// }

export const loginFbUser = () => {
    return requestHandlerFB('post', '/api/users/login');
}
