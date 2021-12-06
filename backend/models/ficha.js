const mongoose = require('mongoose')

const fichaSchema = mongoose.Schema({
    registerCode:String,
    numFicha:Number,
    typeConsult:String,
    vet:String,
    state:String,
    atention:String,
    registryDate:Date,
    systemRegistry:Date,
    name:String,
    species:String,
    sex:String,
    color:String,
    birthDate:String,
    breed: String,
    picture:String,
    age:String,
    sterilized:Boolean,
    vaccines:String,
    ownerName:String,
    ownerCi:String,
    ownerCellphone:String,
    ownerDistrict:String,
    ownerRegion:String,
    ownerNeighborhood: String,
    ownerAddress:String,
    ownerEmail:String,
    
})

module.exports = mongoose.model('Ficha', fichaSchema)