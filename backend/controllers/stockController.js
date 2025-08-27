const {Stock} = require("../models/Stock")
const removedImage = require("../utils/removeImage")


const stockController = {
    create: async (req, res) => {
        try {
            const {name, unitsAvailable, priceUnit, isAvailable} = req.body

            const src = `images/${req.file.filename}`

            const productExist = await Stock.findOne({name: name})

            if(productExist){
                return res.status(422).json({msg: "Produto com esse nome já existe."})
            }

            const product = {src, name, unitsAvailable, priceUnit, isAvailable}

            const productCreate = await Stock.create(product)

            res.status(201).json({msg: "Produto criado com sucesso", productCreate})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Houve um erro no sistema, tente novamente mais tarde."})
        }
    },
    getAllProducts: async (req, res) => {
        try {
            const products = await Stock.find()
            res.json(products)
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Houve um erro no sistema, tente novamente mais tarde."})
        }
    },
    getOneProduct: async (req, res) => {
        try {
            const id = req.params.id 
            
            const product = await Stock.findById(id)

            if(!product){
                res.status(404).json({msg: "Produto não encontrado"})
            }
            res.json(product)
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Houve um erro no sistema, tente novamente mais tarde."})
        }
    },
    edit: async (req, res) => {
        try {
            const id = req.params.id 

            
            const oldProduct = await Stock.findById(id)
            if(!oldProduct){
                res.status(404).json({msg: "produto não encontrado."})
            }
            let src = null 

            if(req.file) {
                src = `images/${req.file.filename}`
            }

            if(src) {
                removedImage(oldProduct)
            }

            const editProduct = {}
            if (src) editProduct.src = src 
            if (req.body.name) editProduct.name = req.body.name
            if (req.body.unitsAvailable) editProduct.unitsAvailable = req.body.unitsAvailable
            if (req.body.priceUnit) editProduct.priceUnit = req.body.priceUnit
            if (req.body.isAvailable) editProduct.isAvailable = req.body.isAvailable

            const product = await Stock.findByIdAndUpdate(id, editProduct, {new: true})

            if(!product){
                res.status(404).json({msg: "produto não encontrado."})
            }

            res.status(201).json({msg: "Produto editado.", product})

        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Houve um erro no sistema, tente novamente mais tarde."})
        }
    },
    delete: async (req, res) => {
        /* atualizar esse aqui, agora tem imagens, usar o remove image */
        try {
            const id = req.params.id 
            
            const product = await Stock.findByIdAndDelete(id)

            if(!product){
                res.status(404).json({msg: "produto não encontrado."})
            }

            removedImage(product)

            res.status(201).json({msg: "Produto deletado"})
            
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Houve um erro no sistema, tente novamente mais tarde."})
        }
    }

}


module.exports = stockController