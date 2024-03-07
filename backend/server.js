import express from "express"
const app = express()
import mongoose from "mongoose"

import dotenv from 'dotenv'
dotenv.config()
import router from '../backend/Route/userRoutes.js'

app.use(express.json())
import  cors from 'cors'
app.use(cors())

mongoose.connect(process.env.MONGOOSE_URI)
.then(()=>{
    console.log("connect sucessfully");
    app.listen(process.env.PORT ||8000 ,(er)=>{
        if(er) console.log(err);
        console.log("running sucessfully at ",process.env.PORT);
    })
})
.catch((er)=>{
    console.log('connection fail',er);
})
app.use(router)

  
