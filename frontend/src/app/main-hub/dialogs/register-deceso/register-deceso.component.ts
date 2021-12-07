import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Animal } from 'src/app/models/animal.model';
import { Deceso } from 'src/app/models/deceso.model';
import { DecesosService } from 'src/app/services/decesos.service';
import { FichaService } from 'src/app/services/ficha.service';
interface Species {
  val: string;
}
interface Sex {
  val: string;
}
@Component({
  selector: 'app-register-deceso',
  templateUrl: './register-deceso.component.html',
  styleUrls: ['./register-deceso.component.css']
})
export class RegisterDecesoComponent implements OnInit {

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

  constructor(@Inject(MAT_DIALOG_DATA) public data:Animal, private decesoService:DecesosService) { }

  ngOnInit(): void {
  }

  async addDeceso(form:NgForm){
    let deceso:Deceso={
      estancia:form.value.estancia,
      sector:form.value.sector,
      registroDeceso:form.value.registroDeceso,
      responsable:form.value.responsable,
      desc:form.value.desc,
      antecedentes:form.value.antecedentes,
      acciones:form.value.acciones,
      informe:form.value.informe,
      causa:form.value.causa,
      enfermedad:form.value.enfermedad,
      factores:form.value.factores,
      name:form.value.nombreanimal,
      species:form.value.especie,
      sex:form.value.sexo,
      color:form.value.color,
      birthDate:form.value.nacimiento,
      breed:form.value.raza,
      ownerName:form.value.nombredueno,
      ownerCi:form.value.ci,
      ownerCellphone:form.value.cell,
      ownerAddress:form.value.direc,
    }


    console.log(deceso)
    await this.decesoService.saveDeceso(deceso)
    //await this.decesoService.getDeceso()

  }

}
