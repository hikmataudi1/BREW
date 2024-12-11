import express from "express";
import { placeOrder,deleteOrder,listOrders, updateOrder} from "../controllers/orderController.js";

const orderRouter =express.Router()

orderRouter.post("/add",placeOrder)
orderRouter.post("/remove",deleteOrder)
orderRouter.get("/get",listOrders)
orderRouter.put("/update",updateOrder)

export default orderRouter