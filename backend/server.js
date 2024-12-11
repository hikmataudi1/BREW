import express from "express" 
import cors from "cors"
import { connectDB } from "./config/db.js"
import productRouter from "./routes/productRoute.js"
import orderRouter from "./routes/orderRoute.js"
import userRouter from "./routes/userRoute.js"



//app config
const app=express()
const port = process.env.PORT || 4000 

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors()) 

 
//db connection 
connectDB()

//api endpoint
app.use("/api/product",productRouter)
app.use("/images",express.static('uploads'))
app.use("/api/order" , orderRouter)
app.use("/api/user" , userRouter)

app.get('/',(req,res)=>{
  res.send("API working")
})

app.listen(port,()=>{
    console.log(`Server running on http:localhost:${port}`);
})