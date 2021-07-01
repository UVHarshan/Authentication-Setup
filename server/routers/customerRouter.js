const router = require("express").Router();
const Customer = require("../models/customerModel");
const auth = require("../middleware/auth");

// Saving a customer in the database
router.post("/",auth, async (req,res) => {
    try {
        const {name} = req.body;

        // Creating a new customer object to save in the database
        const newCustomer = new Customer({
            name
        })

        const savedCustomer =  await newCustomer.save();
        
        // Sending response back to the frontend
        res.json(savedCustomer);        
    } catch (err) {
        console.error(err);
        res.status(500).send();        
    }
});

router.get("/", auth, async (req, res) => {
    try {
      const customers = await Customer.find();
      res.json(customers);
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
  });
  



module.exports = router;