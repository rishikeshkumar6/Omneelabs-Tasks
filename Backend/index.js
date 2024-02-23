const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./Controllers/userControllers');
const app = express();
app.use(express.json());
app.use(express.static('uploads'));
app.use(cors());
require('./Db/config')


app.post('/register', userController.signupValidation, userController.register);
app.post('/login',userController.isOtpVerified, userController.login);
app.post('/adminlogin',userController.AdminLogin)
app.post('/otpverification', userController.otpVerification);
app.post('/warehouselisting',userController.WarehouseListing)
app.post('/permission',userController.permissionVerify,userController.Permissions)
app.post('/adminsetting',userController.AdminSetting)
app.get('/getpermission',userController.GetPermission)
app.get('/getwarehouselisting',userController.getWarehouseListing)
app.get('/userdata',userController.getUserData)
app.get('/user/:id',userController.getUserById)
// app.get('/usersingledata/:id',userController.SingleData)
app.get('/permissionsingledata/:id',userController.SingleData)
app.put('/updateuserdata/:id',userController.UpdateUserData)
app.put('/updatepermission/:id',userController.updatePermissionVerify,userController.updatePermission)
app.put('/updateadminsetting/:id',userController.UpdateAdminSetting)
app.delete('/deletepermission/:id',userController.deletePermission)
app.get('/getadminsetting',userController.getAdminSetting)
app.get('/home',userController.Home)

app.listen(4500, () => {
    console.log('Server is running on port 4500');
});




