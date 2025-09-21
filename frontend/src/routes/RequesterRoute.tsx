/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useLayoutEffect} from "react"
import { useParams, Link } from "react-router-dom"
import systemFetch from "../axios"
import {type ProductsProps} from "../types/products"
import classes from "./RequesterRoute.module.css"

const RequesterRoute = () => {
    const [user, setUser] = useState<any>(null)
    const [products, setProducts] = useState<ProductsProps[] | null>(null)
    const [loading, setloading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [callFetch, setCallFetch] = useState<boolean>(false)
    const {id} = useParams()

    useLayoutEffect(() => {
        const loadData = async () => {
            setloading(true)
            try {
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
    }, [id, callFetch])

    // Produtos do usuário que ainda existem no banco
    const userProducts = user?.products
        ?.map((pUser: { productID: string }) => 
            products?.find(p => p._id === pUser.productID)
        )
        .filter(Boolean) || []

    // vai pegar os produtos que estao no usuario, mas nao estao no banco de dados mais, fazer um filter e dps um map para criar um novo array com esses que foram excluidos de la
    const deletedProducts = user?.products
        ?.filter((pUser: { productID: string }) => 
            !products?.some(p => p._id === pUser.productID)
        )
        .map((pUser: { productID: string }) => ({
            _id: pUser.productID,
            name: "Produto deletado",
            // Você pode adicionar mais informações se tiver salvo no user
        })) || []

    const totalprice = userProducts.reduce((total: number, product: any) => 
        total + (product.priceUnit || 0), 0
    )

    const handleDelete = async (productID: string) => {
        try {
            console.log(productID)
            const res = await systemFetch.delete(`/user/${id}/deleteproducts`, {
            data: { productID: productID } })
            if (res.status === 200){
                setCallFetch(true)
            }
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
                                {deletedProducts.length > 0 && (
                                    <div>
                                        <h4>Produtos que não estão mais disponíveis</h4>
                                        {deletedProducts.map((product: any) => (
                                            <div key={product._id}>
                                                <p>{product.name} (ID: {product._id})</p>
                                                <button onClick={() => handleDelete(product._id)}>
                                                    Remover da lista
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