/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useLayoutEffect } from "react"
import { useParams } from "react-router-dom"
import systemFetch from "../axios"
import {type ProductsProps} from "../types/products"


const RequesterRoute = () => {
    const [user, setUser] = useState<any>(null)
    const [products, setProducts] = useState<ProductsProps | null>(null)
    
    const [error, setError] = useState<string>("")
    const {id} = useParams()

    

    useLayoutEffect(() => {
        const loaduser = async () => {
            try {
                const res = await systemFetch(`user/${id}`)

                setUser(res.data)
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
        loaduser()
    }, [])
    let productsFilter
    let filtered = []
    if (products && user){
      // const filterProducts = products.filter(p => 
      //   p._id === user.products.productsId
      // )
      // products.forEach(p => {
      //   console.log("Produtos: ",p._id)
      // })
      // user.products.forEach(p => {
      //   console.log("Usuario produtos: ",p.productId)
      // })
      
      
      user.products.forEach(pUser => {
        console.log(productsFilter)
        productsFilter = products.filter(p => p._id === pUser.productId)
        filtered.push(productsFilter)
      })

        console.log(filtered)

    }
/* pensar como fazer melhorar isso ai, que ta horrivel*/
  return (
    <div>
        {!error ? 
        <div>
           { filtered.length > 0 && filtered.map((f) => (
            f.map((filter) => (
              <div>
                {filter.name}
              </div>
            ))
           )) 
            
           }
        </div> 
        : <p>{error}</p>}        
    </div>
  )
}
export default RequesterRoute