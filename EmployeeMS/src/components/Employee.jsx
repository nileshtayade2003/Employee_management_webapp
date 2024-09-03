import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Employee = () => {

  const [employee, setEmployee] = React.useState([])
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get('http://localhost:3000/auth/employee')
    .then(result => {
      setEmployee(result.data.data)
    })
    .catch(err => console.log(err))
  },[employee])

  const handleDelete = (id)=>{
    const  confirm = window.confirm("Are you sure you want to delete this employee?")
    if (confirm) {
      axios.delete(`http://localhost:3000/auth/delete_employee/${id}`)
      .then(result => {
         if(result.data.status)
         {
           toast.success("Employee deleted successfully",{
             position: "top-right",
             autoClose: 2000,
            })

          // Update the UI by removing the deleted employee from the state
          setEmployees(employee.filter(e => e.id !== id));
   
         }
         else
         {
          toast.error(result.data.error,{
            position: "top-right",
            autoClose: 2000,
           })
         }

        })
        .catch(err => {
          toast.error(err,{
            position: "top-right",
            autoClose: 2000,
           })
        })
        }
  }

  return (
    <div className='px-5 mt-5'>
    <div className='d-flex justify-content-center'>
      <h3>Employee List</h3>
    </div>
      <Link to='/dashboard/add_employee' className='btn btn-success'>Add Employee</Link>
      <div className='mt-3'>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Email</th>
                <th>Address</th>
                <th>Salary</th>
                <th>Actions</th>
                
              </tr>
            </thead>
            <tbody>
            {employee.map((e) => {
                return (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td>
                       
                          <img src={`http://localhost:3000/images/${e.image}`} alt="Profile Image"  className='employee_image'   />
                        
                    </td>
                    <td>{e.email}</td>
                    <td>{e.address}</td>
                    <td>{e.salary}</td>
                    <td>
                      <Link to={`/dashboard/edit_employee/`+e.id} className='btn btn-info btn-sm me-2'>Edit</Link>
                      <button className='btn btn-danger btn-sm' onClick={()=> handleDelete(e.id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}

            </tbody>

          </table>
        </div>
    </div>
  )
}

export default Employee
