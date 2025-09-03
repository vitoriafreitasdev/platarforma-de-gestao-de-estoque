import { NavLink, useParams } from "react-router-dom"
import classes from "./Nav.module.css"
import { useState, useLayoutEffect } from "react"

const Nav = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false)

  const {id} = useParams()
 
  useLayoutEffect(() => {
    
    const token = localStorage.getItem("token")
    if(token) {
      setIsLogged(true)
    }  else {
      setIsLogged(false)
    }
        
  }, [isLogged, id])

  const handleClick = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("idUser")
    setIsLogged(false)
  }
 
  return (
    <nav className={classes.nav}>
      <div className={classes.menucontainer}>
          <NavLink  className={classes.link} to="/">Home</NavLink>
          <NavLink  className={classes.link} to="/cadastro">Cadastrar</NavLink>
          <NavLink  className={classes.link} to="/login">Login</NavLink>
          {isLogged ? <p onClick={handleClick}>LogOut</p> : ""}
      </div>
    </nav>
  )
}

export default Nav