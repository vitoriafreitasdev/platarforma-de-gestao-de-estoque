const router = require("express").Router()

const stockServer = require("./stock")

router.use("/", stockServer)

module.exports = router