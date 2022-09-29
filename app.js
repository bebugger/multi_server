//pwd :  sSY7mYL7LXFneXU
//un : notesapp
// Conn String : mongodb+srv://notesapp:sSY7mYL7LXFneXU@cluster0.bqabo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const express = require('express');
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const stuffRoutes = require('./Routes/stuffRoutes')
const quoteRoutes = require('./Routes/quoteRoutes')
const userRoutes = require('./Routes/userRoute')

const app = express();
//mongoose.connect('mongodb+srv://notesapp:sSY7mYL7LXFneXU@cluster0.bqabo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.connect('mongodb://localhost:27017/test').then(()=>{
    console.log("Successfully connected")
}).catch((error)=>{
    console.log("Error while conecting to DB ")
    console.error(error);
});
app.use((req, res, next) => {
    //console.log("Set header called")
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyparser.json());



// app.use('/getStuff',(req,res,next)=>{
// Thing.find().then((things)=>{
//     res.status(200).json(things)
// }).catch((error)=>{
//     res.status(400).json({
//         error: error
//     })
// })
// }); 
app.get('/', (req, res) => {
  res.send("Hello world!");
})
app.use('/getStuff',stuffRoutes);
app.use('/quote',quoteRoutes);
app.use('/account/auth',userRoutes);

module.exports = app;