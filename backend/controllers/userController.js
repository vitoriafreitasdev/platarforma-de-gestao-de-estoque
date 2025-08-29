const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const adminkey = require("../adminkey")

require("dotenv").config()
const secret = process.env.SECRET


const userController = {
    register: async (req, res) =>{
        try {
            const {name, email, password, confirmPassword, role, key} = req.body 

            const userExist = await User.findOne({email: email})

            if(userExist){
                return res.status(422).json({msg: "Utilize outro email esse já existe."})
            }

            if(password !== confirmPassword) return res.status(422).json({msg: "Senhas diferentes."})
            
            function validarEmail(email) {
                let re = /^\S+@\S+\.\S+$/;
                return re.test(email);
            }

            const salt = await bcrypt.genSalt(12)
            const passwordCrypt = await bcrypt.hash(password, salt)

            const emailIsValid = validarEmail(email)
            if(emailIsValid){
                const user = {
                    name: name,
                    email: email,
                    password: passwordCrypt,
                    role: role
                }

                if(user.role === "Admin") {
                    if(key !== adminkey){
                        return res.status(422).json({msg: "Chave para administradores errada."})
                    }
                }

                const response = await User.create(user)
                res.status(201).json({response, msg: "Usuário criado com sucesso."})
            } else {
                return res.status(422).json({msg: "Email inválido."})
            }

        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Erro no sistema, tente novamente mais tarde."})
        }
    },
    login: async (req, res) => {

        try {
            const {email, password} = req.body 

            const user = await User.findOne({email: email})

            if(!user){
                return res.status(404).json({msg: "Email não encontrado."})
            }

            const comparedPassword = await bcrypt.compare(password, user.password)

            if(!comparedPassword) return res.status(422).json({msg: "Senha inválida"})
    

            const id = user._id 
            const token = jwt.sign(
                {
                    id: id
                },
                secret
            )

            res.status(200).json({msg: "Login feito com sucesso", token, id, user})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Erro no sistema, tente novamente mais tarde."})
        }
    },
    privateRoute: async (req, res) => {
        try {
            const id = req.params.id 

            const user = await User.findById(id)

            if(!user) res.status(404).json({msg: "Usuário não encotrado."})

            res.status(200).json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Erro no sistema, tente novamente mais tarde."})
        }
    },
    selectProducts: async (req, res) => {
        try {
            const id = req.params.id 
            const productID = req.body

            const user = await User.findByIdAndUpdate(id,   {$push: {products: productID }}, {new: true})

            if(!user) res.status(404).json({msg: "Usuário não encotrado."})

            res.status(200).json({msg: "Adcionando com sucesso", user})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Erro no sistema, tente novamente mais tarde."})
        }

    },
    deleteProducts: async (req, res) => {
        try {
            const id = req.params.id 

            const user = await User.findById(id)

            if(!user) res.status(404).json({msg: "Usuário não encotrado."})


            const productID = req.body 

            const userUptade = await User.findByIdAndUpdate(id,
            {$pull: {products: productID }},
            { new: true })

            res.status(200).json({msg: "Produto excluído", userUptade})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg: "Erro no sistema, tente novamente mais tarde."})
        }
    }
}

module.exports = userController;