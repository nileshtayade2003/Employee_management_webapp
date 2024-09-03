import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { adminRouter } from "./routes/adminRoute.js";
import {employeeRouter} from "./routes/employeeRoute.js"
import { dirname } from "path";
import  jwt  from "jsonwebtoken";


const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT','DELETE'],
  credentials:true
}))

app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())

app.use('/auth',adminRouter)
app.use('/employee',employeeRouter)


const verifyUser = (req,res,next)=>{
  const token = req.cookies.token;
  if(token)
  {
    jwt.verify(token, "ldfldlfjoeroiejlvjoijdoijfoij_jwt_secret",(err,decoded)=>{
      if(err)
      {
        return res.json({status:false,error:'Wrong token'})
      }

      req.role = decoded.role;
      req.id = decoded.id;

      next();
    })
  }
  else{
    return res.json({status:false,error:"Not authenticated"})
  }
}

app.get('/verify',verifyUser,(req,res)=>{
  return res.json({
    status:true,
    role:req.role,
    id:req.id
  })
})

app.listen(3000,()=>{
  console.log('server is running')
})