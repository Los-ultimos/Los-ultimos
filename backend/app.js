//installed dotenv to use environment var
//installes morgan to log http req and res
//

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Animal = require('./models/animal')
const Owner = require('./models/owner')
const Ficha = require('./models/ficha')
const Deceso = require('./models/deceso')
const Atencion = require('./models/atencion')

const keygen = require('./keygen')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("./models/user");


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
//Atencion

app.post('/api/atencion', (req,res)=>{
    const atencion = new Atencion({
        symp:req.body.symp,
        freqc:req.body.freqc,
        temp:req.body.temp,
        capilar:req.body.capilar,
        mucosas:req.body.mucosas,
        hidra:req.body.hidra,
        resp:req.body.resp,
        pulse:req.body.pulse,
        state:req.body.state,
        appetite:req.body.appetite,
        prono:req.body.prono,
        treat:req.body.treat,
        labs:req.body.labs,
        fechaAtencion:req.body.fechaAtencion,
        estadoat:req.body.estadoat,
        vet:req.body.vet,
        registro:req.body.registro,
        entrada: req.body.entrada,
        salida:req.body.salida,
    })

    atencion.save()
        .then(()=>{
            res.status(201).json({
                message:"Atencion saved successfully"
            })
        }, err=>{
            res.json(err)
        })
        
    
})

app.get('/api/atencion', async (req,res)=>(
    await Atencion.find().then(documents=>{
        res.status(200).json(documents)
    })
))

//Animals


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

app.delete("/api/animal/:id", (req, res, next) => {
    Animal.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json({ message: "Animal deleted!" });
    });
  });


  

  app.put("/api/animal/:id", (req, res, next) => {

    const animalOwner = {
        name:req.body.owner.name,
        ci:req.body.owner.ci,
        cellphone:req.body.owner.cellphone,
        district:req.body.owner.district,
        region:req.body.owner.region,
        neighborhood: req.body.owner.neighborhood,
        address:req.body.owner.address,
        email:req.body.owner.email,
        registryDate:req.body.owner.registryDate,
    }

    const animal = {
        name:req.body.name,
        species:req.body.species,
        sex:req.body.sex,
        color:req.body.color,
        birthDate:req.body.birthDate,
        breed: req.body.breed,
        age: req.body.age,
        sterilized: req.body.sterilized,
        vaccines: req.body.vaccines,
        registryDate: req.body.registryDate,
        
        
    }
    

    Animal.findOneAndUpdate({ _id: req.params.id }, animal, {
        new: true
      }).then(result => {
        Owner.findOneAndUpdate({ ci: animalOwner.ci }, animalOwner, {
            new: true
          }).then(resp=>{
            res.status(200).json({ message: "Update successful!" });

          })
    });
  });




//Fichas



app.get('/api/fichas', async (req,res)=>{
    await Ficha.find().then(documents=>{
        res.status(200).json({
            message:"fichas fetched succesfully",
            fichas:documents

          })
    })
})

app.put("/api/fichas/:id", (req, res, next) => {
    const ficha = {
        number:req.body.number,
        typeConsult:req.body.typeConsult,
        vet:req.body.vet,
        state:req.body.state,
        atention:req.body.atention,
        registryDate:req.body.registryDate,
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
    };
    Ficha.updateOne({ _id: req.params.id }, ficha).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  });

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

//Decesos

app.get('/api/deceso', async (req,res)=>{
    await Deceso.find().then(documents=>{
        res.status(200).json({
            message:"decesos fetched succesfully",
            decesos:documents

          })
    })
})

app.post('/api/deceso', async (req,res)=>{
    const deceso = new Deceso({
        registerCode:keygen(5),
        estancia:req.body.estancia,
        sector:req.body.sector,
        registroDeceso:req.body.registroDeceso,
        responsable:req.body.responsable,
        desc:req.body.desc,
        antecedentes:req.body.antecedentes,
        acciones:req.body.acciones,
        informe:req.body.informe,
        causa:req.body.causa,
        enfermedad:req.body.enfermedad,
        factores:req.body.factores,
        name:req.body.name,
        species:req.body.species,
        sex:req.body.sex,
        color:req.body.color,
        birthDate:req.body.birthDate,
        breed: req.body.breed,
        ownerName:req.body.ownerName,
        ownerCi:req.body.ownerCi,
        ownerCellphone:req.body.ownerCellphone,
        ownerAddress:req.body.ownerAddress,
    })

    deceso.save()
        .then(()=>{
            res.status(201).json({
                message:"Deceso saved successfully"
            })
        }, err=>{
            res.json(err)
        })

})

app.post("/api/user/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
      const user = new User({
        name:req.body.name,
        email: req.body.email,
        password: hash,
        access:req.body.access
      });
      user
        .save()
        .then(result => {
          res.status(201).json({
            message: "User created!",
            result: result
          });
        })
        .catch(err => {
            console.log(err)

          res.status(500).json({
            error: err
          });
        });
    });
  });
  
  app.post("/api/user/login", (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
        if (!result) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser._id },
          "secret_this_should_be_longer",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          fetchedUser:fetchedUser,
          token: token,
          expiresIn: 3600
        });
      })
      .catch(err => {
        return res.status(401).json({
          message: "Auth failed"
        });
      });
  });


  app.get('/api/user', async (req,res)=>{
    await User.find().then(documents=>{
        res.status(200).json({
            message:"users fetched succesfully",
            users:documents
          })
    })
    
})

app.delete("/api/user/:email", (req, res, next) => {
    User.deleteOne({ email: req.params.email }).then(result => {
      console.log(result);
      res.status(200).json({ message: "User deleted!" });
    });
  });

  app.put("/api/user/", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const us = {
            name:req.body.name,
            password:hash,
            access:req.body.access,
            email:req.body.email
        };
        console.log(us)
        User.updateOne({ email: us.email }, us).then(result => {
          res.status(200).json({ message: "Update successful!" });
        });
        
      });
    
  });





//Server

app.listen(3000, () => {
    console.log('Server is runnin on port 3000')
})
