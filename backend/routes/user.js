const router = require("express").Router()
const userController = require("../controllers/userController")
const tokenCheck = require("../utils/tokenCheck")


router.route("/user/cadastro").post((req, res) => userController.register(req, res))

router.route("/user/login").post((req, res) => userController.login(req, res))

router.route("/user/:id").get(tokenCheck, (req, res) => userController.privateRoute(req, res))

router.route("/user/:id/addproducts").patch((req, res) => userController.selectProducts(req, res))

// fazer os testes com a rota de addproducts

module.exports = router