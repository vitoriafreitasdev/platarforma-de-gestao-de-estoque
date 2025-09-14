import './index.css'
import { StrictMode } from 'react'
import App from './App.tsx'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './routes/Home.tsx'
import Cadastro from './routes/Cadastro.tsx'
import Login from './routes/Login.tsx'
import RequesterRoute from './routes/RequesterRoute.tsx'
import AdminRoute from './routes/AdminRoute.tsx'
import EditProduct from './routes/EditProduct.tsx'
import AddProducts from './routes/AddProducts.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/cadastro",
        element: <Cadastro/>,
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/requester/:id",
        element: <RequesterRoute/>
      },
      {
        path: "/admin/:id",
        element: <AdminRoute/>
      },
      {
        path: "/addproducts",
        element: <AddProducts/>

      },
      {
        path: "/editproduct/:id",
        element: <EditProduct/>
      }
    ]
  }

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
