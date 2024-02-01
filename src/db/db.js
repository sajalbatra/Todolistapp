import mongoose from "mongoose";
import 'dotenv/config'
const mongourl=process.env.MONGO_URI

export default async function database(){
    try {
        await mongoose.connect(`${mongourl}/${"todoapplication"}`);
        console.log("Database connection done");
    } catch (error) {
        console.log("Mongo DB connection error: check it\n:"+error);
    }

}