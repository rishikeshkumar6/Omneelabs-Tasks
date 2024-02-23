import logo from './logo.svg';
import './App.css';
import RootLayout from './components/Pages/RootLayout/RootLayout';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import SignUp from './components/Pages/SignUp/SignUp';
import SignIn from './components/Pages/SignIn/SignIn';
import ProtectedRouting from './components/Pages/ProtectedRouting/ProtectedRouting';
import Vendor from './components/Pages/Vendor/Vendor';
import Customer from './components/Pages/Customer/Customer';
import UpdateCustomer from './components/Pages/UpdateCustomer/UpdateCustomer';
import UpdateVendor from './components/Pages/UpdateVendor/UpdateVendor';
import Home from './components/Pages/Home/Home';
import WarehouseList from './components/Orgnism/WarehouseList/WarehouseList';
import MyWarehouse from './components/Orgnism/MyWarehouse/MyWarehouse';
import RejectedWarehouse from './components/Orgnism/RejectedWarehouse/RejectedWarehouse';
import AdminLogin from './components/Pages/AdminLogin/AdminLogin';
import Admin from './components/Pages/Admin/Admin';
import ApprovedWarehouse from './components/Orgnism/ApprovedWarehouse/ApprovedWarehouse';
import ManageUser from './components/Orgnism/ManageUser/ManageUser';
import Permission from './components/Orgnism/Permission/Permission';
import UpdatePermission from './components/Orgnism/UpdatePermission/UpdatePermission';
import ManageRfq from './components/Orgnism/ManageRfq/ManageRfq';
import OpenRfq from './components/Orgnism/OpenRfq/OpenRfq';
import ManageUsers from './components/Orgnism/ManageUsers/MangeUsers';
import ManageRoles from './components/Orgnism/ManageRoles/ManageRoles';
import ManageDepartment from './components/Orgnism/ManageDepartment/ManageDepartment';
import WarehouseMapping from './components/Orgnism/WarehouseMapping/WarehouseMapping';
import Setting from './components/Orgnism/Setting/Setting';
import AdminPermissionBox from './components/Orgnism/AdminPermissionBox/AdminPermissionBox';
import ForgotPassword from './components/Pages/ForgotPassword/ForgotPassword';

function App() {
  
   return (
   <div>
  
     <BrowserRouter>
    
      <Routes>

    <Route element={<RootLayout/>}>
    <Route element={<ProtectedRouting/>}>
    <Route path="/vendor" element={<Vendor/>}/> 
    <Route path="/vendor/editvendorprofile/:_id" element={<UpdateVendor/>}/>
    <Route path="/vendor/warehouse-list" element={<WarehouseList/>}/>
    <Route path="/vendor/my-warehouse" element={<MyWarehouse/>}/>
    <Route path="/vendor/rejected-warehouse" element={<RejectedWarehouse/>}/>
    <Route path="/vendor/manage-rfq" element={<ManageRfq/>}/>
    <Route path="/vendor/open-rfq" element={<OpenRfq/>} />
    <Route path="/vendor/manage-user" element={<ManageUsers/>}/>
    <Route path="/vendor/manage-roles" element={<ManageRoles/>}/>
    <Route path="/vendor/manage-department" element={<ManageDepartment/>}/>
    <Route path="/vendor/warehouse-mapping" element={<WarehouseMapping/>}/>
   
    </Route >
     <Route element={<ProtectedRouting/>}>
     <Route path="/customer" element={<Customer/>}/> 
     <Route path='/customer/editcustomerprofile/:_id' element={<UpdateCustomer/>}/>
     </Route>
     <Route element={<ProtectedRouting/>}>
      <Route path="/admin" element={<Admin/>}/>
      <Route path="/admin/warehouse-approved" element={<ApprovedWarehouse/>}/>
      <Route path="/admin/permission" element={<Permission/>}/>
      <Route path="/admin/permission/:id" element={<Permission/>}/>
      <Route path="/admin/listuser" element={<ManageUser/>}/>
      <Route path="/admin/adminsidebar" element={<AdminPermissionBox/>}/>
      <Route path="/admin/updatepermission/:id" element={<UpdatePermission/>}/>
      <Route path="/admin/setting" element={<Setting/>}/> 
    </Route>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<SignUp/>}/>
      <Route path='/login' element={<SignIn/>}/>
      <Route path="/adminlogin" element={<AdminLogin/>}/>
      <Route path="forgot-password" element={<ForgotPassword/>}/>
      <Route path='*' element={<h1>This Route Does'nt Exit on that website</h1>}/>
    </Route>
      
   
    </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;












