const router = require("express").Router()
const stockController = require("../controllers/stockController")

router.route("/estoque").post((req, res) => stockController.create(req, res))
router.route("/estoque").get((req, res) => stockController.getAllProducts(req, res))
router.route("/estoque/:id").get((req, res) => stockController.getOneProduct(req, res))
router.route("/estoque/:id").patch((req, res) => stockController.edit(req, res))
router.route("/estoque/:id").delete((req, res) => stockController.delete(req, res))


module.exports = router