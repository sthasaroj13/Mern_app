import  express from "express";

import mongoose from "mongoose"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js";
const router = express.Router();
import {ApiResponse} from "../utils/ApiResponse.js"

//creating
router.post('/',async(req,res)=>{
    const {name ,email ,age} =req.body

    const existError = await User.findOne({
        $or: [{ name }, { email }],
      });
      if (existError) {
        throw new ApiError(409, "user with email or username is already exist");
      }
    try {
        const userData = await User.create({
            name :name,
            email:email,
            age:age
        })
        // console.log(userData);
        res.status(201)
        .json(userData)
    } catch (error) {
        console.error(error)
        throw new ApiError(500, 'Internal Server Error');
        // res.status(500).json({ error:  })
        
        
    }
})

//get
router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users); // Use status 200 for successful retrieval
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ message: "Internal server error" }); // Use status 500 for generic server errors
    }
  });
//get single user 
router.get("/" ,async (req,res)=>{
  const {id} = req.params
  try {
  const singleUser =   await User.findById({_id :id})
  if (!singleUser) {
    throw new  ApiError(400,"User is not found ")
  }
  res.status(200)
  .json(
    new ApiResponse(200,"singleUser is entry successfully")

  )
    
  } catch (error) {
  console.log(error)
  res.status(400)
  .json({error :error.message})
  }
})
//delete
router.delete("/:id" ,async (req,res)=>{
  const {id} = req.params
  try {
  const UserId =   await User.findByIdAndDelete({_id :id})
  if (!UserId) {
    throw new  ApiError(400,"User is not found ")
  }
  res.status(200)
  .json(
    new ApiResponse(200,"singleUser is deleted successfully")

  )
    
  } catch (error) {
  console.log(error)
  res.status(400)
  .json({error :error.message})
  }
})
//put // patch or edit
router.patch("/:id",async(req,res)=>{

  const {id} = req.params
  const {name,email,age} = req.body
  const UpdateUser = await  User.findByIdAndUpdate(
    id,
  req.body,
    {
      new :true
    }
  )
  if (!UpdateUser) {
    throw new ApiError(400, "Data is not found ")
  }
  res.status(200)
  .json(
     new ApiResponse(200, "Data is updated !!!")
  )
})


  export default router