

import classes from "./Home.module.css"

import { useState, useLayoutEffect } from "react"

import {type ProductsProps} from "../types/products"

import systemFetch from "../axios"

const Home = () => {

  const [products, setProducts] = useState<ProductsProps | null>(null)
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [idUser, setIdUser] = useState<string | null>(null)


  useLayoutEffect(() => {
    try {
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
  }, [])
  

  const addProducts = async (productId: string) => {
    console.log(`produto id = ${productId} usuario id = ${idUser}`)
    // proximos passos: fazer a adição de do produto na lista do usuario, editar o produto diminuindo sua quantidade de unidades, de quantidades < 0, entao disponibilidade do produto fica igual a false. fazer um botao de log out => tirar o token e o id do usuario da local storage  
  }

 
  
  return (
    <div className={classes.home}>
        <h2>Produtos no estoque: </h2> 
        <h3>{!isLogged && "Faça o login para poder fazer encomendas."}</h3>
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