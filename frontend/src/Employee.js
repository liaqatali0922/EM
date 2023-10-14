import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import  './style.css';

function Employee (){

  const [data, setData] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:8080/getEmployees')
    .then(res => {
      if(res.data.status==='success'){
        setData(res.data.result)
      }
    })
    .catch(err => console.log(err))
  },[])

  function handleDelete(id) {
    
    axios.delete('http://localhost:8080/delete/'+id)
    .then(res=> {

      if(res.data.status === 'success'){
        
        window.location.reload(true)
      }
      
    })
    .catch(err => console.log(err))
    }
  

 return (
<div className="px-5 py-3">
  <div className="d-flex justify-content-center mt-3">
    <h3>Empolyee List</h3>
  </div>
  <Link to='/create' className="btn btn-success">Add Employee</Link>
  <div className="mt-3">
  <table className="table">
    <thead>
    <tr>
    <th>Name</th>
    <th>Image</th>
    <th>Email</th>
    <th>Salary</th>
    <th>Address</th>
    <th>Action</th>
    </tr>
    </thead>
    <tbody>
      {
        data.map((employee,index) => {
          return <tr key={index}>
            <td>{employee.name}</td>
            <td>{
              <img src={'http://localhost:8080/' + employee.image} alt="" className="employee_image" />
              }</td>
            <td>{employee.email}</td>
            <td>{employee.salary}</td>
            <td>{employee.address}</td>
            <td>
              <Link to={'/editEmployee/' + employee._id} className="btn btn-sm btn-primary me-2">Edit</Link>
              <button className="btn btn-sm btn-danger" onClick={e=> handleDelete(employee._id)}>Delete</button>
            </td>
          </tr>
        
        })
      }
    </tbody>
  </table>
  </div>
</div>
 )
}

export default Employee;