import React,{useState} from 'react'
import { useNavigate,Link } from 'react-router-dom'
import {  useDispatch } from 'react-redux';
import axios from 'axios'
import styles from './Header.module.css'
import { resetAllState } from '../../../Redux/userSlice';
const Header = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const auth=localStorage.getItem('Token')
    const [popup,setPopup]=useState(false)
    const Data=JSON.parse(localStorage.getItem('userData')) 
   const [data,setData]=useState(null)
    const handleLogout=()=>{
        localStorage.clear()
        dispatch(resetAllState())
        navigate('/')
    }

    const handleUpdate=async ()=>{
        const token = JSON.parse(localStorage.getItem('Token'));

        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        
          axios.get('http://localhost:4500/home', config)
            .then(response => {
              setData((response.data))
              console.log("response")
              console.log(response.data['userType'])
              if(response.data['userType']==="vendor"){
                console.log('vendor')
                navigate(`/vendor/editvendorprofile/${response.data['_id']}`)
              }
              else if(response.data['userType']==="customer"){
                console.log('vendor')
                navigate(`/customer/editcustomerprofile/${response.data['_id']}`)
              }
             
              
              console.log(response.data);
            })
            .catch(error => {
              console.log(error)
              console.error('Error making GET request:', error.response ? error.response.data : error.message);
            });
    }
}
   const handleHome=(isVendor)=>{
        if(isVendor){
          navigate('/vendor')
        }
        else{
          navigate('/customer')
        }
   }
  return (
    <div className={styles.parent}>
    <nav class="navbar navbar-expand-lg navbar-light " >
  <div class="container-fluid" style={{fontWeight:'bold'}}>
    <span class="navbar-brand" style={{fontSize:'2rem',color:'white'}}>Warehousity</span>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent" >
      {
         auth?   <span style={{display:'flex',gap:'1rem',position:'relative',left:'48rem'}}>
            <form class="d-flex">
         <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
         <button class="btn btn-outline-success" type="submit" style={{color:'white'}}>Search</button>
       </form>
      { Data ? Data.map((elem)=>{
        return  (
          <div className={styles.dropdown} key={elem._id}>
            <span onClick={()=>setPopup(true)} >{elem.name}{' '}v</span>
            {
               popup && elem.userType==="Admin"? <div className={styles.dropdownContent}>
              <li onClick={()=>handleHome(elem.userType)}>Home</li>
              <li onClick={handleLogout} >Logout</li>
              </div>
              :
              <div className={styles.dropdownContent}>
              <li onClick={()=>handleHome(elem.userType)}>Home</li>
              <li onClick={handleUpdate}>Update Profile</li>
              <li onClick={handleLogout} >Logout</li>
            </div>
          
            }
          </div>
        )
 
      })
    :
    <span style={{display:'flex',gap:'1rem',position:'relative',left:'66rem',fontWeight:'bold'}}>
    <Link to="/login"><button style={{background:'transparent'}}>Login</button></Link>
    <Link to="/register"><button style={{background:'transparent'}}>Register</button></Link>
    </span>

    }
   
         </span>
       :
       <span style={{display:'flex',gap:'1rem',position:'relative',left:'66rem',fontWeight:'bold'}}>
            <Link to="/login"><button style={{background:'transparent'}}>Login</button></Link>
            <Link to="/register"><button style={{background:'transparent'}}>Register</button></Link>
       </span>
     
      }
     
    </div>
   
 
  </div>
</nav>
</div>
  )
}

export default Header

