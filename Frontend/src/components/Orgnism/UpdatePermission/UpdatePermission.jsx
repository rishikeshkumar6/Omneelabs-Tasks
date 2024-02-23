import React,{useEffect,useState} from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import updateStyles from './UpdatePermission.module.css'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
const UpdatePermission = () => {
    const params=useParams()
    const navigate=useNavigate()
    const [User,setUser]=useState([])
    const [Input,setInput]=useState({
        listwarehouse: false,
        myuser: false,
        rfq: false
    })
    const getPermission=async ()=>{
        try{
         const request=await axios.get("http://localhost:4500/getpermission")
         const response=await request.data
         console.log(response)
         setUser(response)
        }
        catch(error){
         console.log(error)
        }
     }
     const handleChange=(event)=>{
         setInput({...Input,[event.target.name]:event.target.checked})
     }
     const updatePermission=async ()=>{
       try{
        console.log(params.id)
        const request=await axios.put(`http://localhost:4500/updateuserdata/${params.id}`,{
            
            Permission:{
                listwarehouse: Input.listwarehouse,
                myuser: Input.myuser,
                rfq: Input.rfq
            }
        })
       if(request.data['message']==="User updated successfully"){
        navigate('/admin/listuser')
       }
       }
       catch(error){
        console.log(error)
       }
       
     }
     useEffect(()=>{
        getPermission()
     },[])
  return (
   
        <div className={updateStyles.parent}>
        <AdminSidebar/>
      <div className={updateStyles.parent1}>
        <h2>Update Permission</h2>
      <span>
      <span><input type="checkbox" checked={Input.listwarehouse} name="listwarehouse" onChange={handleChange}/>List Your Warehouse</span>
        <span><input type="checkbox" checked={Input.myuser} name='myuser' onChange={handleChange}/>My User</span>
        <span><input type="checkbox" checked={Input.rfq} name="rfq" onChange={handleChange}/>RFQ</span>
        <button class="btn btn-primary" style={{width:'30%'}} onClick={updatePermission}>Update</button>
      </span>
      {JSON.stringify(params)}
      {JSON.stringify(Input)}
      </div>
    </div>
   
  )
}

export default UpdatePermission
