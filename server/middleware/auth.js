const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  try { 

    const token = req.cookies.token;
    console.log(token);
    // res.send("okay")
    if (!token) return res.status(401).json({ errorMessage: "Unauthorizeddddddddddd" });

    // Decoding the JWT token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verified);
    req.user = verified.user;

    // Passing the execution to the router function
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

module.exports = auth;