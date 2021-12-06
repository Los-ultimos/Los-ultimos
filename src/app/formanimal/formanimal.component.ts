import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
      veterinario:['',[Validators.required]],
      tratamiento:['',[Validators.required]],
      sintomas:['',[Validators.required]],
      frecuenciaCardiaca:['',[Validators.required]],
      frecuenciaRespiratoria:['',[Validators.required]],
      mucosas:['',[Validators.required]],
      pronostico: ['',[Validators.required]],
      pulso:['',[Validators.required]],
      estadoGeneral:['',[Validators.required]],
      hidratacion:['',[Validators.required]],
      fechahoraatencion:['',[Validators.required]],
      fecharegistroatencion:['',[Validators.required]],
      fechaentradaatencion:['',[Validators.required]],
      fechasalidaatencion:['',[Validators.required]],
      estadoAtencion:['',[Validators.required]],
      temperatura:['',[Validators.required]],
      llenadocapilar:['',[Validators.required]],
      apetito:['',[Validators.required]],
      laboratorios:['',[Validators.required]]
    });
     }

  

  ngOnInit(): void {


  }

  onShowAll(){
    console.log('DDDD',this.formReactive.value);
  }

}


