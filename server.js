const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const orderRouter = require('./routes/order')
const cartRouter = require('./routes/cart')
const checkoutRouter = require('./routes/checkout')
const cors = require("cors")

dotenv.config();

// DB CONNECTION
mongoose.connect(process.env.MONGO_URL)
.then(()=> {
    console.log("Successfully connected to DB")
}).catch((err)=>{
    console.log("Error connecting to DB:" + err)
})

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// ROUTERS
app.use("/api/users", userRouter)
app.use("/api/products", productRouter)
app.use("/api/orders", orderRouter)
app.use("/api/carts", cartRouter)
app.use("/api/checkout", checkoutRouter)

//UNKNOWN ROUTE HANDLER
app.use((req,res)=>{
    res.status(404).json({ error: req.url + '  API NOT SUPPORTED!' });
})


// ERROR HANDLER
app.use((err,req,res,next)=>{
    if(err){
        res.send(err.message);
    }
})


app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})