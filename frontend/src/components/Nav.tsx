import { NavLink } from "react-router-dom"
import classes from "./Nav.module.css"

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.menucontainer}>
          <NavLink  className={classes.link} to="/">Home</NavLink>
          <NavLink  className={classes.link} to="#">Cadastrar</NavLink>
          <NavLink  className={classes.link} to="#">Login</NavLink>
      </div>
    </nav>
  )
}

export default Nav