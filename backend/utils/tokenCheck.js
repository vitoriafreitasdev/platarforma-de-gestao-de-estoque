const jwt = require("jsonwebtoken")
require("dotenv").config()
const secret = process.env.SECRET

function tokenCheck(req, res, next){
    const authHeader = req.headers['authorization']
    const token  = authHeader && authHeader.split(" ")[1]
    require

    if(!token){
        return res.status(401).json({msg: "Acesso negado."})
    }

    try {
        jwt.verify(token, secret)
        next()
    } catch (error) {
        console.log(error)
        res.status(400).json({msg: "Token inválido."})
    }
}

module.exports = tokenCheck