import React, { useState } from "react";
import "./style.css";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleSubmit = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:3000/auth/adminlogin",values)
    .then((result) => {
      if(result.data.loginStatus)
      {
        toast.success("Logged in successfully",{
          position: "top-right",
            autoClose: 2000,
        })
        localStorage.setItem('valie',true);
        navigate('/dashboard')
      }
      else{
  
        toast.error(result.data.error,{
          position: "top-right",
          autoClose:2000
        })
      }
    })
    .catch((err) => {
      console.log(err)
      toast.error('Unexpected error occurred',{
        position: "top-center",
        autoClose:2000
      })
    })
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3  rounded w-25 border loginForm">

      
        {/* {error && <div className="text-danger mb-3">{error}</div>} */}
        

        <h2>Login Page</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="text"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              className="form-control rounded-0"
              value={values.email}
              onChange={(e)=>setValues({...values,email:e.target.value})}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Enter Password"
              className="form-control rounded-0"
              value={values.password}
              onChange={(e)=>setValues({...values,password:e.target.value})}
            />
          </div>

          <button className="btn btn-success w-100 rounded-0 mb-2">
            Log In
          </button>

          <div className="mb-1">
            <input type="checkbox" name="tick" id="tick" className="me-2" />
            <label htmlFor="tick">
              You are agree with terms and conditions
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
