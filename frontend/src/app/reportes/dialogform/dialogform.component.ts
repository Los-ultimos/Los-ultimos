import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TooltipComponent } from '@angular/material/tooltip';
import { Reporte } from 'src/app/models/reporte.model';
import { AnimalService } from 'src/app/services/animal.service';
import { ReporteService } from 'src/app/services/reporte.service';
interface reporteType{
  val:string;
}

interface reporteData{
  val:string;
}

@Component({
  selector: 'app-dialogform',
  templateUrl: './dialogform.component.html',
  styleUrls: ['./dialogform.component.css']
})
export class DialogformComponent implements OnInit {

  criterioReporte:reporteData[]=[];

  selectedFuente="";
  selectedCriterio="";
  fechaFin="";
  fechainicio="";
  dato="";
  tipoReporte:reporteType[]=[
    {val:"Animales"},
    {val:"Fichas médicas"},
    {val:"Atenciones clínicas"},
    {val:"Decesos"},
    {val:"Carnets"}
  ]

  animalReporte:reporteData[]=[
    {val:"Edades"},
    {val:"Sexo"},
    {val:"Especie"},
    {val:"Todos"},
  ]

  carnetReporte:reporteData[]=[
    {val:"Estado"},
    {val:"Emitidos"},
    {val:"Todos"}
  ]

  atencionReporte:reporteData[]=[
    {val:"Estado"},
    {val:"Estado general"},
    {val:"Mucosas"},
    {val:"Apetito"},
    {val:"Hidratación"},
    {val:"Todos"},
  ]

  fichaReporte:reporteData[]=[
    {val:"Estado"},
    {val:"Veterinario a cargo"},
    {val:"Atención en el albergue"},
    {val:"Tipo de consultas"},
    {val:"Todos"}
  ]

  decesoReporte:reporteData[]=[
    {val:"Sector"},
    {val:"Enfermedad"},
    {val:"Factores"},
    {val:"Todos"}
  ]


  constructor(private animalService:AnimalService, private reporteService:ReporteService) { }


  ngOnInit(): void {
  }

  selectFuente(tipo: string){
    this.selectedFuente=tipo;
    console.log(this.selectedCriterio)
    if (this.selectedFuente=="Animales"){
      this.criterioReporte=this.animalReporte;
    } else if (this.selectedFuente=="Carnets") {
      this.criterioReporte=this.carnetReporte;
    } else if (this.selectedFuente=="Atenciones clínicas") {
      this.criterioReporte=this.atencionReporte;
    } else if (this.selectedFuente=="Decesos") {
      this.criterioReporte=this.decesoReporte;
    } else if (this.selectedFuente=="Fichas médicas"){
      this.criterioReporte=this.fichaReporte;
    }

  }

  selectCriterio(tipo: string){
    this.selectedCriterio=tipo;
  }

  beginSearch(form:NgForm){
    let reporte:Reporte={criterio:this.selectedCriterio,fuente:this.selectedFuente,fechaInicio:this.fechainicio,fechaFin:this.fechaFin,dato:form.value.dato}


    this.reporteService.sendData(reporte);


  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    this.fechaFin=dateRangeEnd.value;
    this.fechainicio=dateRangeStart.value;
    console.log(dateRangeStart.value);
    console.log(dateRangeEnd.value);
  }

}
