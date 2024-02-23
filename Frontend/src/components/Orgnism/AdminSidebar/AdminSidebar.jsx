import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate,Link } from 'react-router-dom';
import {
  faChevronRight,
  faChevronDown,
  faBuilding,
  faCog,
  faSignOutAlt,
  
} from '@fortawesome/free-solid-svg-icons';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const navigate=useNavigate()
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

  return (
    <div className="sidebar1">
      <div className="sidebar-item" style={{fontSize:'1.5rem',fontWeight:'bold'}}>Warehousity</div>
      <div className="sidebar-item">
        <FontAwesomeIcon icon={faBuilding} /> Dashboard
      </div>
      <div className="sidebar-item" onClick={toggleListYourSpace}>
        {listYourSpaceOpen ? (
          <>
            <FontAwesomeIcon icon={faChevronDown} /> Warehouse Management
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faChevronRight} /> Warehouse Management
          </>
        )}
        {listYourSpaceOpen && (
          <div className="submodule">
          <span>Pending</span>
          <span><Link to="/admin/warehouse-approved">Approved</Link></span>
          <span>Rejected</span>
          </div>
        )}
      </div>


      <div className="sidebar-item" onClick={toggleMyUser}>
        {myUserOpen ? (
          <>
            <FontAwesomeIcon icon={faChevronDown} /> Permission
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faChevronRight} /> Permission
          </>
        )}
        {myUserOpen && (
          <div className="submodule">
           <Link to="/admin/permission"><span>Permission</span></Link>
           <Link to="/admin/listuser"><span>List User</span></Link>
          <span>Material</span>
           {/* <span>Manage Departments</span>
           <span>Warehouse Mapping</span> */}
          </div>
        )}
      </div>

      {/* <div className="sidebar-item" onClick={toggleRFQManagement}>
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
          <span> Manage RFQ</span>
           <span> Open RFQ</span>
          </div>
        )}
      </div> */}

      {/* <div className="sidebar-item" onClick={toggleInvoiceManagement}>
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
      </div> */}

      {/* <div className="sidebar-item" onClick={toggleEnquiryAndChat}>
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
      </div> */}

      <div className="sidebar-item" >
        <Link to="/admin/adminsidebar" style={{display:'flex',alignItems:'center',gap:'0.5rem',color:'white'}}><FontAwesomeIcon icon={faSignOutAlt}></FontAwesomeIcon>Sidebar Permission</Link>
      </div>

       <div className="sidebar-item" style={{}}>
        <Link to="/admin/setting" style={{display:'flex',gap:'0.5rem',alignItems:'center',color:'white'}}><FontAwesomeIcon icon={faCog} />Setting</Link>
      </div> 

      {/*<div className="sidebar-item" onClick={Logout}>
      <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </div> */}
    </div>
  );
};

export default AdminSidebar;



