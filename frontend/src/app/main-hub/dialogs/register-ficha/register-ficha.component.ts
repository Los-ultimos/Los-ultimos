import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Animal } from 'src/app/models/animal.model';
import { Ficha } from 'src/app/models/ficha.model';
import { FichaService } from 'src/app/services/ficha.service';
interface Species {
  val: string;
}
interface Sex {
  val: string;
}
@Component({
  selector: 'app-register-ficha',
  templateUrl: './register-ficha.component.html',
  styleUrls: ['./register-ficha.component.css']
})
export class RegisterFichaComponent implements OnInit {
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

  constructor(@Inject(MAT_DIALOG_DATA) public data:Animal, private fichaService:FichaService) { }

  ngOnInit(): void {
  }




  async addFicha(form:NgForm){
    let ficha:Ficha= {
      number:0,
      typeConsult:form.value.tipoconsulta,
      vet:form.value.veterinario,
      state:"EN ESPERA",
      atention:form.value.atencionalbergue,
      registryDate:form.value.registroFicha,
      name:form.value.nombreanimal,
      species:form.value.especie,
      sex:form.value.sexo,
      color:form.value.color,
      birthDate:form.value.nacimiento,
      breed:form.value.raza,
      picture:form.value.foto,
      age: form.value.age,
      sterilized:form.value.esterilizado,
      vaccines:form.value.vacc,
        ownerName:form.value.nombredueno,
        ownerCi:form.value.ci,
        ownerCellphone:form.value.cell,
        ownerDistrict:form.value.dist,
        ownerRegion:form.value.zona,
        ownerNeighborhood:form.value.barrio,
        ownerAddress:form.value.direc,
        ownerEmail:form.value.email
    }

    console.log(ficha)
    await this.fichaService.saveFicha(ficha)
    await this.fichaService.getFichas()

  }



}

