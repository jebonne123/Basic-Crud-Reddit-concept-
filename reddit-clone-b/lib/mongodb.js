import mongoose from "mongoose";

const connectDB = async () => {

    console.log("Connecting to MongoDB:", process.env.MONGO_URI);
    
    if(mongoose.connections[0].readyState){
        return;
    };
    
    await mongoose.connect(process.env.MONGO_URI,{

    });
    
    console.log("yehey connected to the database!");
}

export default connectDB;