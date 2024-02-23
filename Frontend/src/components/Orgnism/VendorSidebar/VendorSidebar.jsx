import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate,Link } from 'react-router-dom';
import {
  faChevronRight,
  faChevronDown,
  faBuilding,
  faClipboardList,
  faSignOutAlt,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import './VendorSidebar.css';
import { GetAdminPermission } from '../../../Redux/getAdminPermissionSlice';


const VendorSidebar = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const Permissions=useSelector((state)=>state.adminPermission)

  const [listYourSpaceOpen, setListYourSpaceOpen] = useState(false);
  const [myUserOpen, setMyUserOpen] = useState(false);
  const [rfqManagementOpen, setRFQManagementOpen] = useState(false);
  const [invoiceManagementOpen, setInvoiceManagementOpen] = useState(false);
  const [enquiryAndChatOpen, setEnquiryAndChatOpen] = useState(false);

  const toggleListYourSpace = () => {
    setListYourSpaceOpen(!listYourSpaceOpen);
  };

  const toggleMyUser = () => {
    setMyUserOpen(!myUserOpen);
  };

  const toggleRFQManagement = () => {
    setRFQManagementOpen(!rfqManagementOpen);
  };

  const toggleInvoiceManagement = () => {
    setInvoiceManagementOpen(!invoiceManagementOpen);
  };

  const toggleEnquiryAndChat = () => {
    setEnquiryAndChatOpen(!enquiryAndChatOpen);
  };

  const Logout=()=>{
    localStorage.clear()
    navigate('/')
  }

 
  useEffect(()=>{
   dispatch( GetAdminPermission())
  },[dispatch])

 

  return (
    
    <div className="sidebar">
    <div className="sidebar-item" style={{fontSize:'1.5rem',fontWeight:'bold'}}>Warehousity</div>
    <div className="sidebar-item">
      <FontAwesomeIcon icon={faBuilding} /> Dashboard
    </div>
    

{Permissions ? (
  Permissions.listwarehouse === true && 
  <div className="sidebar-item" onClick={toggleListYourSpace}>
    {listYourSpaceOpen ? (
      <>
        <FontAwesomeIcon icon={faChevronDown} /> List Your Space
      </>
    ) : (
      <>
        <FontAwesomeIcon icon={faChevronRight} /> List Your Space
      </>
    )}
    {listYourSpaceOpen && (
      <div className="submodule">
        <span><Link to="/vendor/warehouse-list">List Your Warehouse</Link></span>
        <span><Link to="/vendor/my-warehouse">My Warehouse</Link></span>
        <span><Link to="/vendor/rejected-warehouse">Rejected by WHS</Link></span>
      </div>
    )}
  </div>
) : (
  <span></span>
)}


   <div className="sidebar-item">
      <FontAwesomeIcon icon={faClipboardList} /> Booking
    </div>

    {
      Permissions? ( Permissions.myuser===true &&  <div className="sidebar-item" onClick={toggleMyUser}>
      {myUserOpen ? (
        <>
          <FontAwesomeIcon icon={faChevronDown} /> My User
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faChevronRight} /> My User
        </>
      )}
      {myUserOpen && (
        <div className="submodule">
         <Link to="/vendor/manage-user"><span>Manage Users</span></Link>
        <Link to="/vendor/manage-roles"><span>Manage Roles</span></Link>
         <Link to="/vendor/manage-department"><span>Manage Departments</span></Link>
         <Link to="/vendor/warehouse-mapping"><span>Warehouse Mapping</span></Link>
        </div>
      )}
    </div>
      )
      :
      <span></span>
    }


    {
      Permissions? (Permissions.rfq===true && <div className="sidebar-item" onClick={toggleRFQManagement}>
      {rfqManagementOpen ? (
        <>
          <FontAwesomeIcon icon={faChevronDown} /> RFQ Management
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faChevronRight} /> RFQ Management
        </>
      )}
      {rfqManagementOpen && (
        <div className="submodule">
        <Link to="/vendor/manage-rfq"><span> Manage RFQ</span></Link>
        <Link to="/vendor/open-rfq"><span> Open RFQ</span></Link>
        </div>
      )}
    </div>)
    :
    <span></span>
    }

    <div className="sidebar-item" onClick={toggleInvoiceManagement}>
      {invoiceManagementOpen ? (
        <>
          <FontAwesomeIcon icon={faChevronRight} /> Invoice Management
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faChevronRight} /> Invoice Management
        </>
      )}
      {invoiceManagementOpen && (
        <div className="submodule">
          <span> Create Invoice</span>
          <span> Manage Vendor Invoice</span>
        </div>
      )}
    </div>

    <div className="sidebar-item" onClick={toggleEnquiryAndChat}>
      {enquiryAndChatOpen ? (
        <>
          <FontAwesomeIcon icon={faChevronDown} /> Enquiry And Chat
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faChevronRight} /> Enquiry And Chat
        </>
      )}
      {enquiryAndChatOpen && (
        <div className="submodule">
         <span> Create New</span>
          <span> Manage Enquiry</span>
        </div>
      )}
    </div>

    <div className="sidebar-item">
      <FontAwesomeIcon icon={faBell} /> Notification
    </div>

    <div className="sidebar-item" onClick={Logout}>
    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
    </div>
  </div>
  );
};

export default VendorSidebar;



