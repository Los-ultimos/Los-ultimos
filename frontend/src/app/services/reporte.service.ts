import { Injectable } from '@angular/core';
import { Reporte } from '../models/reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  resultados:Reporte={fuente:"",criterio:"",fechaInicio:"",fechaFin:"",dato:""};

  constructor() { }

  sendData(reporte:Reporte){
    this.resultados=reporte;

  }

  getData(){
    console.log(this.resultados)
    return this.resultados;
  }
}
