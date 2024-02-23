const mongoose=require('mongoose')

const permissionSchema=new mongoose.Schema({
    uid:String,
    username:String,
    listwarehouse:Boolean,
    myuser:Boolean,
    rfq:Boolean
})

module.exports=mongoose.model('permissions',permissionSchema)