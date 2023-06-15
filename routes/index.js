var express = require('express');
var router = express.Router();
//importing server-side stripe library
const stripe = require('stripe')('sk_test_51M56f8C8rWbcbjLQB0aIu6GwjehDUe1wIiEfnOIEMzFHZ5Exi3joVDKqbo6DrPU6d7ydFkQW78XxCjOD7v3uqZ9v00j7TcMU2Y');
//creates unique ids for the order transactions
const uuid = require('uuid').v4
//
const cors = require('cors')
// 
router.use(cors());

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send({ message: 'hello from the backend' });
});

//post request for handling the checkout

router.post('/checkout', async (req, res) => {
  console.log(req.body) //check in the terminal to see all the info, including order info
  let error, status;
  try {
    const {order, token} = req.body; //getting the order object and the token from the reqbody
    const customer = await stripe.customer.create( {
      email: token.email,
      source: token.id
    });
    //creating unique random key for the transaction
    const key = uuid();
    //calling the function that's going to charge the card
    const charge = await stripe.charges.create(
      {
        amount: order.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: 'You purchased all your groceries',
        shipping: {
          name:token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        key, //this will be unique for each transaction
      }
    );

    console.log("Charge: ", {charge});
    status = "success";

  } catch (error) {
      console.log(error);
      status = "error";
  }

  res.json({error, status});

});

module.exports = router;
