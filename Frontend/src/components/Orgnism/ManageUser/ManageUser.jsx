import React,{useEffect,useState} from 'react'
import axios from 'axios'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import styles from './ManageUser.module.css'
const ManageUser = () => {
    const [User,setUser]=useState([])
    const [Id,setId]=useState("")
    const [Data,setData]=useState([])
    const [Popup,setPopup]=useState(false)
    const [Update,setUpdate]=useState(false)
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
    const getData=async ()=>{
       try{
        const request=await axios.get("http://localhost:4500/userdata")
        const response=await request.data
        setData(response)
       }
       catch(error){
        console.log(error)
       }

    }
    useEffect(()=>{
        getPermission()
    },[])

    useEffect(()=>{
        getData()
    },[])
    const handleDelete=(event,id)=>{
        event.preventDefault()
        console.log(id)
            setPopup(true)
            setId(id)
        
    }

  const deletePermission=async (event,id)=>{

    event.preventDefault()
    console.log(id)
    try{
        const request=await axios.delete(`http://localhost:4500/deletepermission/${id}`)
        const response=request.data
       if(response.deletedCount===1){
        getPermission()
       }
       setPopup(false)
    }
    catch(error){
        console.log(error)
    }
  }
  return (
    <div className={styles.parent}>
        <AdminSidebar/>
        <Link to="/admin/permission"><button style={{display:'flex',position:'absolute',zIndex:'1',right:'1rem'}} class="btn btn-primary">Add User</button></Link>
     <div className={styles.parent1}>
  
     <table class="table">
  <thead>
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">User</th>
      <th scope="col">Material</th>
      <th scope='col'>Actions</th>
    </tr>
  </thead>
  <tbody>
    
   

{User.length > 0 ? User.map((elem, index) => {
    // const { listwarehouse, myuser, rfq } = elem;

    return (
       <tr key={elem._id}>
       <th scope='row'>{index+1}</th>
       <td>{elem.username}</td>
       <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
           <span style={{ display: 'flex', gap: '0.5rem' }}>
               <input type='checkbox' checked={elem.listwarehouse} readOnly={true} />
               List Your Warehouse
           </span>
           <span style={{ display: 'flex', gap: '0.5rem' }}>
               <input type='checkbox' checked={elem.myuser} readOnly={true} />
               My User
           </span>
           {(
               <span style={{ display: 'flex', gap: '0.5rem' }}>
                   <input type='checkbox' checked={elem.rfq}  readOnly={true}/>
                   RFQ
               </span>
           )}
       </td>
  <td ><DeleteIcon onClick={(event)=>handleDelete(event,elem._id)} style={{cursor:'pointer'}}/>{' '}<Link to={`/admin/permission/${elem._id}`}><CreateIcon/></Link></td>
  
   </tr>
    )
   
})
:
<div>
    <h1>User  not Found</h1>
</div>
}
  
  

  </tbody>
</table>
{
    Popup && <div className={styles.popup}>
    <h2>Are you sure delete this user</h2>
    <span><button class="btn btn-primary" onClick={()=>setPopup(false)}>Cancel</button>{' '}<button class="btn btn-primary" onClick={(event)=>deletePermission(event,Id)}>Confirm</button></span>
</div>
}
     </div>
    </div>
  )
}

export default ManageUser
