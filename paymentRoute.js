const express = require("express")
const router = express.Router()
const {generateToken, processPayment} = require("./paymentController")



router.get("/generate/token", generateToken)
router.post("/process/payment", processPayment)

module.exports = router