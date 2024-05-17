import type { AxiosResponse } from "axios"
import axios, { AxiosError } from "axios"
import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import s from "./login.module.css"
import loginImg from "./../../media/icons/username.svg"
import passImg from "./../../media/icons/password.svg"

export default function Login() {
  const [login, setLogin] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [message, setMessage] = useState<string>("")

  interface LoginResponse {
    fullName: string
    avatar: string
    login: string
    email: string
    website: string
    phone: string
    telegram: string
    role: string
    token: string
  }
  const navigate = useNavigate()

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    

    // AXIOS variant
    try {
      const data = { login, password }
      const response: AxiosResponse = await axios.post(
        `/api/account/login`,
        data,
      )
      const resObject: LoginResponse = response.data
      console.log(resObject)
      setMessage("")
      navigate("/")
    } catch (error) {
      if (error instanceof AxiosError) {
        //  console.log(error.response?.data?.message);
        setMessage(error.response?.data?.message)
      }
    }

    // FETCH variant
    // try {
    //   const res = await fetch("https://dummyjson.com/auth/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       username,
    //       password,
    //     }),
    //   })
    //   const obj = await res.json()
    //   console.log(obj)
    // } catch (e) {
    //   console.log(e)
    // }
  }

  return (
    <>
      <div className={s.container}>
        {/* <div className={s.container_left}></div>
        <div className={s.container_right}></div> */}
        <div className={s.container_front}>
          <div className={s.flex_row}>
            <h1>Sign in</h1>
            <p>login here using your username and password</p>
            <form onSubmit={handleLogin}>
              {message ? <p>{message}</p> : null}
              
                {/* <label className={s.lf_label} htmlFor="username">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    height="39"
                    viewBox="0 0 42 39"
                    fill="none"
                  >
                    <path
                      d="M11.7692 14.2143V8.92857C11.7692 4.54975 15.9018 1 21 1C26.0982 1 30.2308 4.54975 30.2308 8.92857V14.2143C30.2308 17.1489 28.3745 19.7112 25.6154 21.0823V24.3179C25.6154 25.3986 26.3815 26.3704 27.5495 26.7716L33.8578 28.939C38.1714 30.4211 41 34.0095 41 38H1C1 34.0095 3.82852 30.4211 8.14212 28.939L14.4504 26.7716C15.6185 26.3704 16.3846 25.3986 16.3846 24.3179V21.0823C13.6255 19.7112 11.7692 17.1489 11.7692 14.2143Z"
                      stroke="#B3ADAD"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </label> */}

                <input
                  type="text"
                  value={login}
                  onChange={e => setLogin(e.target.value)}
                  placeholder="username"
                  className={s.lf_input}
                />
             

              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="password"
              />
              <button type="submit">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
