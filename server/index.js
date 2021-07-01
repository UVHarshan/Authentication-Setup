const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

// Set up server
const app = express();
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Hi!! Server started on port: ${PORT}`));
// app.get("/test", (req,res) => {
//     res.send("It is working!!")
// } )

// Connect to MongoDB
mongoose.connect(process.env.MDB_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error) => {
    if(error) return console.error(error);
    console.log("Connected to the database")
})

// This middleware is used to parse the input entered from the user as a JSON object.
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));


// Importing the router files and using them
app.use('/auth', require("./routers/UserRouter"));
app.use('/customer', require("./routers/customerRouter"));