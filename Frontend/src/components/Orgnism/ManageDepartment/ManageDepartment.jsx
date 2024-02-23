import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import warehouseMappingStyles from './ManageDepartment.module.css'
import VendorSidebar from '../VendorSidebar/VendorSidebar'
import { GetAdminPermission } from '../../../Redux/getAdminPermissionSlice'
import { error } from '../../../Redux/ErrorSlice'

const WarehouseMapping = () => {
  
  const navigate=useNavigate()
   const dispatch=useDispatch()
   const Permissions=useSelector((state)=>state.adminPermission)
   
    useEffect(()=>{
      dispatch(GetAdminPermission())
    },[dispatch])
  
    useEffect(() => {
      if (Permissions === null) {
        console.log("permission problem2");
        console.log(Permissions);
        dispatch(error("unaturize error"));
        console.log("problem is here");
        navigate('/vendor');
        console.log("problem is here");
      }
    }, [Permissions, dispatch, navigate]);

  if(Permissions){
    if(Permissions.myuser===true){
        return (
          <div className={warehouseMappingStyles.parent}>
       <VendorSidebar/>
       <h1>this is a manage-department  page</h1>
       {console.log("redux Permission")}
       {console.log(Permissions)}
       </div>
        )
    }
    else{
      console.log("permission problem1")
      console.log(Permissions)
      dispatch(error("unaturize error"))
      navigate('/vendor')
    }
  }
  
}

export default WarehouseMapping




