const mongoose = require('mongoose')


const decesoSchema = mongoose.Schema({

    registerCode:String,
    estancia:String,
    sector:String,
    registroDeceso:Date,
    responsable:String,
    desc:String,
    antecedentes:String,
    acciones:String,
    informe:String,
    causa:String,
    enfermedad:String,
    factores:String,
    name:String,
    species:String,
    sex:String,
    color:String,
    birthDate:Date,
    breed: String,
    ownerName:String,
    ownerCi:String,
    ownerCellphone:String,
    ownerAddress:String,
})

module.exports = mongoose.model('Deceso', decesoSchema)