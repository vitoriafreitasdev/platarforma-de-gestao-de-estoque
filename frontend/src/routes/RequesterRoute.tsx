/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useLayoutEffect} from "react"
import { useParams, Link } from "react-router-dom"
import systemFetch from "../axios"
import {type ProductsProps} from "../types/products"
import classes from "./RequesterRoute.module.css"

const RequesterRoute = () => {
    const [user, setUser] = useState<any>(null)
    const [products, setProducts] = useState<ProductsProps[] | null>(null) // Alterado para array
    const [loading, setloading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const {id} = useParams()

    useLayoutEffect(() => {
        const loadData = async () => {
            setloading(true)
            try {
                // Carrega dados em paralelo
                const [userRes, productsRes] = await Promise.all([
                    systemFetch(`user/${id}`),
                    systemFetch.get("/estoque")
                ])
                
                setUser(userRes.data)
                setProducts(productsRes.data)
            } catch (error: any) {
                setError(error.response?.data?.msg || "Erro ao carregar dados")
                console.log(error)
            } finally {
                setloading(false)
            }
        }

        loadData()
    }, [id]) // Adicionado id como dependência

    
    // Descrição: "Para cada produto do usuário, encontre o produto correspondente no array completo de produtos"
    const userProducts = user?.products
        ?.map((pUser: { productID: string }) => 
            products?.find(p => p._id === pUser.productID)
        )
        .filter(Boolean) || [] // Remove undefined values

    // o ! é para pegar apenas os diferentes
    //aqui ele vai fazer um filtro nos que retorna true, que no caso vai ser os diferentes por conta do !
    // Descrição: "Filtre os produtos, mantendo apenas aqueles que NÃO estão presentes na lista de produtos do usuário"
    const productsDifferent = products
        ?.filter(p => !userProducts.some((up: { _id: string }) => up._id === p._id)) || []

    const totalprice = userProducts.reduce((total: number, product: any) => 
        total + (product.priceUnit || 0), 0
    )

    const handleDelete = async (productID: string) => {
        try {
            console.log(productID)
            // const res = await systemFetch.delete(`/user/${id}/deleteproducts`, {productID: productID})
            // console.log(res.data.msg)
        } catch (error) {
            console.error("Erro ao deletar produto:", error)
        }
    }

    return (
        <div className={classes.requestercontainer}>
            {error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <h2>{userProducts.length > 0 ? "Seus produtos:" : "Você não tem produtos."}</h2>
                    
                    {loading ? (
                        <p>Carregando...</p>
                    ) : (
                        <div className={classes.productscontainer}>
                            <div>
                                {userProducts.map((product: any) => (
                                <div key={product._id}>
                                    <p><span>Nome:</span> {product.name}</p>
                                    <p><span>Unidades:</span> {product.unitsAvailable}</p>
                                    <p><span>Preço por unidades:</span> {product.priceUnit}</p>
                                    <p>
                                        <img 
                                            src={`${systemFetch.defaults.baseURL}/${product.src}`} 
                                            alt={product.name} 
                                        />
                                    </p>
                                    <button onClick={() => handleDelete(product._id)}>
                                        Deletar
                                    </button>
                                </div>
                            ))}
                            <p>Preço total: {totalprice}R$</p>
                            </div>
                            
                            
                            <div className={classes.differentproductscontainer}>
                                
                                {productsDifferent.length > 0 && (
                                <div>
                                    <h4>Produtos que não estão mais disponíveis</h4>
                                    {productsDifferent.map(product => (
                                        <div key={product._id}>
                                            <p>{product.name}</p>
                                    <button onClick={() => handleDelete(product._id)}>
                                        Deletar
                                    </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            </div>
                        </div>
                    )}
                    
                    <p>Para adicionar produtos: <Link to="/">Home</Link></p>
                </div>
            )}        
        </div>
    )
}

export default RequesterRoute