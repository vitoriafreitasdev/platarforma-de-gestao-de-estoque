/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useLayoutEffect } from "react"
import { useParams } from "react-router-dom"
import systemFetch from "../axios"

const AdminRoute = () => {
    const [admin, setAdmin] = useState<object | null>(null)
    const [error, setError] = useState<string>("")
    const {id} = useParams()



    useLayoutEffect(() => {
        const loadAdmin = async () => {
            try {
                const res = await systemFetch(`user/${id}`)

                setAdmin(res.data)
            } catch (error: any) {
                setError(error.response.data.msg)
                console.log(error)
            }
        }

        loadAdmin()
    }, [])

    console.log(admin)

  return (
    <div>
        {!error ? 
        <div>
            <p>rota do administrador</p>
        </div> 
        : <p>{error}</p>}        
    </div>
  )
}

export default AdminRoute