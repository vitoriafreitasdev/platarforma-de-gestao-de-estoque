/* eslint-disable @typescript-eslint/no-explicit-any */

import systemFetch from "../axios";
import type { UserRegisterProps } from "../types/userRegister"
import classes from "./Cadastro.module.css"
import type { ChangeEvent } from 'react';
import { useState} from "react"
import { useNavigate } from "react-router-dom";

const Cadastro = () => {

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [role, setRole] = useState<string>("Requester")

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const [showKeyInput, setshowKeyInput] = useState<boolean>(false)

  const [keyAdmin, setKeyAdmin] = useState<string>("")
  
  const [error, setError] = useState<string>("")

  const navigate = useNavigate()

 const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value);

    if(event.target.value === "Admin"){ 
        setshowKeyInput(true);
    } else {
        setshowKeyInput(false)
    }
    
  
};



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    
    try {
      const user: UserRegisterProps = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        role: role,
        key: keyAdmin
      }

      await systemFetch.post("/user/register", user)
      setError("")
      navigate("/login")
        
    } catch (error: any ) {
      setError(error.response.data.msg)
      console.log(error)
    }
    
    
    
  }
  const showhidePassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className={classes.cadastrocontainer}>

        <div>
              <p>{error}</p>
              <form onSubmit={handleSubmit}>
                  <label>
                      <h2>Seu nome:</h2>
                      <input type="text" onChange={(e) =>  setName(e.target.value)} required/>
                  </label>

                  <label>
                      <h2>E-mail:</h2>
                      <input type="email" onChange={(e) =>  setEmail(e.target.value)} required/>
                  </label>

                  <label>
                      <h2>Senha:</h2>
                      <input type={showPassword ? "text" : "password"} onChange={(e) =>  setPassword(e.target.value)} required/>
                  </label>

                  <label>
                      <h2>Confirmar senha:</h2>
                      <input type={showPassword ? "text" : "password"} onChange={(e) =>  setConfirmPassword(e.target.value)}/>
                  </label>

                  {showKeyInput ?
                    <label>
                        <h2>Coloque a chave dos administradores: </h2>
                        <input type={showPassword ? "text" : "password"} onChange={(e) => setKeyAdmin(e.target.value)} required/>
                    </label>
                  : ""}

                  <label>
                      <h2>Papel: </h2>
                      <select onChange={handleChange} required>
                        <option>Requester</option>
                        <option >Admin</option>
                      </select>
                  </label>
                  
                  <input type="submit" value="Cadastrar" />
        
              </form>
            <button onClick={showhidePassword}>Mostrar a senha</button>
        </div>
          
    </div>
  )
}

export default Cadastro