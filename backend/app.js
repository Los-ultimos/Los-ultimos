//installed dotenv to use environment var
//installes morgan to log http req and res
//

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Animal = require('./models/animal')
const Owner = require('./models/owner')
const Ficha = require('./models/ficha')

const keygen = require('./keygen')


//Mongo

main().catch((err) => console.log(err))

async function main() {
    await mongoose.connect('mongodb://localhost:27017/cemzoocruz').then(() => {
        console.log('Database Connected')
    })
}



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes
app.get('/api/films', (req,res) =>{
//   Movie.find().then(documents=>{
//     res.status(200).json({
//       message:"films fetched succesfully",
//       films:documents
//     })
//   })
})

app.post('/api/animal', (req,res) =>{
    console.log(req.body)

    const animalOwner = new Owner({
        registerCode:keygen(4),
        name:req.body.owner.name,
        ci:req.body.owner.ci,
        cellphone:req.body.owner.cellphone,
        district:req.body.owner.district,
        region:req.body.owner.region,
        neighborhood: req.body.owner.neighborhood,
        address:req.body.owner.address,
        email:req.body.owner.email,
        registryDate:req.body.owner.registryDate,
        systemRegistry:new Date()
    })

     animalOwner.save()
    .then(owner=>{
        const id = owner._id.toString();
        const animal = new Animal({
            registerCode:keygen(5),
            name:req.body.name,
            species:req.body.species,
            sex:req.body.sex,
            color:req.body.color,
            birthDate:req.body.birthDate,
            breed: req.body.breed,
            picture: "https://i.pinimg.com/originals/85/4c/5f/854c5fbd87b28b89447c2493da05791e.jpg",
            age: req.body.age,
            sterilized: req.body.sterilized,
            vaccines: req.body.vaccines,
            registryDate: req.body.registryDate,
            systemRegistry: new Date(),
            owner:id
            
        })
    
        animal.save()
        .then(()=>{
            res.status(201).json({
                message:"Animal saved successfully"
            })
        }, err=>{
            res.json(err)
        })
        
    })





});

app.get('/api/animal', async (req,res)=>(
    await Animal.find().populate('owner').then(documents=>{
        res.status(200).json({
            message:"animals fetched succesfully",
            animal:documents

          })
    })
))


//Fichas

app.get('/api/fichas', async (req,res)=>{
    await Ficha.find().then(documents=>{
        res.status(200).json({
            message:"fichas fetched succesfully",
            fichas:documents

          })
    })
})

app.post('/api/fichas', async (req,res)=>{
    const ficha = new Ficha({
        registerCode:keygen(2),
        number:req.body.number,
        typeConsult:req.body.typeConsult,
        vet:req.body.vet,
        state:req.body.state,
        atention:req.body.atention,
        registryDate:req.body.registryDate,
        systemRegistry:new Date(),
        name:req.body.name,
        species:req.body.species,
        sex:req.body.sex,
        color:req.body.color,
        birthDate:req.body.birthDate,
        breed: req.body.breed,
        picture:req.body.picture,
        age:req.body.age,
        sterilized:req.body.sterilized,
        vaccines:req.body.vaccines,
        ownerName:req.body.ownerName,
        ownerCi:req.body.ownerCi,
        ownerCellphone:req.body.ownerCellphone,
        ownerDistrict:req.body.ownerDistrict,
        ownerRegion:req.body.ownerRegion,
        ownerNeighborhood: req.body.ownerNeighborhood,
        ownerAddress:req.body.ownerAddress,
        ownerEmail:req.body.ownerEmail
    })

    ficha.save()
        .then(()=>{
            res.status(201).json({
                message:"Ficha saved successfully"
            })
        }, err=>{
            res.json(err)
        })

})

app.delete('/api/films/:id', (req,res)=>{
//   const id = req.params.id
//   Movie.findByIdAndDelete(id).then(result=>{
//     res.status(200).json({message:"message Deleted"})
//   })
})

app.put('/api/films/:id', (req,res)=>{
//   Movie.findByIdAndUpdate(req.params.id,req.body).then(result=>{
//     res.status(200).json({message:"message Deleted"})
//   })
})




//Server

app.listen(3000, () => {
    console.log('Server is runnin on port 3000')
})
