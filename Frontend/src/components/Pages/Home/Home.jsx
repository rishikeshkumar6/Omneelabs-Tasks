import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeStyles from './Home.module.css'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
const Home = () => {
  // const auth=JSON.parse(localStorage.getItem("userData"))
  // const navigate=useNavigate()
  // useEffect(()=>{
  //   if((auth!==null || auth.length>0) && Array.isArray(auth)){
  //     console.log("home page")
  //        const isVendor=auth.map((elem)=>elem.vendor)
  //        if(isVendor){
  //         navigate('/vendor')
  //        }
  //        else{
  //         navigate('/customer')
  //        }
  //   }
  // },[])
 
  const userData=JSON.parse(localStorage.getItem("response"))
  // const Data=useSelector((state)=>state.home)
  const navigate=useNavigate()
  useEffect(()=>{
    console.log("home userData")
    console.log(userData)
     if(userData){
      if(userData.userType==="vendor"){
        navigate('/vendor')
      }
      else if(userData.userType==="customer"){
        navigate('/customer')
      }
      else if(userData.userType==="Admin"){
        navigate('/admin')
      }
     }
  },[])
  return (
    <div className={HomeStyles.parent}>
    {console.log(userData)}
   
    </div>
  )
}

export default Home
