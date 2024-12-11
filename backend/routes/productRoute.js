import express from "express"
import { addProduct, getProductById, listProducts, removeProduct, suggestProduct ,inStockUpdate} from "../controllers/productController.js"
import multer from "multer"

const productRouter = express.Router()

//Image Storage Engine
const storage=multer.diskStorage({
    destination: "uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

productRouter.post("/add",upload.array("images", 5),addProduct)
productRouter.get("/list",listProducts)
productRouter.post("/remove",removeProduct)
productRouter.get("/suggest",suggestProduct)
productRouter.get("/get",getProductById)
productRouter.put("/:id/stock",inStockUpdate)
export default productRouter