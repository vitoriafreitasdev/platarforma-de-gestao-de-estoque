const router = require("express").Router()
const userController = require("../controllers/userController")
const tokenCheck = require("../utils/tokenCheck")


router.route("/user/register").post((req, res) => userController.register(req, res))

router.route("/user/login").post((req, res) => userController.login(req, res))

router.route("/user/:id").get(tokenCheck, (req, res) => userController.privateRoute(req, res))

router.route("/user/:id/addproducts").patch((req, res) => userController.selectProducts(req, res))

router.route("/user/:id/deleteproducts").delete((req, res) => userController.deleteProducts(req, res))




module.exports = router