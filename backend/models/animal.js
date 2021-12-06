const mongoose = require('mongoose')


const animalSchema = mongoose.Schema({

    registerCode:String,
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
    registryDate:String,
    systemRegistry:Date,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner'
    }
})

module.exports = mongoose.model('Animal', animalSchema)


