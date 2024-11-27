import React, { useState } from 'react'
import styled from 'styled-components'
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/Login/useLogin';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { loginAPI } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginAPI({email, password});
        navigate('/');
    };

    return (
        <LoginContainer>
            <LoginForm onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="이메일"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    label="비밀번호"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <LoginButton
                    type="submit"
                    variant="contained"
                    fullWidth
                >
                    로그인
                </LoginButton>
                <SignupButton onClick={() => navigate('/signup')}>회원가입</SignupButton>
            </LoginForm>
        </LoginContainer>
    )
}

const SignupButton = styled(Button)`
  && {
    margin-top: 16px;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 400px;
  margin: 0 auto;
  padding-top: 100px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const LoginButton = styled(Button)`
  && {
    margin-top: 16px;
  }
`;