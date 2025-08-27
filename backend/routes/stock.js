const router = require("express").Router()
const stockController = require("../controllers/stockController")
const upload = require("../utils/upload")

router.route("/estoque").post(upload.single("image"), (req, res, next) => {
    const image = req.file 

    if(!image) {
        return res.status(400).json({msg: "Por favor, envie um arquivo."});
    }
    next()
}, stockController.create)
router.route("/estoque").get((req, res) => stockController.getAllProducts(req, res))
router.route("/estoque/:id").get((req, res) => stockController.getOneProduct(req, res))
router.route("/estoque/:id").patch(upload.single("image"), (req, res) => stockController.edit(req, res))
router.route("/estoque/:id").delete((req, res) => stockController.delete(req, res))


module.exports = router