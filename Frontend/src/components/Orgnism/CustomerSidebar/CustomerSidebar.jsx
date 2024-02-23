import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  faChevronRight,
  faChevronDown,
  faBuilding,
  faClipboardList,
  faSignOutAlt,
  
} from '@fortawesome/free-solid-svg-icons';
import './CustomerSidebar.css';

const CustomerSidebar = () => {
    const navigate=useNavigate()
  const [listYourSpaceOpen, setListYourSpaceOpen] = useState(false);
  const [AdminSidebarPermission,setAdminSidebarPermission]=useState(null)
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
  const getAdminSetting=async ()=>{
    try{
      const request=await axios.get("http://localhost:4500/getadminsetting")
      const response=request.data
      console.log("customer")
      console.log(response)
     setAdminSidebarPermission(...response)
    }
    catch(error){
      console.log(error)
    }
 }

 useEffect(()=>{
   getAdminSetting()
 },[])

  return (
    // <div className="sidebar">
    //   <div className="sidebar-item" style={{fontSize:'1.5rem',fontWeight:'bold'}}>Warehousity</div>
    //   <div className="sidebar-item">
    //     <FontAwesomeIcon icon={faBuilding} /> Dashboard
    //   </div>
    //   <div className="sidebar-item" onClick={toggleListYourSpace}>
    //     {listYourSpaceOpen ? (
    //       <>
    //         <FontAwesomeIcon icon={faChevronDown} /> My Waresheet
    //       </>
    //     ) : (
    //       <>
    //         <FontAwesomeIcon icon={faChevronRight} /> My Waresheet
    //       </>
    //     )}
    //     {listYourSpaceOpen && (
    //       <div className="submodule">
    //       <span>Create New</span>
    //        <span>Manage Waresheet</span>
         
    //       </div>
    //     )}
    //   </div>

    

    //   <div className="sidebar-item">
    //     <FontAwesomeIcon icon={faClipboardList} /> Favourites
    //   </div>

    //   <div className="sidebar-item">
    //     <FontAwesomeIcon icon={faClipboardList} /> My Cart
    //   </div>

    //   <div className="sidebar-item">
    //     <FontAwesomeIcon icon={faClipboardList} /> My Bookings
    //   </div>

    //   <div className="sidebar-item" onClick={toggleMyUser}>
    //     {myUserOpen ? (
    //       <>
    //         <FontAwesomeIcon icon={faChevronDown} /> Documents
    //       </>
    //     ) : (
    //       <>
    //         <FontAwesomeIcon icon={faChevronRight} /> Documents
    //       </>
    //     )}
    //     {myUserOpen && (
    //       <div className="submodule">
    //        <span>Space Certificate</span>
    //       <span>Agreement Package</span>
    //        <span>Sow</span>
    //        <span>Sop</span>
    //        <span>Noc</span>
    //        <span>Others</span>
    //       </div>
    //     )}
    //   </div>

    //   <div className="sidebar-item" onClick={toggleRFQManagement}>
    //     {rfqManagementOpen ? (
    //       <>
    //         <FontAwesomeIcon icon={faChevronDown} /> RFQ 
    //       </>
    //     ) : (
    //       <>
    //         <FontAwesomeIcon icon={faChevronRight} /> RFQ 
    //       </>
    //     )}
    //     {rfqManagementOpen && (
    //       <div className="submodule">
    //       <span> Manage RFQ</span>
    //       </div>
    //     )}
    //   </div>

    //   <div className="sidebar-item">
    //     <FontAwesomeIcon icon={faClipboardList} /> Enquiry Management
    //   </div>

    //   <div className="sidebar-item">
    //     <FontAwesomeIcon icon={faClipboardList} /> Invoice Management
    //   </div>

    //   <div className="sidebar-item" onClick={Logout}>
    //   <FontAwesomeIcon icon={faSignOutAlt} /> Logout
    //   </div>
    // </div>
    <div className="sidebar">
    <div className="sidebar-item" style={{fontSize:'1.5rem',fontWeight:'bold'}}>Warehousity</div>
    <div className="sidebar-item">
      <FontAwesomeIcon icon={faBuilding} /> Dashboard
    </div>
    <div className="sidebar-item" onClick={toggleListYourSpace}>
      {listYourSpaceOpen ? (
        <>
          <FontAwesomeIcon icon={faChevronDown} /> My Waresheet
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faChevronRight} /> My Waresheet
        </>
      )}
      {listYourSpaceOpen && (
        <div className="submodule">
        <span>Create New</span>
         <span>Manage Waresheet</span>
       
        </div>
      )}
    </div>

  

    <div className="sidebar-item">
      <FontAwesomeIcon icon={faClipboardList} /> Favourites
    </div>

    <div className="sidebar-item">
      <FontAwesomeIcon icon={faClipboardList} /> My Cart
    </div>

    <div className="sidebar-item">
      <FontAwesomeIcon icon={faClipboardList} /> My Bookings
    </div>

    <div className="sidebar-item" onClick={toggleMyUser}>
      {myUserOpen ? (
        <>
          <FontAwesomeIcon icon={faChevronDown} /> Documents
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faChevronRight} /> Documents
        </>
      )}
      {myUserOpen && (
        <div className="submodule">
         <span>Space Certificate</span>
        <span>Agreement Package</span>
         <span>Sow</span>
         <span>Sop</span>
         <span>Noc</span>
         <span>Others</span>
        </div>
      )}
    </div>

    <div className="sidebar-item" onClick={toggleRFQManagement}>
      {rfqManagementOpen ? (
        <>
          <FontAwesomeIcon icon={faChevronDown} /> RFQ 
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faChevronRight} /> RFQ 
        </>
      )}
      {rfqManagementOpen && (
        <div className="submodule">
        <span> Manage RFQ</span>
        </div>
      )}
    </div>

    <div className="sidebar-item">
      <FontAwesomeIcon icon={faClipboardList} /> Enquiry Management
    </div>

    <div className="sidebar-item">
      <FontAwesomeIcon icon={faClipboardList} /> Invoice Management
    </div>

    <div className="sidebar-item" onClick={Logout}>
    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
    </div>
  </div>
  );
};

export default CustomerSidebar;



