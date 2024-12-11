import orderModel from "../models/orderModel.js";

const placeOrder = async (req,res)=>{
    try{
        const{
            user,
            products,
            totalAmount,
            shippingAddress,
        } = req.body

        
        
        if (
            !user?.name ||
            !user?.email ||
            !user?.phone ||
            !totalAmount ||
            !shippingAddress?.address ||
            !shippingAddress?.building
        ) {
            return res.status(400).json({ message: "All fields are required" });
          }
        
        const newOrder = new orderModel({
            user,
            products,
            totalAmount,
            shippingAddress, 
          });
        
        const savedOrder = await newOrder.save();
        
        res.status(201).json({
            message: "Order placed successfully",
            order: savedOrder,
          });
    } catch(err){
        console.error("Error placing order:", err);
        res.status(500).json({ message: "Internal server error" })
    }
}

const deleteOrder =  async (req,res)=>{
    try{
        const order = await orderModel.findById(req.body.id)
        
        if (!order){
            return res.status(404).json({success:false , message:"Order not found or already deleted"})
        }
        await orderModel.findByIdAndDelete(req.body.id)
        res.status(200).json({success:true , message:"Order deleted successfully"})
    } catch(err){
        console.log(err);
        res.status(500).json({success:false,message:"There was an error , please try again"})
    }
}

const updateOrder = async (req,res)=>{
    try{
        const {id , status} = req.body;
        
        if(!id || !status) {
            return res.status(400).json({ success: false, message: "Order ID and status are required" });
        }
        const order = await orderModel.findByIdAndUpdate(
            id,
            {status},
            {new:true}
        )

        if(!order){
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order
          });

    } catch(err){
        console.error(err);
        res.status(500).json({ success: false, message: "There was an error, please try again" });
    }
}

const listOrders = async (req,res)=>{
    try{
        const orders =await orderModel.find().sort({ createdAt:-1 })
        res.json({success:true, data:orders})
        
    } catch(err){
        console.log(err);
        res.json({success:false , message:"There was an error"})
        
    }
}


export {placeOrder,deleteOrder,listOrders,updateOrder}