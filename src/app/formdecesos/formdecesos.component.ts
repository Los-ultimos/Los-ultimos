import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-formdecesos',
  templateUrl: './formdecesos.component.html',
  styleUrls: ['./formdecesos.component.css']
})
export class FormdecesosComponent implements OnInit {

  formReactive:FormGroup;
  
  constructor(private formBuilder:FormBuilder) {

    this.formReactive=this.formBuilder.group({

      lugardeestancia:['',[Validators.required]],
      sectordeceso:['',[Validators.required]],
      fecharegistrodeceso:['',[Validators.required]],
      responsablesector:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      antecedentes:['',[Validators.required]],
      accionesrealizadas:['',[Validators.required]],
      informedeinvestigacion:['',[Validators.required]],
      causa:['',[Validators.required]],
      descripcioncausaenfermedad:['',[Validators.required]],
      factores:['',[Validators.required]],
 
      nombreanimal:['',[Validators.required]],
      especie:['',[Validators.required]],
      sexo:['',[Validators.required]],
      raza:['',[Validators.required]],
      color:['',[Validators.required]],
      fechanacimientoanimal:['',[Validators.required]],

     
      nombredueno:['',[Validators.required]],
      ci:['',[Validators.required]],
      telefono:['',[Validators.required]],
      direccion:['',[Validators.required]],
    });
     }

  

  ngOnInit(): void {


  }

  onShowAll(){
    console.log('DDDD',this.formReactive.value);
  }

  imageSrc = "https://cnnespanol.cnn.com/wp-content/uploads/2021/10/211028182411-rba-shiba-inu-full-169-e1635461449925.jpg?quality=100&strip=info"

}
