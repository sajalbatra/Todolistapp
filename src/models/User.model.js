import mongoose,{Schema} from 'mongoose';
//import bcrypt from "bcrypt";

const userSchema = new Schema(
        {
            // _id:{
            //     type: integer,
            //     required: true,
            //     unique: true,
            //     trim: true, 
            //     index: true
            // },
            username: {
                type: String,
                required: true,
                unique: true,
                lowercase: true,
                trim: true, 
                index: true
            },
            email: {
                type: String,
                required: true,
                unique: true,
                lowecase: true,
                trim: true, 
            },
            fullName: {
                type: String,
                required: true,
                trim: true, 
                index: true
            },
            password: {
                type: String,
                required: true,
                trim: true, 
                index: true
            },
            newpassword: {
                type: String,
                trim: true, 
                index: true
            }
        }
    )

    // userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
    //     return bcrypt.compare(candidatePassword, this.password);
    // };
    
    
export const user=mongoose.model("user",userSchema)