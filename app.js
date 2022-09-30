//pwd :  sSY7mYL7LXFneXU
//un : notesapp
// Conn String : mongodb+srv://notesapp:sSY7mYL7LXFneXU@cluster0.bqabo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const stuffRoutes = require("./Routes/stuffRoutes");
const quoteRoutes = require("./Routes/quoteRoutes");
const userRoutes = require("./Routes/userRoute");

// const app = express();
const serverCount = 3;
const startPort = 3000;
const endPort = startPort + serverCount;
var app = [];

//mongoose.connect('mongodb+srv://notesapp:sSY7mYL7LXFneXU@cluster0.bqabo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose
    .connect("mongodb://localhost:27017/test")
    .then(() => {
        console.log("Successfully connected");
    })
    .catch((error) => {
        console.log("Error while conecting to DB ");
        console.error(error);
    });

for (let i = startPort; i < endPort; i++) {
    app[i] = express();
    // app[i].get('/',(req,res)=>res.send({'port': i}))
    // app[i].listen( i,()=>console.log('port', i,"started"))

    app[i].use((req, res, next) => {
        //console.log("Set header called")
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
        );
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, PUT, DELETE, PATCH, OPTIONS"
        );
        next();
    });

    app[i].use(bodyparser.json());

    app[i].get("/", (req, res) => {
        res.send("Hello world!, On port : " + i);
    });
    app[i].use("/getStuff", stuffRoutes);
    app[i].use("/quote", quoteRoutes);
    app[i].use("/account/auth", userRoutes);
}

module.exports = { app };
