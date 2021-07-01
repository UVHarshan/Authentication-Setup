const router = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Registering an user and ......... sending a JWT token
router.post("/", async (req, res) => {
  try {
    const { email, pass, passVerify } = req.body;
    if (!email || !pass || !passVerify)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields" });
    if (pass.length < 6)
      return res.status(400).json({
        errorMessage: "Please enter a password at least of 6 characters",
      });
    if (pass !== passVerify)
      return res.status(400).json({
        errorMessage: "Please enter the same password twice",
      });

    
    const existingUser = await User.findOne({ email });
    // console.log(existingUser);
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists!!!",
      });

    // Hashing the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(pass, salt);
    // console.log(passwordHash);

    // Saving the user to the database
    const newUser = new User({
      email,
      passwordHash,
    });

    const savedUser = await newUser.save();

    // Generating a token
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // console.log(token);

    // Send the token in a HTTP only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});



////// Log in the user
router.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;

    // Validattion
    if (!email || !pass)
      return res.status(400).json({
        errorMessage: "Please enter all required fields",
      });

    // Getting the user account for the entered email
    const existingUser = await User.findOne({ email });
    console.log(existingUser);

    // If there isn't an accout for the entered email
    if (!existingUser)
      return res
        .status(401)
        .json({ errorMessage: "Wrong Email or password!!" });

    // Checking the password
    const passwordCorrect = await bcrypt.compare(
      pass,
      existingUser.passwordHash
    );

    if (!passwordCorrect)
      return res
        .status(401)
        .json({ errorMessage: "Wrong Email or password!!" });


    // If the entered password is correct...........
    // Generating a token using the document ID of mongoDB and the given secret key
    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // Send the token in a HTTP only cookie
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

///////// Logout the user by clearing the cookie and setting the expired date to a very old date
router.get("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  }) .send();
  
});

////////// Checking whether the user is logged in or not
router.get("/loggedIn", (req,res) => {
  try { 
    const token = req.cookies.token;
    // console.log(token);
     
    if (!token) return res.json(false);

    // Decoding the JWT token and verifying it
    jwt.verify(token, process.env.JWT_SECRET);
    res.send(true);

  } catch (err) {    
    res.json(false);
  }
});


module.exports = router;