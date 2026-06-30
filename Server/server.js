import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config"
import ConnectDB from "./config/MongoDB.js"
const app = express()

const Port = process.env.PORT || 5000
ConnectDB()
app.use(express.json())
app.use(cors({ credentials: true }))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("API Working")
})

app.listen(Port, () => console.log("running server by http://localhost:8000"))