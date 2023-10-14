import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function AddEmployee(){

  const [data,setData] = useState({
    name: '',
    email: '',
    password: '',
    salary:'',
    address: '',
    image: ''
  });
  const navigate = useNavigate();

  function handleSubmit(event){
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("name",data.name);
    formdata.append("email",data.email);
    formdata.append("password",data.password);
    formdata.append("salary",data.salary);
    formdata.append("address",data.address);
    formdata.append("image",data.image);
    axios.post('http://localhost:8080/create',formdata)
    .then(res=>{
      navigate('/employee');
    })
    .catch(err=>console.log(err));
  }



 return(
   <div className="d-flex flex-column align-items-center pt-5">
     <h2>Add Employee</h2>
     <form class="row g-3 w-50" onSubmit={handleSubmit}>
      <div class="col-12">
        <label for="inputName" class="form-label">Name</label>
        <input type="text" class="form-control" id="inputName" placeholder="Enter Name"   autoComplete="off" onChange={e=>setData({...data,name:e.target.value})}/>
      </div>
      <div class="col-12">
        <label for="inputEmail4" class="form-label">Email</label>
        <input type="email" class="form-control" id='inputEmail4' placeholder="Enter Email" autoComplete="off" onChange={e=>setData({...data,email:e.target.value})}/>
      </div>
      <div class="col-12">
        <label for="inputPassword4" class="form-label">Password</label>
        <input type="password" class="form-control" id="inputPassword4" placeholder="Enter Password" autoComplete="off" onChange={e=>setData({...data,password:e.target.value})}/>
      </div>
      <div class="col-12">
        <label for="inputSalary" class="form-label">Salary</label>
        <input type="text" class="form-control" id="inputSalary" placeholder="Enter Salary" autoComplete="off" onChange={e=>setData({...data,salary:e.target.value})}/>
      </div>
      <div class="col-12">
        <label for="inputAddress" class="form-label">Address</label>
        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main Street" autoComplete="off" onChange={e=>setData({...data,address:e.target.value})}/>
      </div>
      <div class="col-12">
        <label for="inputGroupFile01" class="form-label">Select Image</label>
        <input type="file" class="form-control" id="inputGroupFile01" onChange={e=>setData({...data,image:e.target.files[0]})}/>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Create</button>
      </div>
     </form>
   </div>
 )
}

export default AddEmployee;