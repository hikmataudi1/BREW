import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    user: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
                required: true,
            },
            quantity: { type: Number, required: true },
            colors: [{type:String , required:true}],
        },
    ],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ["Pending", "Processing" , "Delivered", "Cancelled"],
        default: "Pending",
    },
    shippingAddress: {
        address: { type: String, required: true },
        building: { type: String, required: true },
    },
    createdAt: { type: Date, default: Date.now },
    
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
