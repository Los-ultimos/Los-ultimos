import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Animal } from 'src/app/models/animal.model';
import { AnimalService } from 'src/app/services/animal.service';


interface Species {
  val: string;
}
interface Sex {
  val: string;
}

@Component({
  selector: 'app-register-animal',
  templateUrl: './register-animal.component.html',
  styleUrls: ['./register-animal.component.css']


})
export class RegisterAnimalComponent implements OnInit {

  species:Species[] = [
    {val: 'Can'},
    {val: 'Felino'},
    {val: 'Equino'},
    {val: 'Otro'}
  ];

  sex:Sex[] = [
    {val: 'Macho'},
    {val: 'Hembra'}
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data:Animal, private animalService:AnimalService) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  getAge(dateString: string) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}



  addAnimal(form:NgForm){



    let animal:Animal= {
      name:form.value.nombreanimal,
      species:form.value.especie,
      sex:form.value.sexo,
      color:form.value.color,
      birthDate:form.value.nacimiento,
      breed:form.value.raza,
      picture:form.value.foto,
      age: this.getAge(form.value.nacimiento).toString(),
      sterilized:form.value.esterilizado,
      vaccines:form.value.vacc,
      registryDate:form.value.registroanimal,
      owner:{
        name:form.value.nombredueno,
        ci:form.value.ci,
        cellphone:form.value.cell,
        district:form.value.dist,
        region:form.value.zona,
        neighborhood:form.value.barrio,
        address:form.value.direc,
        email:form.value.email,
        registryDate:form.value.registrodueno,

      }
    }
    console.log(animal)
    if(this.data===null){
      this.animalService.saveAnimal(animal)
    }else{
      if(typeof this.data.id === 'string'){
        this.animalService.updateAnimal(animal, this.data.id)

      }

    }

  }
}
