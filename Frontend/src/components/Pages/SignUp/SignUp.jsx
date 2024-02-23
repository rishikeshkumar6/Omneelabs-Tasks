import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SignUp.module.css";
import OtpVerification from "../otpveryfication/otpveryfication";
import InputControlComponents from "../../Atoms/InputControlComponents/InputControlComponents";
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { Signup, register, setErrorMessage } from "../../../Redux/registerSlice";
import { error } from "../../../Redux/ErrorSlice";
import { successOtp } from "../../../Redux/otpSlice";


const SignUp = () => {
  const navigate=useNavigate()
  const [userType,setUserType]=useState("customer")
  const popupMessage=useSelector((state)=>state.otp.sucessOtpMessage)
  const Popup=useSelector((state)=>state.register.otpDisplay)
  const Error=useSelector((state)=>state.Error)
  const dispatch=useDispatch()
  const [Input, setInput] = useState({
    company: "",
    name: "",
    email: "",
    mobilenumber: "",
    password: "",
  });
  
  const handleChange = (event) => {
    if(Input){
      dispatch(error(""))
    }
    setInput({ ...Input, [event.target.name]: event.target.value });
   
  };

  const otpMessage=(event)=>{
     event.preventDefault()
     dispatch(successOtp(""))
  }

  const handleVendorChange = (selectedVendor) => {
    setUserType(selectedVendor);
  };
  console.log(userType)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !Input.company ||
      !Input.name ||
      !Input.email ||
      !Input.password ||
      !Input.mobilenumber
    ) {
     dispatch(error("Please fill all fields"))
      return;
    }

    // Additional validation
    if (!validateEmail(Input.email)) {
      dispatch(error("Invalid email format"));
      return;
    }

    if (!validatePhoneNumber(Input.mobilenumber)) {
      dispatch(error("Invalid phone number format"));
      return;
    }
    dispatch(register({...Input,userType:userType,isOtpVeryfied:false}))
    dispatch(Signup())
  };

  

  return (
    <div className={styles.parentcontainer}>
      {
          Popup && <OtpVerification />
        }
         {popupMessage && (
      <div class="alert alert-success" role="alert" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',gap:'0.5rem',position:'absolute',top:'200px',
      boxShadow:' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
       fontSize:'1rem',height:'10%'}}>
      Your OTP is successfully verified.{' '}<button onClick={otpMessage}
     >
        ok
      </button>
 
      </div>
      )}
      <div className={styles.innerBox}>
        <span>
          <h3 onClick={() => handleVendorChange("customer")}>Customer</h3>
          <h3 onClick={() => handleVendorChange("vendor")}>Space Provider</h3>
        </span>

       

        {userType==="vendor" ? (
          // Code for Vendor registration
          <>
            <InputControlComponents
              type="text"
              label="Company Name"
              placeholder="Enter Your Company Name"
              name="company"
              value={Input.company}
              onChange={handleChange}
            />

            <InputControlComponents
              type="text"
              label="Full Name"
              placeholder="Enter Your Full name"
              name="name"
              value={Input.name}
              onChange={handleChange}
            />

            <InputControlComponents
              type="email"
              label="Email"
              placeholder="Enter Your Email Address"
              name="email"
              value={Input.email}
              onChange={handleChange}
            />

            <InputControlComponents
              type="number"
              label="Contact Number"
              placeholder="Enter Your Contact Number"
              name="mobilenumber"
              value={Input.mobilenumber}
              onChange={handleChange}
            />

            <InputControlComponents
              type="password"
              label="Password"
              placeholder="Enter Your Password"
              name="password"
              value={Input.password}
              onChange={handleChange}
            />
          </>
        ) : (
          // Code for Customer registration
          <>
            <InputControlComponents
              type="text"
              label="Company Name"
              placeholder="Enter Your Company Name"
              name="company"
              value={Input.company}
              onChange={handleChange}
            />

            <InputControlComponents
              type="text"
              label="Full Name"
              placeholder="Enter Your Full name"
              name="name"
              value={Input.name}
              onChange={handleChange}
            />

            <InputControlComponents
              type="email"
              label="Email"
              placeholder="Enter Your Email Address"
              name="email"
              value={Input.email}
              onChange={handleChange}
            />

            <InputControlComponents
              type="number"
              label="Contact Number"
              placeholder="Enter Your Contact Number"
              name="mobilenumber"
              value={Input.mobilenumber}
              onChange={handleChange}
            />

            <InputControlComponents
              type="password"
              label="Password"
              placeholder="Enter Your Password"
              name="password"
              value={Input.password}
              onChange={handleChange}
            />
          </>
        )}

        <div className={styles.footer}>
          <button onClick={handleSubmit}>
            {userType==="vendor" ? "Register Spaceprovider" : "Register Customer"}
          </button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/login">SignIn</Link>
            </span>
          </p>
          {Error && <span>{Error}</span>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;

