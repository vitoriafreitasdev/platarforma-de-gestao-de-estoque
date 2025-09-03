

import classes from "./Home.module.css"

import { useState, useLayoutEffect } from "react"

import {type ProductsProps} from "../types/products"

import systemFetch from "../axios"


const Home = () => {

  const [products, setProducts] = useState<ProductsProps | null>(null)
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [idUser, setIdUser] = useState<string | null>(null)
  const [addAnswer, setAddAnswer] = useState<string | null>(null)
  const [callFetch, setCallFetch] = useState<boolean>(false)
 
  useLayoutEffect(() => {
    try {
        setCallFetch(false)
        const loadProducts = async () => {
          const res = await systemFetch.get("/estoque")
          setProducts(res.data)
        }
        loadProducts()

        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("idUser")
        
        if(token && userId) {
          setIsLogged(true)
          setIdUser(userId)
        }  else {
          setIsLogged(false)
        }
        
    } catch (error) {
      console.log(error)
    }
  }, [callFetch])
  
  let units: number
  let product: ProductsProps

  const addProducts = async (productId: string) => {
    setAddAnswer(null)
    
    try {
          const token = localStorage.getItem("token")
          
          if(token){
              products?.forEach(p => p._id === productId ? product = p : null)
              if(product.unitsAvailable <= 1 ) {
                units = 0.1
              } else {
                units = product.unitsAvailable - 1
              }
              
          
            
              const addproduct = await systemFetch.patch(`/user/${idUser}/addproducts`, {productID: productId})
              const editProduct = await systemFetch.patch(`/estoque/${productId}`, {unitsAvailable: units})
              if(editProduct.status === 201){
                setCallFetch(true)
              }
              setAddAnswer(addproduct.data.msg)
          } else{
            setCallFetch(true)
          }
        
    } catch (error) {
      console.log(error)
    }
    
  }
  
  return (
    <div className={classes.home}>
        <h2>Produtos no estoque: </h2> 
        <h3>{!isLogged && "Faça o login para poder fazer encomendas."}</h3>
        <div className={classes.productscontainer}>
          {addAnswer ? <p>{addAnswer}</p> : ""}
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
                        <td><p><img className={classes.img} src={`${systemFetch.defaults.baseURL}/${p.src}`} alt="imagem do produto" /></p></td>
                        <td>{p.name}</td>
                        <td>{p.priceUnit}</td>
                        <td>{p.unitsAvailable}</td>
                        <td>{p.isAvailable ? "sim" : "não"}</td>
                        
                      </tr>
                    </tbody>
                    </table>
                    {p.isAvailable && isLogged ? <button className={classes.addproducts} onClick={() => addProducts(p._id)}>Adicionar a lista de produtos pessoal</button> : ""}
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

