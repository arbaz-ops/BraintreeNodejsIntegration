const braintree = require("braintree")
const dotenv = require("dotenv")

dotenv.config()

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
  });


exports.generateToken = (req,res) => {
    gateway.clientToken.generate({}).then((response) => {
        res.status(201).json({
            "clientToken": response.clientToken,
            "success": true,    
        })
        // gateway.paymentMethod.find(
        //     response.clientToken
        // ).then((paymentMethod) => {
        //     res.json({
        //         "nonce": paymentMethod
        //     })
        // }).catch((error) => {
        //     res.send(error.name)
        // })
    }).catch((error)=> {
        res.status(500).json()
    })
}

exports.processPayment = (req,res) => {
    const nonceFromTheClient = req.body.payment_method_nonce
    const amount = req.body.amount
    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }).then((response) => {
          res.status(200).json({
              "response": response
          })
      }).catch((error) => {
          res.status(500).json({
              error: error
          })
      })


     
}