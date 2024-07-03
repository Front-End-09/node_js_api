// Call express package
const express = require('express');
// Call express to use in variable app
const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Connect to database
const mongoose = require('mongoose');
const Product = require('./models/productModel');
// Route
app.get('/', (req, res) => {
    res.send('Hello Node Api')
})
app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is ty.')
});

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
app.get('/product/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
    }catch(error){
        res.status(500).json({message: error.message})
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
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);

    }catch(error){
        res.status(500).json({message: error.nessage})
    }
 })

mongoose.set("strictQuery", false);

mongoose.connect('mongodb+srv://Suonty:Tyty1080@first-apii.rqmmjsa.mongodb.net/Node-API?retryWrites=true&w=majority&appName=first-apii')
    .then(() => {
        console.log('Connected to MongoDB');
        // Function callback
        app.listen(3000, () => {
            console.log("Node API app is running on port 3000");
        })
    }).catch((error) => {
        console.log(error);
    });
