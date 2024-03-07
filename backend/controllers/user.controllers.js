
import express from express
const app = express()

app.post('/', async(req,res)=>{
    const {name,email,age} =req.body
})