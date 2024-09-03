import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'

const EmployeeDetail = () => {

  const navigate = useNavigate();
  const {id} = useParams();
  const [employee,setEmployee] = useState()

  useEffect(()=>{
    axios.get('http://localhost:3000/employee/detail/'+id)
    .then(result =>{
      if(result.data.status)
      {
        setEmployee(result.data.data)
      }
      else{
        toast.error(result.data.message,{
          position: "top-right",
          autoClose: 2000,
        })
      }
    })
    .catch(err =>{
      console.log(err)
    })
  },[])

  const handleLogout = ()=>{
    axios.get('http://localhost:3000/employee/logout')
    .then(result =>{
      if(result.data.status){
        toast.success('Logged out successfully',{
          position: "top-right",
          autoClose: 2000,
        })
        localStorage.removeItem('valid')
        navigate('/')
      }
    })
    .catch(err =>{
      console.log(err)
    })
  }

  
  return (
    <div>
        <div className="p-2 d-flex justify-content-center shadow">
            <h4>Emoployee Management System</h4>
        </div>
        {
          employee && (
            <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
            <img src={`http://localhost:3000/images/`+employee.image} alt="" className='emp_det_image'/>
            <div className='d-flex align-items-center flex-column mt-5'>
                <h3>Name: {employee.name}</h3>
                <h3>Email: {employee.email}</h3>
                <h3>Salary: {employee.salary}</h3>
            </div>
            <div>
                <button className='btn btn-primary me-2'>Edit</button>
                <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
            </div>
        </div>
          )
        }
    </div>
    
  )
}

export default EmployeeDetail
