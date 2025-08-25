const router = require("express").Router()

const stockServer = require("./stock")

router.use("/", stockServer)

const userServer = require("./user")

router.use("/", userServer)

module.exports = router


