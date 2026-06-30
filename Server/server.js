import dns from "node:dns/promises"
dns.setServers(["8.8.8.8" , "1.1.1.1"])
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config"
import ConnectDB from "./config/MongoDB.js"
import AuthRouter from "./routes/AuthRoute.js"

const Port = process.env.PORT || 5000
ConnectDB()
const app = express()
app.use(express.json())
app.use(cors({ credentials: true }))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("API Working")
})

app.use("/api/auth" , AuthRouter)

app.listen(Port, () => console.log("running server by http://localhost:8000"))