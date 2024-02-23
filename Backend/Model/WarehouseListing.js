const mongoose=require('mongoose')
const WarehouseSchema=new mongoose.Schema({
    username:String,
    warehousename:String,
    warehousecategory:String,
    warehousetype:String
})

module.exports=mongoose.model('WarehouseListing',WarehouseSchema)