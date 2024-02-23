import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import adminStyles from './Admin.module.css'
import InputControlComponents from '../../Atoms/InputControlComponents/InputControlComponents'
import { adminLogin, loginAdmin } from '../../../Redux/adminLoginSlice'
import { error } from '../../../Redux/ErrorSlice'
const AdminLogin = () => {
  const dispatch=useDispatch()
  const Data=useSelector((state)=>state.admin.fetchAdminData)
  const Error=useSelector((state)=>state.Error)
   const [Input,setInput]=useState({
    email:"",
    password:""
   })
   const navigate=useNavigate()
   const handleChange=(event)=>{
        dispatch(error(""))
    setInput({...Input,[event.target.name]:event.target.value})
   }
   const AdminLogin=async (event)=>{
    event.preventDefault()
    if(!Input.email || !Input.password){
        dispatch(error("Please fill all input filed"))
        return
    }
    dispatch(adminLogin(Input))
    try{
      dispatch(loginAdmin())
    }
    catch(err){
      console.log("admin catch part")
      console.log(err)
    }
  
   }

   useEffect(()=>{
     if(Data){
       if(Data.userType==="Admin"){
        navigate('/admin')
       }
     }
   },[Data])

 
  return (
    <div className={adminStyles.parentcontainer}>
    <div className={adminStyles.innerBox}>
     
    <>
        <h1>Admin Login</h1>
          {/* Input fields for vendor login */}
       
          <InputControlComponents type="email" label="Email" placeholder="Enter Your Email Address"
       name="email" value={Input.email} onChange={handleChange}/>
     
       <InputControlComponents type="password" label="Password" placeholder="Enter Your Password" 
        name="password" value={Input.password} onChange={handleChange}/>
        <button onClick={AdminLogin}>Login</button>
        {Error && <span style={{color:'red',fontWeight:'bold'}}>{Error}</span>}
        </>
            </div>
  </div>
  )
}

export default AdminLogin
