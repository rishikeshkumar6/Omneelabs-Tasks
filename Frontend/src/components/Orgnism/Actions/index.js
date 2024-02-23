import React from 'react'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// const Index =async (Id,data) => {
//     // const navigate=useNavigate()
//     console.log(Id,data)
//     try{
//     const request=await axios.put(`http://localhost:4500/updateuserdata/${Id}`,{
             
//     Permission:{
//         listwarehouse: data.listwarehouse,
//         myuser: data.myuser,
//         rfq: data.rfq
//     }
// })
// console.log(request)
// }
// catch(error){
// console.log(error)
// }
 
// }
async function update(username,Id,data){
    console.log("update function")
    console.log(username,Id,data)
    try{
        const request=await axios.put(`http://localhost:4500/updatepermission/${Id}`,{
                 
            username:username,
            listwarehouse: data.listwarehouse,
            myuser: data.myuser,
            rfq: data.rfq
        
    })
   const response=await request.data
   console.log(response.message)
   return response.message
    }
    catch(error){
        const ErrorResponse=error.response
        const response=ErrorResponse.data
        console.log(response)
        if(response==="Username not match"){
            return response
        }
    }

}
// export default Index
export const action={
    update
}
