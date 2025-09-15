/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import systemFetch from "../axios"
import classes from "./EditProducts.module.css"
interface product {

  isAvailable:boolean
  name:string,
  priceUnit:number,
  src:string,
  unitsAvailable: number,

}
const EditProduct = () => {
  const {id} = useParams()
  const [product, setProduct] = useState<product | null>(null)
  const [name, setName] = useState<string>("")
  const [unitsAvailable, setUnitsAvailable] = useState<any>(0)
  const [priceUnit, setPriceUnit] = useState<any>(0)

  const [src, setSrc] = useState<any>("")

  const [sucess, setSucess] = useState<boolean>(false)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const res = await systemFetch.get(`/estoque/${id}`)
        setProduct(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    loadProduct()
  }, [product, id])

  const handleSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault()

      const form = new FormData()

      form.append("image", src)
      form.append("name", name)
      form.append("unitsAvailable", unitsAvailable)
      form.append("priceUnit", priceUnit)

      try {
        const editProduct = await systemFetch.patch(`/estoque/${id}`, form,  {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
        
        if(editProduct.status === 201){
          setSucess(true)
        }
        
      } catch (error) {
        console.log(error)
      }
  }

  
  return (
    <div className={classes.maincontainer}>
      {product &&
          <div>
              <p className={sucess ? `${classes.succesp}` : ""}>{sucess && "Adicionado com sucesso"}</p>
              <div className={classes.productcontainer}>
                <h4>Nome do produto a ser editado: {product.name}</h4>
                <p>Unidades disponíveis: {product.unitsAvailable}</p>
                <p>Preço da unidade: {product.priceUnit}R$</p>
                <p>Disponível: {product.isAvailable ? "Sim" : "Não"}</p>
                <div ><img className={classes.imgproduct} src={`${systemFetch.defaults.baseURL}/${product.src}`} alt="" /></div>
              </div>
              <form onSubmit={handleSubmit}>
                 <div className={classes.editcontainer}>
                    <h2>Edições</h2>
                    <label>
                    <span>Novo nome do produto: </span>
                    <input type="text" onChange={(e) => setName(e.target.value)} required/>
                    </label>
                    <label>
                      <span>Unidades disponíveis: </span>
                      <input type="number" onChange={(e) => setUnitsAvailable(e.target.value)} required/>
                    </label>
                    <label>
                      <span>Preço da unidade: </span>
                      <input type="text" onChange={(e) => setPriceUnit(e.target.value)} required/>
                    </label>
                    <label>
                      <span>Imagem do Produto: </span>
                      <input type="file" onChange={(e) => setSrc(e.target.files ? e.target.files[0] : "")} required/>
                    </label>
                    <input className={classes.editbtn} type="submit" value="Editar"/>
                </div>

              </form>
          </div>
      }
    </div>
  )
}

export default EditProduct