import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  login,
  selectIsAuthenticated,
  selectLoginError,
} from "../../features/auth/authSlice"
import { UserLoginDto } from "../../features/auth/types"
import { useNavigate } from "react-router-dom"
import styles from "./login.module.css"

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
    <div className={styles.login_container}>
      <div className={styles.box_front}>
      <h2 className={styles.header}>Sign In Form</h2>
      <p className={styles.subtitle}>sign in here using your username and password</p>
      {message && <span>{message}</span>}
      <input
        type="text"
        value={loginDto.login}
        onChange={(e) => setLoginDto({ ...loginDto, login: e.target.value })}
        placeholder="Username"
        className={styles.input_login}
      />
      <input
        type="password"
        value={loginDto.password}
        onChange={(e) => setLoginDto({ ...loginDto, password: e.target.value })}
        placeholder="Password"
        className={styles.input_pass}
      />
      <button onClick={handleLogin} className={styles.button}>Sign in</button>
      <a href="#" className={styles.link}>Forgot password</a>
      <a href="#" className={styles.link_account}>Create an account</a>
      
      </div>
    </div>
  )
}

export default LoginForm
