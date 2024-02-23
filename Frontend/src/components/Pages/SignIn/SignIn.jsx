import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './SignIn.module.css';
import InputControlComponents from '../../Atoms/InputControlComponents/InputControlComponents';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { login,  signin } from '../../../Redux/loginSlice';
import { error } from '../../../Redux/ErrorSlice';

const SignIn = (props) => {
  const [Input, setInput] = useState({
    email:"",
    password: "",
  });
  const loginData=useSelector((state)=>state.login.userLoginData)
  const loginError=useSelector((state)=>state.Error)
  const dispatch=useDispatch()
  const [userType,setUserType]=useState("customer")
  const navigate = useNavigate();
  
  const handleChange = (event) => {
    if(Input){
      dispatch(error(""))
    }
    setInput({ ...Input, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!Input.email || !Input.password) {
     
      dispatch(error("please fill all fields"))
      return;
    }
    
    dispatch(login({...Input,userType:userType}))
    try{
        dispatch(signin())
    }
    catch(error){
      console.log(error)
    }
 
  };

  useEffect(()=>{
    if(loginData){
     if(loginData.userType==="vendor"){
       navigate('/vendor')
     }
     else if(loginData.userType==="customer"){
       navigate('/customer')
     }
    }
 },[loginData])

  
  return (
    <div className={styles.parentcontainer}>
     <Link to="/adminlogin"><button className={styles.btnStyles}>Admin Login</button></Link>
      <div className={styles.innerBox}>
        <span>
          <h3 onClick={() => { setUserType("customer") }}>Customer</h3>
          <h3 onClick={() => setUserType("vendor")}>Space Provider</h3>
          {console.log(userType)}
        </span>

        {userType==="vendor" ?
          <>
            {/* Input fields for vendor login */}
            <InputControlComponents type="email" label="Email" placeholder="Enter Your Email Address"
         name="email" value={Input.email} onChange={handleChange}/>
       
         <InputControlComponents type="password" label="Password" placeholder="Enter Your Password" 
          name="password" value={Input.password} onChange={handleChange}/>
          </>
          :
          <>
            {/* Input fields for customer login */}
            <InputControlComponents type="email" label="Email" placeholder="Enter Your Email Address"
         name="email" value={Input.email} onChange={handleChange}/>
       
         <InputControlComponents type="password" label="Password" placeholder="Enter Your Password" 
          name="password" value={Input.password} onChange={handleChange}/>
          </>
        }

        <div className={styles.footer}>
          <button onClick={handleSubmit} >{userType==="vendor"?"Signin Vendor":"SignIn Customer"}</button>
          <p>Do you have an account?{" "}
            <span>
              <Link to="/register">SignUp</Link>
            </span>
           
          </p>
          <p>
            <span>
              <Link to="/forgot-password">forgot password</Link>
            </span>
           
          </p>
          {/* {Error && <span>{Error}</span>} */}
          {loginError && <span>{loginError}</span>}
        
  
        </div>
      </div>
      
    </div>
  );
};

export default SignIn;
