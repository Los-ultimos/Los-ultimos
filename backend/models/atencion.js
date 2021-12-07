const mongoose = require('mongoose')


const atencionSchema = mongoose.Schema({

    symp:String,
    freqc:Number,
    temp:Number,
    capilar:Number,
    mucosas:String,
    hidra:String,
    resp:Number,
    pulse:Number,
    state:String,
    appetite:String,
    prono:String,
    treat:String,
    labs:String,
    fechaAtencion:Date,
    estadoat:String,
    vet:String,
    registro:Date,
    entrada: Date,
    salida:Date,
})

module.exports = mongoose.model('Atencion', atencionSchema)
