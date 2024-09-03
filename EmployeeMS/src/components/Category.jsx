import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Category = () => {
  const [category, setCategory] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:3000/auth/category")
    .then(result =>{
      if(result.data.status){
        setCategory(result.data.data)
      }
    }).catch(err  => console.log(err))

  },[])

  return (
    <div className='px-5 mt-5'>
      <div className='d-flex justify-content-center'>
        <h3>Category List</h3>
      </div>
        <Link to='/dashboard/add_category' className='btn btn-success'>Add Category</Link>
        <div className='mt-3'>
          <table className='table'>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
            {category.map((category) => {
                return (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                  </tr>
                );
              })}

            </tbody>

          </table>
        </div>
    </div>
  )
}

export default Category
