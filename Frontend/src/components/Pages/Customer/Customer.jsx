import React,{useEffect,useState} from 'react';
import customerStyles from './Customer.module.css';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomerSidebar from '../../Orgnism/CustomerSidebar/CustomerSidebar';
import { getHome } from '../../../Redux/homeSlice';

const Customer = () => {
  const dispatch=useDispatch()
  const Data=useSelector((state)=>state.home)
  const loginData=useSelector((state)=>state.login)
  const navigate = useNavigate();
 
 useEffect(()=>{
   dispatch(getHome())
 },[dispatch])
 

 if(Data){
  const { company, name,userType,mobilenumber,_id} = Data;
  if(userType==="customer"){
    return (
      <div className={customerStyles.parent}>
        <CustomerSidebar/>
        <div>
         
          {userType==="customer" ?
          <div className={customerStyles.vendor}>
           <span className={customerStyles.firstChild}>
           <h1>Welcome {name} 😊!</h1>
            <h1>This is the customer dashboard for {company}.</h1>
            
           </span>
           </div>
            :
            navigate('/vendor')
           
          }
        </div>
       
        
      </div>
    )
   }
   else if(userType==="vendor"){
    navigate('/vendor')
   }
   else if(userType==="Admin"){
    navigate('/admin')
   }
 }

};

export default Customer;


