import axios from 'axios'
import { toast,ToastContainer  } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditEmployee = () => {
  const {id} = useParams()
  const navigate = useNavigate();
  
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    salary:'',
    address:'',
    category_id:''
  })

  const [category, setCategory] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3000/auth/category")
    .then(result =>{
      if(result.data.status){
        setCategory(result.data.data)
      }
    }).catch(err  => console.log(err))

    axios.get('http://localhost:3000/auth/employee/'+id)
    .then((result)=>{
      setEmployee({
        ...employee,
        name:result.data.data[0].name,
        email:result.data.data[0].email,
        address:result.data.data[0].address,
        salary:result.data.data[0].salary,
        category_id:result.data.data[0].category_id,
      })
    })
    .catch((err)=>{
      console.log(err)
    })

  },[])

  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.put('http://localhost:3000/auth/edit_employee/'+id,employee)
    .then( (result)=>{
      if(result.data.status)
      {
        toast.success("Record updated successfully", {
          position: "top-right",
          autoClose: 2000, 
        });
        navigate('/dashboard/employee')
        
      }
      else{
        toast.error(result.data.error, {
          position: "top-right",
          autoClose: 2000, 
        });
      }
    })
    .catch((err)=>{
        toast.error(err,{
          position:"top-right",
          autoClose:2000,
        })
    })
  }

 


  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
    <div className="p-3 rounded w-50 border">
      <h3 className="text-center">Edit Employee</h3>
      <form className="row g-1" onSubmit={handleSubmit} >
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputName"
            placeholder="Enter Name"
            value={employee.name}
            onChange={(e) =>
              setEmployee({ ...employee, name: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control rounded-0"
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="off"
            value={employee.email}
            onChange={(e) =>
              setEmployee({ ...employee, email: e.target.value })
            }
          />
        </div>
        <div className="col-12">
         
          <label htmlFor="inputSalary" className="form-label">
            Salary
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputSalary"
            placeholder="Enter Salary"
            autoComplete="off"
            value={employee.salary}
            onChange={(e) =>
              setEmployee({ ...employee, salary: e.target.value })
            }
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control rounded-0"
            id="inputAddress"
            placeholder="1234 Main St"
            autoComplete="off"
            value={employee.address}
            onChange={(e) =>
              setEmployee({ ...employee, address: e.target.value })
            }
          />
        </div>
        <div className="col-12 mb-3">
          <label htmlFor="category_id" className="form-label">
            Category
          </label>
          <select name="category_id" id="category_id"  className="form-select"
              onChange={(e) => setEmployee({...employee, category_id: e.target.value})}
              value={employee.category_id}
              >
            {category.map((c) => {
              return <option key={c.id} value={c.id} >{c.name}</option>;
            })}
          </select>
        </div>
       
        <div className="col-12 ">
          <button type="submit" className="btn btn-primary w-100">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default EditEmployee
