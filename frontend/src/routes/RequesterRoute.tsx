/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useLayoutEffect} from "react"
import { useParams, Link } from "react-router-dom"
import systemFetch from "../axios"
import {type ProductsProps} from "../types/products"
import classes from "./RequesterRoute.module.css"

const RequesterRoute = () => {
    const [user, setUser] = useState<any>(null)
    const [products, setProducts] = useState<ProductsProps | null>(null)
    const [loading, setloading] = useState<boolean>(false)


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

        setloading(true)

        loadProducts()
        loaduser()

        setloading(false)
    }, [])
    let productsFilter: Array<string> 
    const filtered: string[][]  = []
    if (products && user){
    
      user.products.forEach((pUser: { productId: any }) => {
        
        productsFilter = products.filter(p => p._id === pUser.productId)
        filtered.push(productsFilter)
      })
   

    }

  return (
    <div className={classes.requestercontainer}>
        
        {!error ? 
  
          <div>
            <h2>{filtered.length > 0 ? "Seus produtos:" : "Você não tem produtos."}</h2>
            {
              !loading ? 
                  <div className={classes.productscontainer}>
                    
                    {
                      filtered.length > 0 && filtered.map((f: any[]) => (
                      f.map((filter: { name: string, unitsAvailable: number, priceUnit: number, src: string }) => (
                        <div >
                          <p><span>Nome:</span> {filter.name}</p>
                          <p><span>Unidades:</span> {filter.unitsAvailable}</p>
                          <p><span>Preço por unidades:</span> {filter.priceUnit}</p>
                          <p><img  src={`${systemFetch.defaults.baseURL}/${filter.src}`} alt="teste" /></p>
                        </div>
                      ))
                    ))
                    }
                  </div>
              
               : 

                  <p>Carregando...</p>
               
            }
            <p>Para adicionar produtos: <Link to="/">Home</Link></p>
          </div>
        : <p>{error}</p>}        
    </div>
  )
}
export default RequesterRoute