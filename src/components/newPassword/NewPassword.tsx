import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  login,
  selectIsAuthenticated,
  selectLoginError,
} from "../../features/auth/authSlice"
import { UserLoginDto } from "../../features/auth/types"
import { useNavigate } from "react-router-dom"

const LoginForm = () => {
  const dispatch = useAppDispatch()
  //const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [loginDto, setLoginDto] = useState<UserLoginDto>({
    login: "",
    password: "",
  })
  const message = useAppSelector(selectLoginError)
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const dispatchResult = await dispatch(login(loginDto))
      if (login.fulfilled.match(dispatchResult)) {
        navigate("/")
      }
    } catch (error) {
      console.error("Ошибка при авторизации:", error)
    }
  }

  return (
    <div>
      {message && <span>{message}</span>}
      <input
        type="text"
        value={loginDto.login}
        onChange={e => setLoginDto({ ...loginDto, login: e.target.value })}
        placeholder="Login"
      />
      <input
        type="password"
        value={loginDto.password}
        onChange={e => setLoginDto({ ...loginDto, password: e.target.value })}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default LoginForm
