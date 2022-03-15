import React, { useState } from 'react'
import styled from '@emotion/styled'

import {useMutation} from 'react-query'
import { login } from '../api/userApi'
import { useNavigate} from 'react-router-dom'

const Base = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 12px;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoWrapper = styled.div`
  width: 128px;
  height: 128px;
  object-fit: contain;
  margin: 128px auto;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const Input = styled.input`
  margin: 0;
  width: 100%;
  height: 48px;
  border: none;
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 16px;
`;

const ButtonWrapper = styled.div`
  margin-top: 36px;
`;

const Button = styled.button`
  margin: 0;
  padding: 0;
  border: none;
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: bold;
  &:active {
    opacity: 0.7;
  }
`;

const Lobby : React.FC = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('')

    const mutation = useMutation((username:string) => login({username}))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handleLogin = () => {
        mutation.mutate(username,{
            onSuccess : (data) => {
                if(data?.statusText === "Ok"){
                    navigate('/friends')
                }
            }
        })
    }

    return (
        <Base>
            <LogoWrapper>
                <Logo src='/logo.png' />
            </LogoWrapper>
            <InputWrapper>
                <Input placeholder='이름을 입력 하세요' onChange={handleChange} />
            </InputWrapper>
            <ButtonWrapper>
                <Button onClick={handleLogin} >로그인</Button>
            </ButtonWrapper>
        </Base>
    )
}

export default Lobby