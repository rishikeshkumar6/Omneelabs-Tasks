const User = require('../Model/UserData');
const WarehouseList=require('../Model/WarehouseListing')
const Permission=require('../Model/Permission')
const AdminSettingPermission=require('../Model/AdminSettingPermission')
const JWT = require('jsonwebtoken');
const express=require('express')
const { promisify } = require('util');

const verifyAsync = promisify(JWT.verify);
const app=express()
const cors = require('cors');
app.use(cors());

const jwtKey = "Rishikeshkumar";

//signupValidation middleware
async function signupValidation(req, res, next) {
  console.log(req.body.email)
    try {
        // const response = await User.findOne({ email: req.body.email, isOtpVerified: true, userType: req.body.userType });
        const response = await User.findOne({email:req.body.email,userType:req.body.userType});
        console.log(response)
        if (response) {
            res.status(401).send("record already found");
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

//isOtpVerified login middleware
const isOtpVerified=async (req,res,next)=>{
  const result=await User.findOne({email:req.body.email,userType:req.body.userType})
 if(result){
  if(result.isOtpVeryfied){
    next()
  }
  else{
    res.status(401).send("Invalid Otp")
  }
 }
 else{
  res.status(401).send("record not found")
 }
  
}

//register callback logic

async function register(req, res) {
    try {
        const result = await User.insertMany(req.body);
        console.log("result");
        console.log(result);
        if (result) {
            res.send(result);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


//retrieve register user data
async function getUserData(req,res){
  try{
    const result=await User.find()
    if(result){
      res.status(200).send(result)
    }
  }
  catch(error){
    res.status(500).send("Internal Server Error")
  }
}

//update register user data
async function UpdateUserData(req,res){
    console.log(req.body)
    console.log("update user data")
    console.log(typeof req.params.id)
    try{
      const userId=req.params.id
      const updateData=req.body
      const response = await User.updateOne({ _id: userId }, { $set: updateData });
    
      if (response.matchedCount === 1) {
        console.log('User updated successfully');
        res.send({ message: 'User updated successfully' });
      } else {
        console.log('User not found or no changes made');
        res.status(404).send({ message: 'User not found or no changes made' });
      }
    }
    catch(error){
      res.status(500).send("Internal Server Error")
    }
}

//get resgister single data
 async function SingleData(req,res){
  console.log(req.params.id)
   try{
    console.log("data response fetched")
       const userId=req.params.id
       const response=await Permission.findById(userId)
       if(response){
        res.status(200).send(response)
       }
       else{
        res.status(401).send("User not found")
       }
   }
   catch(error){
    res.status(500).send("Internal Server Error")
   }
 }

//Warehouse Listing callback logic
async function WarehouseListing(req,res){
      try{
        const result=await WarehouseList.insertMany(req.body)
        if(result){
          res.status(200).send(result)
        }
      }
      catch(error){
        res.status(500).send("Internal Server Error")
      }
}

//warehouse listing middleware

// async function WarehouseListingCheck(req,res,next){
//     try{
//         const result=await WarehouseList.findOne(req.body.warehousename)
//         // if(result.length>0){
//         //    res.status(401).send("warehousename already exist")
//         // }
//         // else{
//         //   next()
//         // }
//        if(result){
//         res.status(200).send(result)

//        }
//     }
//     catch(error){
//       console.log(error)
//     }
// }

//retrieving warehouselisting data
async function getWarehouseListing(req,res){
  const token = req.headers.authorization.split(' ')[1];
  try{
      
      // if(result){
      //   res.status(200).send({result,token})
      // }
      JWT.verify(token, jwtKey, async (err, result) => {
        if (err) {
          console.log(err);
         
          return res.status(401).send('Invalid token');
        }      
        const response=await WarehouseList.find()
         if(response){
          res.status(200).send(response);
         }
      });
  }
  catch(error){
    res.status(500).send("Internal Server Error")
  }
}

//login callback logic
async function login(req, res) {
    
    try {
        const user = await User.findOne({ email: req.body.email,userType:req.body.userType });
         console.log(user)
        if (!user) {
          return res.status(401).send("record not found");
    
        }
           
          if (user.password === req.body.password) {
    
           const result=user
               JWT.sign({ result }, jwtKey, (err, token) => {
              if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
              }
              if(req.body.vendor===user.vendor){
              res.send({ result, auth: token });
              }
              else{
                res.status(401).send("record not found")
              }
            });
          } else {
            res.status(401).send("Incorrect password");
          }
        
        
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
}

const AdminLogin=async (req,res)=>{
     if(req.body.email==="admin@gmail.com" && req.body.password==="testing"){
      const result=await User.findOne(req.body)
      JWT.sign({ result }, jwtKey, (err, token) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
          res.status(200).send({ result, auth: token });
      })
   
     }
     else{
      res.status(401).send("Wrong email or password")
     }
}


//otpverification callback logic
async function otpVerification(req, res) {
    
      try{
        console.log("request body")
        console.log(req.body)
        console.log("request body")
      if(req.body.otp==='1234'){
        console.log("insert data")
        const response=await User.updateOne({ email: req.body.email,userType:req.body.userType }, { $set: { isOtpVeryfied:true } });
        console.log(response)
        if(response.matchedCount===1){
          res.status(200).send("otp is verified successfully")
        }
      
      }
      else{
        res.status(401).send("Invalid Otp")
      }
  }
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

//Home callback logic
    async function Home(req, res) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        // Verify the token
        JWT.verify(token, jwtKey, async (err, result) => {
          if (err) {
            console.log(err);
           
            return res.status(401).send('Invalid token');
          }      
          const user = result.result;
          res.status(200).send(user);
        });
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    }

 //getUser callback logic
    async function getUserById(req, res) {
      try {
        const userId = req.params.id;
        console.log('User ID:', userId); // Log the user ID to verify it's correct
       
    
        const token = req.headers.authorization.split(' ')[1];
        console.log("error is occur")
        
        JWT.verify(token, jwtKey, async (err, result) => {
         
            if (err) {
              console.log(err);
             
              return  res.status(401).send('Invalid token');
            }     
            console.log("error is occur") 
            const user = await User.findById(userId);
            if (!user) {
              console.log('User not found');
              return res.status(404).send("User not found");
            }
            console.log('User found:', user); // Log the user data
            res.send(user);
          
        });
       
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    }


    
    //update user callback
   
    // async function updateUser(req,res){
    //    try{
    //       const response=await User.updateOne(req.params, { $set: req.body })
    //       console.log(response)
    //       res.send(response)
    //    }
    //    catch(err){
    //     console.log(err)
    //    }
    // }

    const AdminSetting=async (req,res)=>{
       try{
        const response=await AdminSettingPermission.insertMany(req.body)
        if(response){
            res.status(200).send(response)
        }
       }
       catch(error){
        res.status(500).send("Internal Server Error")
       }
    }

    const UpdateAdminSetting=async (req,res)=>{
          try{
            const userId=req.params.id
            const body=req.body
              const response=await AdminSettingPermission.updateOne({_id:userId},{$set:body})
              if(response){
                console.log(response.matchedCount)
                res.status(200).send(response)
              }
              else{
                res.status(401).send("User not found")
              }
          }
          catch(error){
            res.status(500).send("Internal Server Error")
          }
    }

    const getAdminSetting=async (req,res)=>{
       try{
            const response=await AdminSettingPermission.find()
            if(response && response.length>0){
                res.status(200).send(response)
            }
       }
       catch(error){
        res.status(500).send("Internal Server Error")
       }
    }

   

    
   async function Permissions(req,res){
      try{
        const response=await Permission.insertMany(req.body)
        if(response){
          res.status(200).send(response)
        }
      }
      catch(error){
        res.status(500).send("Internal Server Error")
      }
   }


   async function GetPermission(req,res){
      try{
         const response=await Permission.find()
        
         if(response){
            res.status(200).send(response)
           
         }
      }
      catch(error){
        console.log(error)
            res.status(500).send("Internal Server Error")
      }
   }

   async function updatePermission(req, res) {
    console.log(req.body)
    console.log(req.params)
    try{
      const userId=req.params.id
      const updateData=req.body
      const response = await Permission.updateOne({ _id: userId }, { $set: updateData });
    
      if (response.matchedCount === 1) {
        console.log('User updated successfully');
        res.send({ message: 'User updated successfully' });
      } else {
        console.log('User not found or no changes made');
        res.status(404).send({ message: 'User not found or no changes made' });
      }
    }
    catch(error){
      res.status(500).send("Internal Server Error")
    }
  }

  const deletePermission=async (req,res)=>{
       try{
            const response=await Permission.deleteOne({_id:req.params.id})
            if(response.deletedCount===1){
              res.status(200).send(response)
            }
            else{
              res.status(401).send("User not found")
            }
       }
       catch(error){
          res.status(500).send("Internal Server Error")
       }
      }
     
  const permissionVerify=async (req,res,next)=>{
       try{
            const request=await Permission.findOne({username:req.body.username})
            if(request){
               res.status(401).send("User already found")
            }
            else{
                  next()
            }
       }
       catch(error){
        res.status(500).send("Internal Server Error")
       }
  }

  const updatePermissionVerify=async (req,res,next)=>{
       try{
            const userId=req.params.id
            const body=req.body
            const request=await Permission.findById({_id:userId})
            console.log(request)
            if(request){
              if(request.username===req.body.username){
               next()
              }
              else{
                res.status(401).send("Username not match")
              }
            }
            else{
              res.status(401).send("User record not found")
            }
       }
       catch(error){
        res.status(500).send("Internal Server Error")
       }
  }

    
module.exports = {
    signupValidation,
    register,
    login,
    AdminLogin,
    otpVerification,
    Home,
    isOtpVerified,
    getUserById,
    updatePermission,
    WarehouseListing,
    getWarehouseListing,
    getUserData,
    Permissions,
    GetPermission,
    UpdateUserData,
    SingleData,
    deletePermission,
    permissionVerify,
    updatePermissionVerify,
    AdminSetting,
    UpdateAdminSetting,
    getAdminSetting
};
