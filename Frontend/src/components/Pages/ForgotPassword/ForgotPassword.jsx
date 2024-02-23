import React,{useState} from 'react'
import forgotStyles from './ForgotPassword.module.css'
const ForgotPassword = () => {
    const [Input,setInput]=useState({
        email:"",
        newPassword:"",
        otp:""
    })
    const [userType,setUserType]=useState("customer")
    const handleChange=(event)=>{
           setInput({...Input,[event.target.name]:event.target.value})
    }

  return (
    <div className={forgotStyles.parent}>
      <h2>Reset Your Password</h2>
      <span className={forgotStyles.curowsel}>
        <h5 onClick={()=>setUserType("customer")}>Customer</h5>
        <h5 onClick={()=>setUserType("vendor")}>Vendor</h5>
      </span>
      <div className={forgotStyles.inputField}>
      <span>
        Email
        <input type='email' onChange={handleChange} name="email" value={Input.email}/>
       </span>

       <span>
        New Password
        <input type='password' onChange={handleChange} name='newPassword' value={Input.newPassword}/>
       </span>

       <span>
        Enter Otp
        <input type='text' onChange={handleChange} name='otp' value={Input.otp}/>
       </span>
      </div>
      <button className={forgotStyles.btnStyle}>Change Password</button>
     {JSON.stringify(Input)}
     {console.log({userType:userType})}
    </div>
  )
}

export default ForgotPassword
