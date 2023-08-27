const mongoose=require("mongoose");
const connectDb=async()=>{
    try{
        const connect=await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database Name: ",mongoose.connection.name);
        console.log("Database connected : ",mongoose.connection.host);

    }catch(err){
        console.log(err);
        process.exit(1);
    }
};
module.exports=connectDb;