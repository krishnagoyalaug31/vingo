import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import shopRouter from './routes/shop.routes.js'
import itemRouter from './routes/item.routes.js'
import orderRouter from './routes/order.routes.js'
import http from 'http'
import { Server } from 'socket.io'
import { socketHandler } from './socket.js'
dotenv.config()
const app=express()
const server = http.createServer(app)
const allowedOrigins = [ "http://localhost:5173", "https://vingo-frontend-m9i3.onrender.com" ]
const io = new Server(server,{
    cors:{
    origin:allowedOrigins,
    credentials:true,
    methods:['POST','GET']
}
})
app.set("io",io) 
const port = process.env.PORT || 8000

app.use(cors({
    origin:allowedOrigins,
    credentials:true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}))


app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/shop",shopRouter)
app.use("/api/item",itemRouter)
app.use("/api/order",orderRouter)
socketHandler(io)
app.get("/",(req,res)=>{
    console.log("backend connected successful")
    res.send("hello backend")
})
server.listen(port ,()=>{
    connectDb();
    console.log(`helloo server started at ${port}`)
})
