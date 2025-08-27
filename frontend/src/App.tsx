
import classes from "./App.module.css"

import Nav from './components/Nav'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div className={classes.app}>
      <Nav/>
      <Outlet/>
    </div>
  )
}

export default App
