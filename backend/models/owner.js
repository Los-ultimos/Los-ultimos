const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema({
    
    registerCode:String,
    name:String,
    ci:String,
    cellphone:String,
    district:String,
    region:String,
    neighborhood: String,
    address:String,
    email:String,
    registryDate:Date,
    systemRegistry:Date
})

module.exports = mongoose.model('Owner', ownerSchema)