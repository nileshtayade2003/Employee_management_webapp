import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer"
import path from 'path'
import fs from 'fs'

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const { email, password } = req.body;
  const q = "select * from admin where email = ? and password = ?";
  con.query(q, [email, password], (err, result) => {
    if (err)
      return res.status(500).json({ loginStatus: false, error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email , id:result[0].id},
        "ldfldlfjoeroiejlvjoijdoijfoij_jwt_secret",
        { expiresIn: "1d" }
      );
      res.cookie('token',token)
      return res.status(200).json({loginStatus:true})
    }else{
      return res.status(200).json({loginStatus:false,error:"Invalid email or password"})
    }
  });
});

router.get('/category',(req,res)=>{
  const  q = "select * from category";
  con.query(q,(err,result)=>{
    if(err) return  res.json({status:false,error:"Query error"})
    return  res.json({status:true,data:result})


  })

})

router.post('/add_category', (req, res)=>{
  const  {category} = req.body;
  const q = "INSERT INTO category (`name`) values (?)";
  con.query(q,[category],(err,result)=>{
    if(err) return res.json({status: false, error:"Query error"})
    return res.json({status:true})
  })
});

// image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/'); // Specify the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_"+ Date.now()+ path.extname(file.originalname)); // Create a unique filename
  }
});

const upload = multer({
  storage:storage
})

// end image upload

router.post('/add_employee',upload.single('image'),(req,res)=>{
  const q = `INSERT INTO employee (name,email,password,address,salary,image,category_id) values (?)`;
  bcrypt.hash(req.body.password,10,(err,hash)=>{
    if(err) return res.json({status:false,error:"Query error"})
    const values =[
      req.body.name,
      req.body.email,
      hash,
      req.body.address,
      req.body.salary,
      req.file.filename,
      req.body.category_id
    ]

    con.query(q,[values],(err,result)=>{
      if(err) return res.json({status: false, error:"Query error"})
      return res.json({status:true})
    })
  })
})

router.get('/employee',(req,res)=>{
  const q = `select * from employee`;
  con.query(q,(err,result)=>{
    if(err) return res.json({status: false, error:"Query error"})
    return res.json({status:true,data:result})
  })
})

router.get('/employee/:id',(req,res)=>{
  const id = req.params.id;
  const q = `select * from employee where id = ?`;
  con.query(q,[id],(err,result)=>{
    if(err) return res.json({status: false, error:"Query error"})
    return res.json({status:true,data:result})
  })
})

router.put('/edit_employee/:id',(req,res)=>{
  const id = req.params.id;
  const q = `UPDATE employee SET name = ?, email = ?,  address = ?  ,salary = ?,category_id = ? WHERE id = ?`
  const values = [
    req.body.name,
    req.body.email,
    req.body.address,
    req.body.salary,
    req.body.category_id,
    id
    ]

    con.query(q,values,(err,result)=>{
      if(err) return res.json({status: false, error:"Query error"+err})
      return  res.json({status:true})

    })
})

router.delete("/delete_employee/:id",(req,res) =>{
  const id = req.params.id;

    //Delete the record from database
  const q = `delete from employee where id = ?`;
  con.query(q,[id],(err,result)=>{
    if(err) return res.json({status:false,error:"Something went wrong with query"})
    return res.json({status:true})
  })
})

router.get('/admin_count',(req,res)=>{
  const q = `select count(id) as admin from admin`;
  con.query(q,(err,result)=>{
    if(err) return res.json({status:false,error:"query error"})
    return res.json({status:true, data:result})
  })
})

router.get('/employee_count',(req,res)=>{
  const q = 'select count(id) as employee from employee'
  con.query(q,(err,result)=>{
    if(err) return res.json({status:false, error: "Query error"})
    return res.json({status:  true, data: result})
  })
})

router.get('/salary_total', (req,res) =>{
  const q = `select sum(salary) as salary from employee`
  con.query(q,(err,result)=>{
    if(err) return res.json({status:false, error:"query error"})
    return res.json({status:true, data:result})
  })
})

router.get('/admin_records', (req,res)=>{
  const q = 'select id,email from admin';
  con.query(q,(err,result)=>{
    if(err) return res.json({status:false,error:"query error"})
    return res.json({status:true, data:result})
  })
})

router.get('/logout', (req,res) =>{
  res.clearCookie("token")
  return res.json({status:true})
})



export { router as adminRouter };
