import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"User",
        enum:["Admin","Staff","User"],
    }

},{timestamps:true})

export default mongoose.model('User', userSchema);