/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import classes from "./Login.module.css"
import type { UserLogin } from "../types/userLogin"
import systemFetch from "../axios"


const Login = () => {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [error, setError] = useState<string>("")

  const showhidePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const user: UserLogin = {
        email: email,
        password: password
      }

      const res = await systemFetch.post("/user/login", user)

      const token = res.data.token 

      localStorage.setItem("token", token)

      setError("")

      console.log(res)
    } catch (error: any) {
      setError(error.response.data.msg)
      console.log(error)
    }
  }
  return (
    <div className={classes.logincontainer}>
        <p>{error}</p>
        <form onSubmit={handleSubmit}>
          <label>
              <h2>Seu e-mail: </h2>
              <input type="email" onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <label>
              <h2>Sua senha: </h2>
              <input type={showPassword ? "text" : "password"} onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <input type="submit" value="Enviar"/>
        </form>
      <button onClick={showhidePassword}>Mostrar a senha</button>
    </div>
  )
}

export default Login