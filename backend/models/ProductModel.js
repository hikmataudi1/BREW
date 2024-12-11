import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {type:String , required:true , },
    description:{type:String , required:true},
    price:{type:Number ,  required:true},
    images:[{
        filename:{type:String , required:true}, 
        color:{type:String,required:true}
    }],
    category:{type:String ,  required:true},
    type:{type:String ,  required:true},
    inStock:{type:Boolean , default:true}
    
})

const productModel= mongoose.models.product || mongoose.model("product" , productSchema)
export default productModel