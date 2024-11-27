import { login, signup } from "../../api/auth.api";
import { LoginPayload, SignupPayload } from "../../api/auth.api";

export const useAuth = () => {

    const loginAPI = (loginPayload: LoginPayload) => {
        login(loginPayload).then((res)=> {
            alert(res.data);
            localStorage.setItem('token', res.data);
        }).catch((err)=> {
            alert(err);
        })
    }
    
    const signupAPI = (signupPayload: SignupPayload) => {
        signup(signupPayload).then((res)=> {
            alert(res.data);
        }).catch((err)=> {
            alert(err);
        })
    }
    
    return {
        loginAPI,
        signupAPI
    }
    
    
}
