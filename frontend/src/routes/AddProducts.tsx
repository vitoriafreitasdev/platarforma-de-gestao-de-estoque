/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import classes from "./AddProducts.module.css"
import systemFetch from "../axios"

interface datas {
  append(arg0: string, src: any): unknown
}
const AddProducts = () => {


  const [name, setName] = useState<string>("")
  const [unitsAvailable, setUnitsAvailable] = useState<any>(0)
  const [priceUnit, setPriceUnit] = useState<any>(0)
  const [isAvailable, setIsAvailable] = useState<boolean>(false)
  const [src, setSrc] = useState<any>("")
  const [sucess, setSucess] = useState<string>("")
  

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    /* fazer os testes */ 
    const form: datas = new FormData()

    form.append("image", src)
    form.append("name", name)
    form.append("unitsAvailable", unitsAvailable)
    form.append("priceUnit", priceUnit)
    if (unitsAvailable > 0){
      setIsAvailable(true)
    }
    form.append("isAvailable", isAvailable)

    try {
      const res = await systemFetch.post("/estoque", form, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      if (res.status === 201){
        setSucess("Adicionado com sucesso")
      } else{
        setSucess("Algo deu errado tente novamente.")
      }
    } catch (error) {
      console.log(error)
    }

  }
  
  return (
    <form className={classes.formcontainer} onSubmit={handleSubmit}>
      {sucess}
      <div className={classes.labelcontainer}>
        <label>
        <span>Nome do produto: </span>
        <input type="text" onChange={(e) => setName(e.target.value)}/>
        </label>
        <label>
          <span>Unidades disponíveis: </span>
          <input type="number" onChange={(e) => setUnitsAvailable(e.target.value)}/>
        </label>
        <label>
          <span>Preço da unidade: </span>
          <input type="number" onChange={(e) => setPriceUnit(e.target.value)}/>
        </label>
        <label>
          <span>Imagem do Produto: </span>
          <input type="file" onChange={(e) => setSrc(e.target.files ? e.target.files[0] : "")}/>
        </label>
        <input type="submit" value="Adicionar"/>
      </div>
    </form>
  )
}

export default AddProducts