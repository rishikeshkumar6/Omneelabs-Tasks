import React from 'react'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import { useSelector } from 'react-redux'
import boxStyles from './AdminPermissionBox.module.css'
const AdminPermissionBox = () => {
    const data=useSelector((state)=>state.getBoxPermission)
  return (
    <div className={boxStyles.parent}>
      <AdminSidebar/>
      <h1>Hey i am AdminPermissionBox component</h1>
      {console.log("AdminPermissionBox components")}
      {console.log(data)}
     {
        data?data.sidebar===true &&  <div className={boxStyles.permissionBox}>
        Sidebar Menu
     </div>
     :
     <span></span>
     }
    </div>
  )
}

export default AdminPermissionBox
