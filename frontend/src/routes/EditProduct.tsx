import { useParams } from "react-router-dom"

const EditProduct = () => {
  const {id} = useParams()
  /* Aqui vai ser onde edita o produto */
  return (
    <div>produto a ser editado: {id}</div>
  )
}

export default EditProduct