import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import updatecutomerStyles from './UpdateCustomer.module.css'
import { useParams } from 'react-router-dom'
import InputControlComponents from '../../Atoms/InputControlComponents/InputControlComponents'
import axios from 'axios'
import { setPopup, updateUser, userUpdate } from '../../../Redux/userUpdateSlice'
import { error } from '../../../Redux/ErrorSlice'
const UpdateCustomer = () => {
  const Error=useSelector((state)=>state.Error)
  const dispatch=useDispatch()
    const params=useParams()
    const popup=useSelector((state)=>state.updateUser.popup)
    const navigate=useNavigate()
    const [Input,setInput]=useState({
        email:"",
        mobilenumber:""
    })
    const handleChange=(event)=>{
      dispatch(error(""))
         setInput({...Input,[event.target.name]:event.target.value})
    }

    const handlePopup=(event)=>{
        event.preventDefault()
        dispatch(setPopup(false))
    }
    const getData=async ()=>{
     try{
        const request=await axios.get(`http://localhost:4500/user/${params._id}`,{headers:{
          Authorization:`bearer ${JSON.parse(localStorage.getItem('Token'))}`
        }})
       const response=await request.data
       setInput({email:response.email,mobilenumber:response.mobilenumber})
     }
     catch(err){
        console.log(err)
     }
    }
    useEffect(()=>{
       getData()
    },[])
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
  
    const validatePhoneNumber = (phoneNumber) => {
      const phoneRegex = /^[0-9]{10}$/;
      return phoneRegex.test(phoneNumber);
    };

    const handleSubmit=async (event)=>{
        event.preventDefault()
        if(!Input.email || !Input.mobilenumber){
          dispatch(error("Please fill all input filed"))
           return
        }
        if (!validateEmail(Input.email)) {
          dispatch(error("Invalid email format"));
          return;
        }
    
        if (!validatePhoneNumber(Input.mobilenumber)) {
          dispatch(error("Invalid phone number format"));
          return;
        }
        dispatch(updateUser({...Input,id:params._id}))
        dispatch(userUpdate())
    }
  return (
    <div className={updatecutomerStyles.parent}>
     <form onSubmit={handleSubmit}>
        <h1>Update Customer Profile</h1>
     <InputControlComponents
              type="email"
              label="Update Email"
              placeholder="Enter Your Email Address"
              name="email"
              value={Input.email}
              onChange={handleChange}
            />

            <InputControlComponents
              type="number"
              label="Update Contact Number"
              placeholder="Enter Your Contact Number"
              name="mobilenumber"
              value={Input.mobilenumber}
              onChange={handleChange}
            />
            <button type='submit'>Update</button>
            {Error && <span style={{color:"red",fontWeight:"bold"}}>{Error}</span>}
     </form>
      {
        popup && <div className={updatecutomerStyles.popup}>
          <span>Profile Update Successfully</span>
          <span>Go to Home <button onClick={()=>navigate('/customer')}>home</button>{' '}<button onClick={handlePopup}>Cancel</button></span>
        </div>
      }
    </div>
  )
}

export default UpdateCustomer
