import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productName:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min: 0,
    },
    productImage:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    shortDescription:{
        type:String,
        required:false
    },
    longDescription:{
        type:String,
        required:false
    },
    features: {
        type: [String],
        required: false,
        default: [], 
    }
},{timestamps:true});

export default mongoose.model('Product', productSchema);