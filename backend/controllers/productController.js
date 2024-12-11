import { log } from "console";
import productModel from "../models/ProductModel.js";
import fs from 'fs'
import path from 'path';


//add product item
const addProduct = async (req,res)=>{
        console.log(req.files);
        
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, message: "At least one image is required" });
    }
    const imageFilenames =req.files.map(file => file.filename);
    const colors = req.body.colors ? String(req.body.colors).split(',') : []
    
    if (colors.length !== imageFilenames.length) {
        return res.status(400).json({
            success: false,
            message: "Each image must have a corresponding color",
        });
    }

    const imagesWithColors = imageFilenames.map((filename, index) => ({
        filename,
        color: colors[index],
    }));
    
    const product = new productModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        images:imagesWithColors,
        type:req.body.type
    })
    try{
        await product.save()
        res.status(200).json({success:true,message:"Product added"})
    } catch(err) {
        console.log(err);
        res.status(500).json({success:false,message:"There was an error"})
    }
}

//all products list
const listProducts=async (req,res)=>{
    try{
        const products = await productModel.find({})
        res.json({success:true,data:products})
    } catch(err) {
        console.log(err);
        res.json({success:false , message:"There was an error"})
        
    }
}

//remove product item 
const removeProduct = async (req,res)=>{
    try{
        
        const product = await productModel.findById(req.body.id)
        
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        
        product.images.forEach(({filename}) => {
            const imagePath = path.join(process.cwd(), `../uploads/${filename}`);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting image file:", err);
                } else {
                    console.log(`Image ${filename} deleted`);
                }
            });
        });
        
        await productModel.findByIdAndDelete(req.body.id)
        
        res.json({success:true,message:"Product removed successfully"})
    } catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"There was an error"})
        
    }
}

const suggestProduct = async (req,res)=>{
    try{
    const {categories}=req.query
    const categoryArray = categories?categories.split(','):[]
    
    if (categoryArray.length === 0) {
        return res.status(400).json({ error: "Categories parameter is required" });
    }

    const productPromises = categoryArray.map(async (category)=>{    
        return productModel.aggregate([
            {$match: {category}},
            {$sample:{size:2} }
        ])
    })

    const productsByCategory = await Promise.all(productPromises)
    const products = productsByCategory.flat()
    
    console.log(products[0].images);
    
    if(products.length===0){
        return res.status(404).json({message:"No products matching"})
    }
    res.json({success:true , products})
} catch(err){

    console.log(err);
    res.status(500).json({ success: false, message: "There was an error suggesting products" });
    
}

}

const getProductById = async (req,res)=>{
    try{
        const {ids} = req.query

        if (!ids) {
            return res.status(400).json({
              success: false,
              message: "Invalid input. 'ids' must be an array.",
            });
          }

        
        const idsArray= ids.split(',')
        
        const products = await productModel.find({ _id: { $in: idsArray } });  
        console.log(products);
        
        if (!products || products.length === 0) {
            return res.status(404).json({
              success: false,
              message: "No products found for the provided IDs.",
            });
          }
        
        res.status(200).json({success:true,data:products})
    } catch (err){
        console.log(err);
        res.status(500).json({success:false , message:"There was an error",err})
    }
}


const inStockUpdate = async (req,res)=>{
    const {inStock} = req.body
    try{
        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            {inStock},
            {new:true}
        )
        res.status(200).json({success:true , data:product})
    } catch(err){
        console.log(err);
        res.status(500).json({success:false , message:"Failed to update product status"})
    }
}

export {addProduct,listProducts,removeProduct,suggestProduct ,getProductById ,inStockUpdate}