import React, { useState } from 'react'
import AdminSidebar from '../../Orgnism/AdminSidebar/AdminSidebar'
import adminStyles from './Admin.module.css'
const Admin = () => {
    const [data,setData]=useState(JSON.parse(localStorage.getItem('userData')))
  return (
    <div className={adminStyles.parent}>
        <AdminSidebar/>
      <h1>this is a Admin Dashboard</h1>
     
    </div>
  )
}

export default Admin
