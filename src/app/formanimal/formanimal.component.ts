import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData{
  veterinario:string;
  tratamiento:string;
}
@Component({
  selector: 'app-formanimal',
  templateUrl: './formanimal.component.html',
  styleUrls: ['./formanimal.component.css']
})
export class FormanimalComponent implements OnInit {
  

  startDate = new Date(1990, 0, 1);
  
  formReactive:FormGroup;
  
  constructor(private formBuilder:FormBuilder) {

    this.formReactive=this.formBuilder.group({
      veterinario:'',
      tratamiento:'',
      sintomas:'',
      frecuenciaCardiaca:'',
      frecuenciaRespiratoria:'',
      mucosas:'',
      pronostico: '',
      pulso:'',
      estadoGeneral:'',
      hidratacion:'',
      fechahoraatencion:'',
      fecharegistroatencion:'',
      fechaentradaatencion:'',
      fechasalidaatencion:'',
      estadoAtencion:'',
      temperatura:'',
      llenadocapilar:'',
      apetito:'',
      laboratorios:''
    });
     }

  

  ngOnInit(): void {


  }

  onShowAll(){
    console.log('DDDD',this.formReactive.value);
  }

}


