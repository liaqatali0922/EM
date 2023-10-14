import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login() {

    const [values,setValues] = useState({
        email:'',
        password:''
    });
    //const [error,Seterror] = useState('');
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    function handleSubmit(e){
       e.preventDefault();
       axios.post('https://employee-management-backend-seven.vercel.app/login', values, {
      headers: {
    'Content-Type': 'application/json',
  },
})
       .then(res=>{
        console.log('Response Data:', res.data.status);
        if(res.data.status==='success'){
         navigate('/')   

        } else {

          //Seterror(res.data.error)
        
         }
       })
       .catch(err=>{
        console.log(err)
       })

    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage d'>
            <div className='p-3 rounded w-25 border loginForm'>
                {/* <div className='text-danger'>
                    {error && error}
                </div> */}
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' onChange={e=>setValues({...values,email:e.target.value})} className='form-control rounded-0' autoComplete='off'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password' onChange={e=>setValues({...values,password:e.target.value})}  className='form-control rounded-0' />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'> Log in</button>
                    <p>You are agree to our terms and policies</p>
                    {/* <button className='btn btn-default border w-100 bg-light rounded-0 text-decoration'>Create Account</button> */}
                </form>
           </div>
     </div>
    )
}

export default Login