import React,{useEffect,useState} from 'react'
import axios from 'axios'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import adminbarStyles from './ApprovedWarehouse.module.css'

const ApprovedWarehouse = () => {
  const [data,setData]=useState([])
  const getData=async ()=>{
    const token = JSON.parse(localStorage.getItem('Token'))

    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
     try{
      const request=await axios.get("http://localhost:4500/getwarehouselisting",config)
      // console.log(request)
      const response=request.data
      console.log(response)
      setData(response)
     }
     catch(error){
      console.log(error)
     }
  }
}

useEffect(()=>{
  getData()
},[])

  return (
    <div className={adminbarStyles.parent}>
        <AdminSidebar/>
  <table class="table" >
  <thead >
    <tr >
      <th scope="col">S.NO.</th>
      <th scope="col">Warehouse Id</th>
      <th scope="col">User Name</th>
      <th scope="col">Warehouse  Name</th>
      <th scope="col">Warehouse Category Name</th>
      <th scope="col">Warehouse Type Name</th>
    </tr>
  </thead>
 
    {data.length>0 && data.map((elem,index)=>{
      return (
        <tbody>
        <th scope="row">{index+1}</th>
        <td>{elem._id}</td>
        <td>{elem.username}</td>
        <td>{elem.warehousename}</td>
        <td>{elem.warehousecategory}</td>
        <td>{elem.warehousetype}</td>
        </tbody>
      )
    })} 
  
 
</table>
    </div>
  )
}

export default ApprovedWarehouse



