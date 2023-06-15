var express = require('express');
var router = express.Router();
var db = require("../model/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");


//adds random amount of characters, so 10 that are encrypted so no one can guess for a common password; this is why sites can't send you your password, and instead you have to reset it
const saltRounds = 10;
const supersecret = process.env.SUPER_SECRET;
//register the user
router.post("/register", async (req, res) => {
  //I will receive all the following info from the client each time they register because this is what I need from my database, which will come from my request.body
  const { email, password, profile_pic, firstname, lastname, city, zipcode, address } = req.body;
  try {
    //create a hashed password
    const hash = await bcrypt.hash(password, saltRounds);
    //insert into users in database these values 
    await db(
      `INSERT INTO users (email, password, profile_pic, firstname, lastname, city, zipcode, address) VALUES ('${email}', '${hash}', '${profile_pic}', '${firstname}', '${lastname}', '${city}', '${zipcode}', '${address}');`
    );
    res.send({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//login the user
router.post("/login", async (req, res) => {
  console.log("from backend", req.body);
  const { email, password } = req.body;
  try {
    //check if the user exists
    //user is the object I receive after I select everything with the email that is coming from the body of the request
    const results = await db(`SELECT * FROM users WHERE email = '${email}';`);
    const user = results.data[0];
    if (user) {
      const user_id = user.id;
      //compare the password; can only compare the hashed version of it
      //comparing password that's been given, and the password that's stored. Will give a boolean
      const correctPassword = await bcrypt.compare(password, user.password);
      //if password is not correct, send error
      if (!correctPassword) throw new Error("Incorrect password");
      const isAdmin = (email === 'admin@admin.com') ? true : false

      //if the password is correct, send token with user id inside
      //user the underscore here instead of dot because then it would import
      const token = jwt.sign({ user_id }, supersecret)
      res.send({message: "Login successful, here is your token", token, isAdmin});
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
  res.status(400).send({ message: err.message });
}
});

//get the protected data
router.get("/profile", userShouldBeLoggedIn, async(req, res) => {
 const user = await db(`SELECT * FROM  users WHERE id = ${req.user_id}`);
 res.send(user.data);
 console.log(user);
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
