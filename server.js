// Call express package
const express = require('express');
// Call express to use in variable app
const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Call database mongoose
const mongoose = require('mongoose');
//Call product model
const Product = require('./models/productModel');
// Route api product
//Add product
app.post('/product', async(req, res) => {
   try{
    const product = await Product.create(req.body)
    res.status(200).json(product);

   }catch(error){
     console.log(error.message);
     res.status(500).json({message: error.message});
   }
});

//List product
app.get('/product', async(req, res) => {
   try{
     const product = await Product.find({});
     res.status(200).json(product);
   }catch(error){
    res.status(300).json({message: error.message})
   }
});

//Detail product
app.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Update product
app.put('/product/:id', async (req, res) => {
    try {
       const { id } = req.params;
       const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
       if (!product) {
          return res.status(404).json({ message: 'Cannot find any product with that ID' });
       }
       const updateProduct = await Product.findById(id);
       res.status(200).json(updateProduct);
    } catch (error) {
       res.status(500).json({ message: error.message });
    }
 });

 //Delete product
 app.delete('/product/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `Cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);

    }catch(error){
        res.status(500).json({message: error.nessage})
    }
 });

//Call customer model
const Customer = require('./models/customerModel');

//Route api customer
//Add customer
app.post('/customer', async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(200).json(customer);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});
//List customer
app.get('/customer', async(req, res) => {
    try{
        const customer = await Customer.find({});
        res.status(200).json(customer);
    }catch(error){
       res.status(500).json({message: error.message});
    }
});
// Detail customer
app.get('/customer/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//Update customer
app.put('/customer/:id', async(req, res) => {
   try{
    const {id} = req.params;
    const customer = await Customer.findByIdAndUpdate(id, req.body, {new: true});
    if(!customer){
        return res.status(404).json({message: 'Cannot find any customer with that ID'});
    }
    const updataCustomer = await Customer.findById(id);
    res.status(200).json(updataCustomer);
   }catch(error){
     return res.status(500).json({message: error.message});
   }
});
//Delete customer
app.delete('/customer/:id', async(req, res) => {
   try{
      const {id} = req.params;
      const customer = await Customer.findByIdAndDelete(id);
      if(!customer){
        return res.status(500).json({message: `Cannot find any id customer with ID:${id}`});
      }
      res.status(200).json(customer);
   }catch(error){
      res.status(500).json({message: error.message});
   }
});

//Call array data model
const Student = require('./models/arrayModel');

app.post('/student', async (req, res) => {
    try {
        // Create a new student document based on the request body
        const student = await Student.create(req.body);

        res.status(201).json({ student });
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Close strictQuery
mongoose.set("strictQuery", false);
//Connect to database server
mongoose.connect('mongodb+srv://Suonty:Tyty1080@first-apii.rqmmjsa.mongodb.net/Node-API?retryWrites=true&w=majority&appName=first-apii')
    .then(() => {
        console.log('Connected to MongoDB');
        // Function callback
        app.listen(3000, () => {
            console.log("Node JS API app is running on port 3000");
        })
    }).catch((error) => {
        console.log(error);
    });
