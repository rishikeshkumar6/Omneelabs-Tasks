import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import otpStyles from './otpveryfication.module.css';
import { useSelector,useDispatch } from 'react-redux';
import {  otpData, otpFunction } from '../../../Redux/otpSlice';
import { otpPopups } from '../../../Redux/registerSlice';

const OtpVerification = () => {
  const Error=useSelector((state)=>state.Error)
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const handleChange=(event)=>{
    console.log(event.target.value)
        dispatch(otpData(event.target.value))
  }
  const handleOtp = async () => {
    dispatch(otpFunction())
    dispatch(otpPopups(false))
         
};

  return (
    
    <div className={otpStyles.parent}>
      <h2>OTP Verification</h2>
      <input type="text" onChange={(e) =>handleChange(e)} />
      <button onClick={handleOtp} className={otpStyles.btnStyle}>Submit OTP</button>
     
        

      {Error && <span>{Error}</span>}
      
    </div>
    
      
  );
};

export default OtpVerification;

