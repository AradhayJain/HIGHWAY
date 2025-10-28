import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./utils/db.js"

const PORT = process.env.PORT || 3000;

dotenv.config({})
const app = express();
const corsOptions = {
    origin : "*",
    methods:"GET,PUT,DELETE,POST",
    credentials:true
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.listen("/",(_,res)=>{
    connectDB();
    console.log(`server running on port ${PORT}`)
})