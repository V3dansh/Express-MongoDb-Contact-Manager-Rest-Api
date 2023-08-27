const express=require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv=require("dotenv").config();
const dbConnect=require("./config/dbConnection");

const app=express();
dbConnect();
app.use(express.json());

const port=process.env.PORT ||  5000;
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/user",require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port,(req,res)=>{
    console.log("Port : ",port)
})