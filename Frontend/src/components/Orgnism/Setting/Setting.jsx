import React,{useEffect,useState} from 'react'
import axios from 'axios'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import { getAdminBox } from '../../../Redux/getBoxPermissionSlice'
import { useDispatch,useSelector } from 'react-redux'
import adminsetingStyles from './Setting.module.css'

const Setting = () => {
  const dispatch=useDispatch()
    const [SidebarPermission,setSidebarPermission]=useState({
        sidebar:false
    })
    const [UpdateMessage,setUpdateMessage]=useState("")
    const [Data,setData]=useState(null)
    const Datas=useSelector((state)=>state.getBoxPermission)
    const handleChange=(event)=>{
       setSidebarPermission({sidebar:event.target.checked})
    }

    const handleSave=async (event)=>{
        event.preventDefault()
        try{
            const request=await axios.put("http://localhost:4500/updateadminsetting/65c46d4fe98177909d462181",{...SidebarPermission})
            const response=request.data
           if(response.matchedCount===1){
            setUpdateMessage("Your data updated Successfully")
             dispatch(getAdminBox());
             
           }
        }
        catch(error){
            console.log(error)
        }
    }
    const getHandleSaveData=async ()=>{
        try{
            const request=await axios.get("http://localhost:4500/getadminsetting")
            console.log(request)
            const response=request.data
            console.log(response)
            const resObj={...response}
            console.log("response object")
            console.log(resObj)
            console.log(resObj['0'])
            setSidebarPermission({sidebar:resObj['0'].sidebar})
            console.log("response object")
            setData(...response)
            
        }
        catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getHandleSaveData()
    },[])
  return (
    <div className={adminsetingStyles.parent}>
        <AdminSidebar/>
        <table class="table" style={{width:'70%'}}>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Homepage</th>
      <th scope="col">Permission</th>
      <th scope='col'>Action</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Sidebar</td>
      <td><input type="checkbox" checked={SidebarPermission.sidebar} onChange={handleChange}/></td>
      <td><button style={{fontSize:'1rem',height:'2rem',width:'4rem',backgroundColor:'orange'}} onClick={handleSave}>Save</button></td>
      {console.log(SidebarPermission)}
    </tr>
   {
    UpdateMessage &&  <div class="alert alert-success" role="alert" 
    style={{display:'flex',position:'absolute',width:'60%',top:'10rem',justifyContent:'space-between'}}
     >
     <span>{UpdateMessage}</span><span onClick={()=>setUpdateMessage("")}>X</span>
</div>
   }
  </tbody>
</table>
{console.log("datas")}
{console.log(Datas)}
{console.log("datas")}
    </div>
  )
}

export default Setting
