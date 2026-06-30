import express from "express"
import { Login, Logout, registered } from "../Controllers/AuthControllers.js"


const AuthRouter = express.Router()

AuthRouter.post("/regiter" , registered)
AuthRouter.post("/Login" , Login)
AuthRouter.post("/Logout" , Logout)

export default AuthRouter