
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useLayoutEffect } from "react"
import { useParams, Link } from "react-router-dom"
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
        <div>
            {admin && <h2>Ola, {admin.name}. Os produtos disponíveis no estoque são:</h2>}
            <div className={classes.productscontainer}>
            
            
                    { products && products.map((p) => (
                        
                            <div className={classes.productdiv}>
                                <div className={classes.productimg}><img src={`${systemFetch.defaults.baseURL}/${p.src}`} alt="" /></div>
                                <div className={classes.productitems}>
                                    <p>Nome: <span>{p.name}</span></p>
                                    <p>Preço: <span>{p.priceUnit}</span></p>
                                    <p>Unidades disponíveis: <span>{p.unitsAvailable}</span></p>
                                    <p>Disponível: <span>{p.isAvailable ? "sim" : "não"}</span></p>
                                    <Link className={classes.linkedit} to={`/productedit/${p._id}`}><button className={classes.btnEdit}>Editar</button></Link>
                                    
                                    <button className={classes.btnDelete}>Deletar</button>
                                </div>
                            </div>
                        
                    ) )}
            </div> 
            <div>
                <Link className={classes.linkedit} to={"/addproducts"}><button className={classes.btnAdd}>Adicionar produtos</button></Link>
            </div>

        </div>
        
        : <p>{error}</p>}        
    </div>
  )
}

export default AdminRoute