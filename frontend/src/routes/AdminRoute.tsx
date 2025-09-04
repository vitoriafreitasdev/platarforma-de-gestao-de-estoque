/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useLayoutEffect } from "react"
import { useParams } from "react-router-dom"
import systemFetch from "../axios"
import type { ProductsProps } from "../types/products"

import classes from "./AdminRoute.module.css"

const AdminRoute = () => {
    const [admin, setAdmin] = useState<any>(null)
    const [error, setError] = useState<string>("")
    const [products, setProducts] = useState<ProductsProps | null>(null)
    const {id} = useParams()



    useLayoutEffect(() => {
        const loadAdmin = async () => {
            try {
                const res = await systemFetch.get(`/user/${id}`)

                setAdmin(res.data)
            } catch (error: any) {
                setError(error.response.data.msg)
                console.log(error)
            }
        }
        const loadProducts = async () => {
          const res = await systemFetch.get("/estoque")
          setProducts(res.data)
        }
        
        loadProducts()


        loadAdmin()
    }, [])


    console.log(products)
  return (
    <div className={classes.admincontainer}>
        {!error ? 
        <div className={classes.productscontainer}>
            {admin && <h2>Ola, {admin.name}. Os produtos disponíveis no estoque são:</h2>}
            <div className={classes.productmaincontainer}>
                    { products && products.map((p) => (
                        <div className={classes.productdiv}>
                            <div><img src={`${systemFetch.defaults.baseURL}/${p.src}`} alt="" /></div>
                            <div>
                                {p.name}
                                {p.priceUnit}
                                {p.unitsAvailable}
                                {p.isAvailable ? "sim" : "não"}
                                <button className={classes.btnEdit}>Editar</button>
                                <button className={classes.btnDelete}>deletar</button>
                            </div>
                        </div>
                    ) )}
            </div>
        </div> 
        : <p>{error}</p>}        
    </div>
  )
}

export default AdminRoute