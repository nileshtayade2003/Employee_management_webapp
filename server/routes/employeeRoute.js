import express from 'express'
const router = express.Router();
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import con from '../utils/db.js'

router.post("/employee_login", (req, res) => {
  const { email, password } = req.body;
  const q = `select * from employee where email = ?`;
  con.query(q, [email], (err, result) => {
    if (err)
      return res.status(500).json({ loginStatus: false, error: "Query error" });
    if (result.length > 0) {
      bcrypt.compare(password,result[0].password,(err,response)=>{
        if(err)  return res.status(500).json({loginStatus:false,error:"wrong password"})
        if(response){
          const email = result[0].email;
          const token = jwt.sign(
            { role: "employee", email,id:result[0].id },
            "ldfldlfjoeroiejlvjoijdoijfoij_jwt_secret",
            { expiresIn: "1d" }
          );
          res.cookie('token',token)
          return res.status(200).json({loginStatus:true,id:result[0].id})
        }

      });
      
    }else{
      return res.status(200).json({loginStatus:false,error:"Invalid email or password"})
    }
  });
});

router.get('/detail/:id',(req,res)=>{
  const id = req.params.id;
  const q = `select * from employee where id = ?`
  con.query(q,[id],(err,result)=>{
    if(err) return res.json({status:false,error:"query error"})
    if(result.length>0)
    {
      return res.json({status:true, data:result[0]})
    }
    else{
      return res.json({status:true, message:"user not found"})
    }
  })
})

router.get('/logout',(req,res)=>{
  res.clearCookie('token');
  return res.json({status:true})
})

export {router as employeeRouter} ;