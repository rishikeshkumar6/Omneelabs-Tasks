const mongoose=require('mongoose')

const sidebarSchema=new mongoose.Schema({
    sidebar:Boolean
})

module.exports=mongoose.model('SidebarPermission',sidebarSchema)