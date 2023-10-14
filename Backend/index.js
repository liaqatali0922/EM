const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer')
const path =  require('path')

const app = express();
app.use(cors(
  {
    origin: "https://employee-management-frontend-five.vercel.app",
    methods: ["POST", "GET", "PUT","DELETE"],
    credentials: true
  }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('images'));

const Schema = mongoose.Schema;
const AdminSchema = new Schema({
  email:String,
  password:String
})
const EmployeeSchema = new Schema({
  name:String,
  email:String,
  password:String,
  salary:String,
  address: String,
  image:String
})


main().catch(err=>console.log('error in the database connection'))

async function main(){
 await mongoose.connect('mongodb+srv://liaqatali0922:Aa03029610374Zz@cluster0.9vlan2n.mongodb.net/development?retryWrites=true&w=majority');
 console.log('Database Connected')

}

const Admin = mongoose.model('Admin',AdminSchema);

app.post('/login', async (req,res)=>{

  const {email, password} = req.body;

   try {

    const admin = await Admin.findOne({email})

    if(!admin){
      res.status(401).json({status:'Error',Error:'Wrong Email'})
      return
    }
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (passwordMatch){

      const token = jwt.sign({role: "admin", id:admin._id}, "jwt-secrit-key", {expiresIn: "1d"});
      res.cookie('token', token);
      res.json({status:'success',id:admin._id});
    }
    else{
     res.status(401).json({status:'error', error:'wrong password'})
     return
    }
  } catch{
    res.status(500).send('Internal Server Error')
  }
})

const storage = multer.diskStorage({
  destination:(req, file, cb) => {
    cb(null, 'images')
  },
  filename:(req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer ({
  storage:storage
})

const employee = mongoose.model('employee',EmployeeSchema);

app.post('/create',upload.single('image'), async (req,res) => {

  try {
       const hashedPassword  = await bcrypt.hash(req.body.password,10);
       const newEmployee = await new employee({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        salary:req.body.salary,
        address:req.body.address,
        image:req.file.filename
       });
       const doc = await newEmployee.save();
       res.status(201).json({'message':'employee added successfully'})
  } 
catch (err) {
  console.log(err)
  res.status(500).json('server error',err)
}
})

app.get('/getEmployees', async (req,res) => {
  try {
     const employees = await employee.find();
     res.status(200).json({status:'success',result:employees})
  }
  catch (err) {
    res.status(500).json({Error:err})
  }
})

app.get('/get/:id', async (req,res)=>{
  const _id = req.params.id;
  try {
  const empl = await employee.findOne({_id})
  return res.json({status:'success', result:empl})
  }
  catch (error) {
    res.status(500).json({'error in server': error})
  }
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "You are no Authenticated"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) return res.json({Error: "Token wrong"});
            req.role = decoded.role;
            req.id = decoded.id;
            next();
        } )
    }
}

app.get('/dashboard',verifyUser, (req, res) => {
    return res.json({Status: "Success", role: req.role, id: req.id})
})

app.put('/update/:id', async (req, res)=> {
    const _id = req.params.id;
    const newSalary = req.body.salary;
    try {
      const updatedEmployee = await employee.findByIdAndUpdate(
      _id,
      { salary: newSalary },
      { new: true } // Return the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ status: 'success', employee: updatedEmployee });
  } 
  catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
})

app.post('/employeelogin', async (req,res)=>{

  const {email, password} = req.body;
  
   try {

    const emp = await employee.findOne({email})

    if(!emp){
      res.status(401).json({status:'Error',Error:'Wrong Email'})
      return
    }
    const passwordMatch = await bcrypt.compare(password, emp.password);

    if (passwordMatch){
      const token = jwt.sign({role: "employee",id:emp._id}, "jwt-secrit-key", {expiresIn: "1d"});
      res.cookie('token', token);
      res.json({status:'success',id:emp._id});
    }
    else{
     res.status(401).json({status:'error', error:'wrong password'})
     return
    }
  } catch{
    res.status(500).send('Internal Server Error')
  }
})

app.delete('/delete/:id', async (req, res) =>{

  const _id = req.params.id;

  try {
    const deletedEmployee = await employee.findByIdAndDelete(_id);

  if(!deletedEmployee) {

    return res.status(404).json({'error':'employee not found'})
  }
  res.json({'status':'success', 'result': deletedEmployee})
}
catch(err){

  res.json({'error':'error in deleting employee'})
}
})

app.get('/adminCount', async (req, res)=> {
  try {

   const adminCount = await Admin.count();
   res.json({admin:adminCount})

  }
  catch (err) {
    res.json({error:'unable to count employee'})
  }

})
app.get('/employeeCount', async (req, res)=> {
  try {
   const employeeCount = await employee.count();
   res.json({employee:employeeCount})
  }
  catch (err) {
    res.json({error:'unable to count employee'})
  }
})
app.get('/salary', async (req, res) => {
  try {
    const employees = await employee.find();
    const totalSalary = employees.reduce((acc, emp) => acc + parseFloat(emp.salary), 0);
    res.json({ sumOfSalary: totalSalary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while calculating the sum of salaries' });
  }
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({Status: "Success"});
})





app.listen(8080,()=>{
 console.log('Server is Running')
})
