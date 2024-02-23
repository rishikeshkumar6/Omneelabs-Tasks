import React,{useEffect} from 'react';
import homeStyles from './Vendor.module.css';
import { useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getAdminBox } from '../../../Redux/getBoxPermissionSlice';
import VendorSidebar from '../../Orgnism/VendorSidebar/VendorSidebar';
import { getHome } from '../../../Redux/homeSlice';
import { error } from '../../../Redux/ErrorSlice';

const Vendor = () => {
   const navigate = useNavigate();
   const Data=useSelector((state)=>state.home)
   const dispatch=useDispatch()
   const Datafd=useSelector((state)=>state.getBoxPermission)
   const unauthrizeError=useSelector((state)=>state.Error)

  useEffect(()=>{
    dispatch(getAdminBox())
   
    },[dispatch])
  
 useEffect(()=>{
    dispatch(getHome())
 },[dispatch])
  

if(Data){
  const { company, name,userType } = Data;
if(userType==="vendor"){
  const handleError=()=>{
    dispatch(error(""))
  }
  
return (
  <div className={homeStyles.parent}>
  <VendorSidebar/>
     
      {userType==="vendor" ?
      <>
      <span className={homeStyles.firstChild}>
      <h1>Welcome  {name} 😊!</h1>
        <h1>This is the vendor dashboard for {company}.</h1>
        
        {
          unauthrizeError && <div class="alert alert-danger d-flex align-items-center" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
          <div style={{display:'flex',gap:'32rem'}}>
            <span>Unauthrize Access</span><span onClick={handleError}>ⓧ</span>

          </div>
          
        </div>
        }
      </span>
        </>
        :
        navigate('/customer')
       
      }
    
  

    {
      Datafd?(Datafd.sidebar===true && <div className={homeStyles.box}>
        Sidebar Menu
      </div>)
      :
      <div><span></span></div>
    }
  </div>
)
}
else if(userType==="customer"){
  navigate('/customer')
}

else if(userType==="Admin"){
  navigate('/admin')
}
}

else {
  return (
    <div>

    </div>
  )
}


};

export default Vendor;


