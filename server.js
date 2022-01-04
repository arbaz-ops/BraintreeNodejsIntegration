const express = require("express")
const app = express()
const braintree = require("braintree")
const cors = require("cors")
const paymentRoute = require("./paymentRoute")
const port = 3000


app.use(cors())
app.use(express.json())

app.use("/api", paymentRoute)




app.listen(port, () => {
    console.log("Server listening")
})
