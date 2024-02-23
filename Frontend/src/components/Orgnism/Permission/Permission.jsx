import React,{useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import permissionStyles from './Permission.module.css'
import AdminSidebar from '../AdminSidebar/AdminSidebar'
import {action} from  '../Actions'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { getUserData } from '../../../Redux/userDataSlice'

const Permission = () => {
    const params=useParams()
    const userList=useSelector((state)=>state.userData)
    const dispatch=useDispatch()
    const [Name,setName]=useState("")
    const [Message,setMessage]=useState("")
    const [ErrorMeassage,setErrorMessage]=useState("")
    const navigate=useNavigate()
    const [Input,setInput]=useState({
        username:null
    })
    const [Input1, setInput1] = useState({
        uid: null,
        username: ""
    });
    
    const handleChange1 = (event) => {
        console.log("add user")
        console.log(event.target.value)
        const [uid, username] = event.target.value.split(":");
        setInput1({ uid, username });
    };
    
    const [checkboxInput,setCheckboxInput]=useState({
        listwarehouse:false,
        myuser:false,
        rfq:false
    })
   
    const getPermission=async ()=>{
       try{
        const request=await axios.get(`http://localhost:4500/permissionsingledata/${params.id}`)
        console.log(request)
        const data=request.data
        console.log(data)
        setCheckboxInput({
            listwarehouse:data.listwarehouse,
            myuser:data.myuser,
            rfq:data.rfq
        })
    
        setName(data.username)
        setInput({username:data.username})
       }
       catch(error){
        console.log(error)
       }
       
    }
  
   useEffect(()=>{
       dispatch(getUserData())
    },[dispatch])

    useEffect(()=>{
      if(params.id!==undefined){
        getPermission()
      }
    },[])



    const handleChange = (event) => {
        console.log("Hey i am handle function")
        console.log(event.target.value)
        setInput({ username: event.target.value });
        setErrorMessage("");
    };

   

    const handleCheckbox = (event) => {
        setCheckboxInput({
            ...checkboxInput,
            [event.target.name]: event.target.checked,
        });
        setErrorMessage("");
    };

   
    const updatePermission=async ()=>{
        console.log("hey i'm update funtion")
        console.log(Input.username)
        console.log(checkboxInput)
        console.log("condition")
        console.log(Input.username && (checkboxInput.listwarehouse || checkboxInput.myuser || checkboxInput.rfq))
        console.log("condition")
        if (Input.username && (checkboxInput.listwarehouse || checkboxInput.myuser || checkboxInput.rfq)) {
           
            const request=await action.update(Input.username,params.id,checkboxInput)
            console.log("promise request")
            console.log(request)
                 console.log("response")
           console.log(request)
           if(request==="Username not match"){
            setErrorMessage("Username not match please try again")
           }
           else if(request==="User updated successfully"){
            setMessage(request)
           }
           }
          
          else{
            setErrorMessage("Please fill all input fields");
            return;
        }
       
   
        
      }

      const handlePermission= async ()=>{
        
          try{
            if (( Input1.username) && (checkboxInput.listwarehouse || checkboxInput.myuser || checkboxInput.rfq)) {
                const request=await axios.post("http://localhost:4500/permission",{...Input1,...checkboxInput})
                if(request){
                    navigate('/admin/listuser')
                }
               
            }
            else{
                setErrorMessage("Please fill all input fields");
                return;
            }
               
          }
          catch(error){
            // console.log(error)
            const ErrorResponse=error.response
            const response=ErrorResponse.data
            console.log(response)
            if(response==="User already found"){
                setErrorMessage("User record already exist")
            }
          }
      }
      if(params.id!==undefined){
        return (
            <div className={permissionStyles.superparent}>
                <div className={permissionStyles.parent}>
                <AdminSidebar/>
            <div className={permissionStyles.parent1}>
                {Message && <div className={permissionStyles.Popup}>
                    {Message}
                    <span><button onClick={()=>navigate('/admin/listuser')}>go to list</button></span>
                    </div>}
                <h2>Permission</h2>
                   <select
                className="form-select"
               aria-label="Default select example"
               onChange={(e) => {
               handleChange(e);
               setName(e.target.value);
              
                }}
            value={Name}
            >
           <option value="">Select UserName</option>
          {userList.length>0 ?
            userList.map((elem, index) => {
             return (
               <option key={elem._id} value={elem.name} name="username">
               {elem.name}
             </option>
               );
             })
             :
             <option></option>
            }
          </select>

    
               <span style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '50%', fontSize: '1.3rem', fontWeight: 'bold', marginLeft: '0.5rem' }}>
            <span style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>List Your Warehouse <input type="checkbox" checked={checkboxInput.listwarehouse} name="listwarehouse" onChange={handleCheckbox} /></span>
            <span style={{ display: 'flex', gap: '0.5rem' }}>My User<input type="checkbox" checked={checkboxInput.myuser} name="myuser" onChange={handleCheckbox} /></span>
            <span style={{ display: 'flex', gap: '0.5rem' }}>RFQ<input type="checkbox" checked={checkboxInput.rfq} name='rfq' onChange={handleCheckbox} /></span>
        </span>
                <button class="btn btn-primary" onClick={updatePermission}>Update</button>
                {ErrorMeassage && <span style={{fontWeight:'bold',color:'red',marginTop:'1rem'}}>{ErrorMeassage}</span>}
            </div>
           
            </div>
             {console.log(Name)}
           
            </div>
          )
      }
      else{
        return (
            <div className={permissionStyles.superparent}>
                <div className={permissionStyles.parent}>
                <AdminSidebar/>
            <div className={permissionStyles.parent1}>
                {Message && <div className={permissionStyles.Popup}>
                    {Message}
                    <span><button onClick={()=>navigate('/admin/listuser')}>go to list</button></span>
                    </div>}
                <h2>Permission</h2>
                <select class="form-select" aria-label="Default select example" onChange={handleChange1}>
                    <option value="">Select UserName</option>
                   {userList ? userList.map((elem,index)=>{
                    return (
                      
                    // <option key={elem._id} value={{uid:elem._id,username:elem.username}} name="username">{elem.name}</option>
                    <option key={elem._id} value={`${elem._id}:${elem.name}`} name="username">{elem.name}</option>

                        
                    )
                   })
                   :
                   <option></option>}
                    </select>
    
            <span style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '50%', fontSize: '1.3rem', fontWeight: 'bold', marginLeft: '0.5rem' }}>
            <span style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>List Your Warehouse <input type="checkbox" checked={checkboxInput.listwarehouse} name="listwarehouse" onChange={handleCheckbox} /></span>
            <span style={{ display: 'flex', gap: '0.5rem' }}>My User<input type="checkbox" checked={checkboxInput.myuser} name="myuser" onChange={handleCheckbox} /></span>
            <span style={{ display: 'flex', gap: '0.5rem' }}>RFQ<input type="checkbox" checked={checkboxInput.rfq} name='rfq' onChange={handleCheckbox} /></span>
        </span>
                <button class="btn btn-primary" onClick={handlePermission}>Add User</button>
                {ErrorMeassage && <span style={{fontWeight:'bold',color:'red',marginTop:'1rem'}}>{ErrorMeassage}</span>}
            </div>
           
            </div>
            {console.log("redux useSelector component")}
            {console.log(userList)}
            {console.log("input")}
            {console.log(Input)}
           {console.log("input1")}
           {console.log(Input1)}
          
            </div>
          )
      }
}

export default Permission
