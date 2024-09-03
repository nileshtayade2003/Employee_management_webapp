import React, { useEffect, useState } from 'react'
import axios from 'axios'
import  { Link } from 'react-router-dom'


const Home = () => {

  const [adminTotal , setAdminTotal] = useState();
  const  [employeeTotal , setEmployeeTotal] = useState();
  const [salaryTotal, setSalaryTotal] = useState();
  const [admins,setAdmins] = useState([]);
  


  useEffect(()=>{
    adminCount();
    employeeCount();
    salaryCount();
    adminRecords();
  },[])

  const adminCount = ()=>{
    axios.get('http://localhost:3000/auth/admin_count')
    .then(result =>{
      if(result.data.status)
      {
        setAdminTotal(result.data.data[0].admin)
      }
    })
    .catch(err =>{
      console.log(err)
    })
  }

  const employeeCount = ()=>{
    axios.get('http://localhost:3000/auth/employee_count')
    .then(result =>{
      if(result.data.status)
      {
        setEmployeeTotal(result.data.data[0].employee)
      }
    })
    .catch(err =>{
      console.log(err)
    })
  }

  const salaryCount = () =>{
    axios.get('http://localhost:3000/auth/salary_total')
    .then(result =>{
      if(result.data.status)
      {
        setSalaryTotal(result.data.data[0].salary)
      }
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const adminRecords = ()=>{
    axios.get('http://localhost:3000/auth/admin_records')
    .then(result =>{
      if(result.data.status)
      {
        setAdmins(result.data.data);
      }
    })
    .catch(err =>{
      console.log(err)
    })
  }


  return (
    <div>
    <div className='p-3 d-flex justify-content-around mt-3'>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
        <div className='text-center pb-1'>
          <h4>Admin</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total:</h5>
          <h5>{adminTotal}</h5>
        </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
        <div className='text-center pb-1'>
          <h4>Employee</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total:</h5>
          <h5>{employeeTotal}</h5>
        </div>
      </div>
      <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
        <div className='text-center pb-1'>
          <h4>Salary</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'>
          <h5>Total:</h5>
          <h5>${salaryTotal}</h5>
        </div>
      </div>
    </div>
    <div className='mt-4 px-5 pt-3'>
      <h3>List of Admins</h3>
      <table className='table'>
        <thead>
          <tr>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            admins.map(a => (
              <tr key={a.id}>
                <td>{a.email}</td>
                <td>
                <button
                  className="btn btn-info btn-sm me-2">
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm" >
                  Delete
                </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Home;
