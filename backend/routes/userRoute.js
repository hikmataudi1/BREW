import express from "express"
import { sendEbookEmail , sendOrderMail } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.post("/ebookmail",sendEbookEmail)
userRouter.post("/ordermail",sendOrderMail)

export default userRouter