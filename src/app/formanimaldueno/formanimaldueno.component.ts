import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-formanimaldueno',
  templateUrl: './formanimaldueno.component.html',
  styleUrls: ['./formanimaldueno.component.css']
})
export class FormanimalduenoComponent implements OnInit {

  formReactive:FormGroup;
  
  constructor(private formBuilder:FormBuilder) {

    this.formReactive=this.formBuilder.group({
      nombreanimal:['',[Validators.required]],
      especie:['',[Validators.required]],
      sexo:['',[Validators.required]],
      raza:['',[Validators.required]],
      color:['',[Validators.required]],
      fechanacimientoanimal:['',[Validators.required]],
      vacunas:['',[Validators.required]],
      edad:['',[Validators.required]],
      esterilizado:['',[Validators.required]],
      fecharegistroanimal:['',[Validators.required]],
      nombredueno:['',[Validators.required]],
      ci:['',[Validators.required]],
      telefono:['',[Validators.required]],
      distrito:['',[Validators.required]],
      barrio:['',[Validators.required]],
      zona:['',[Validators.required]],
      fechaderegistrodueno:['',[Validators.required]],
      direccion:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]]
    });
     }

  

  ngOnInit(): void {


  }

  onShowAll(){
    console.log('DDDD',this.formReactive.value);
  }


}
