import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/Login/useLogin";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [provider, setProvider] = useState("");
  const navigate = useNavigate();
  const { signupAPI } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupAPI({ name, email, password, gender, provider });
    navigate("/login");
  };

  return (
    <SignupContainer>
      <SignupForm onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="이름"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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

        <TextField
          fullWidth
          label="성별"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="플랫폼"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          required
        />
        <SignupButton type="submit" variant="contained" fullWidth>
          회원가입
        </SignupButton>
      </SignupForm>
    </SignupContainer>
  );
}

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  max-width: 400px;
  margin: 0 auto;
  padding-top: 100px;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const SignupButton = styled(Button)`
  && {
    margin-top: 16px;
  }
`;
