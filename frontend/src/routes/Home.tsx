
import classes from "./Home.module.css"



import { useState, useEffect } from "react"

import {type ProductsProps} from "../types/products"

import systemFetch from "../axios"

const Home = () => {
  const [products, setProducts] = useState<ProductsProps | null>(null)

  useEffect(() => {
    try {
        const loadProducts = async () => {
          const res = await systemFetch.get("/estoque")
          setProducts(res.data)
        }
        loadProducts()
        
    } catch (error) {
      console.log(error)
    }
  }, [])
console.log(products)
  return (
    <div className={classes.home}>
        <h2>Produtos no estoque: </h2> 
        <div className={classes.productscontainer}>
          
          {
            products ? (
              products.map((p: ProductsProps) => (
                <div key={p._id} >
                    <table >
                      <thead>
                        <th scope="col">Imagem</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Preço por unidade</th>
                        <th scope="col">Unidades disponíveis</th>
                        <th scope="col">Está disponível</th>
                      </thead>
                    <tbody >
                      <tr>
                        <td><p><img className={classes.img} src={`${systemFetch.defaults.baseURL}/${p.src}`} alt="teste" /></p></td>
                        <td>{p.name}</td>
                        <td>{p.priceUnit}</td>
                        <td>{p.unitsAvailable}</td>
                        <td>{p.isAvailable ? "sim" : "não"}</td>
                      </tr>
                    </tbody>
                    </table>
                </div>
              ))
            ) : (
              <div>
                  <p>Carregando...</p>
              </div>
            )
          }
        </div>     

    </div>
  )
}

export default Home

/* 

createdAt
: 
"2025-08-24T20:29:10.775Z"
isAvailable
: 
true
name
: 
"ps5"
priceUnit
: 
3500
unitsAvailable
: 
5
updatedAt
: 
"2025-08-26T14:30:46.241Z"
__v
: 
0
_id
: 
"68ab761612a2ee676da3967d"


*/