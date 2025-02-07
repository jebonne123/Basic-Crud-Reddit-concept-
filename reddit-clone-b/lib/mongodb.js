import mongoose from "mongoose";

const connectDB = async () => {
    if(mongoose.connections[0].readyState){
        return;
    };
    
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    console.log("yehey connected to the database!");
}

export default connectDB;