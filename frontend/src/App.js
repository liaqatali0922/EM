import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import Employee from './Employee';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import Start from './Start';
import EmployeeDetail from './EmployeeDetail';
import EmployeeLogin from './EmployeeLogin';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} >
        <Route path="" element={<Home/>} />
        <Route path="/employee" element={<Employee/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/create" element={<AddEmployee/>} />
        <Route path="/editEmployee/:id" element={<EditEmployee/>} />
        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/start' element={<Start />}></Route>
        <Route path='/employeeLogin' element={<EmployeeLogin />}></Route>
        <Route path='/employeedetail/:id' element={<EmployeeDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
