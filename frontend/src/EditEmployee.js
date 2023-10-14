import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

function EditEmployee(){

  const [data,setData] = useState({
    name: '',
    email: '',
    salary:'',
    address: ''
  });
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(()=>{
    axios.get('http://localhost:8080/get/'+id)
    .then(res => {
     if (res.data.status === 'success') {
      
      setData ({...data, name: res.data.result.name,
      email: res.data.result.email,
      salary: res.data.result.salary,
      address: res.data.result.address
      })
      
     }
    })
    .catch(err => console.log(err));
  },[])

  function handleSubmit(event){
    event.preventDefault();
    axios.put('http://localhost:8080/update/'+id,data)
    .then(res=>{
     if(res.data.status === 'success')
      navigate('/employee');
    })
    .catch(err=>console.log(err));
  }



 return(
   <div className="d-flex flex-column align-items-center pt-5">
     <h2>Update Employee</h2>
     <form class="row g-3 w-50" onSubmit={handleSubmit}>
      <div class="col-12">
        <label for="inputName" class="form-label">Name</label>
        <input type="text" class="form-control" id="inputName" placeholder="Enter Name"   autoComplete="off" onChange={e=>setData({...data,name:e.target.value})} value={data.name} />
      </div>
      <div class="col-12">
        <label for="inputEmail4" class="form-label">Email</label>
        <input type="email" class="form-control" id='inputEmail4' placeholder="Enter Email" autoComplete="off" onChange={e=>setData({...data,email:e.target.value})} value={data.email}/>
      </div>
      <div class="col-12">
        <label for="inputSalary" class="form-label">Salary</label>
        <input type="text" class="form-control" id="inputSalary" placeholder="Enter Salary" autoComplete="off" onChange={e=>setData({...data,salary:e.target.value})} value={data.salary}/>
      </div>
      <div class="col-12">
        <label for="inputAddress" class="form-label">Address</label>
        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main Street" autoComplete="off" onChange={e=>setData({...data,address:e.target.value})} value={data.address}/>
      </div>
      <div class="col-12">
        <button type="submit" class="btn btn-primary">Update</button>
      </div>
     </form>
   </div>
 )
}

export default EditEmployee;