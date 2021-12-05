import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-formfichasmedicas',
  templateUrl: './formfichasmedicas.component.html',
  styleUrls: ['./formfichasmedicas.component.css']
})
export class FormfichasmedicasComponent implements OnInit {

  formReactive:FormGroup;
  
  constructor(private formBuilder:FormBuilder) {

    this.formReactive=this.formBuilder.group({

      
      
      numeroficha:['',[Validators.required]],
      tipoconsulta:['',[Validators.required]],
      veterinario:['',[Validators.required]],
      atencionalbergue:['',[Validators.required]],
      fecharegistroficha:['',[Validators.required]],
      nombreanimal:['',[Validators.required]],
      especie:['',[Validators.required]],
      sexo:['',[Validators.required]],
      raza:['',[Validators.required]],
      color:['',[Validators.required]],
      fechanacimientoanimal:['',[Validators.required]],
      vacunas:['',[Validators.required]],
      edad:['',[Validators.required]],
      esterilizado:['',[Validators.required]],
      

      nombredueno:['',[Validators.required]],
      ci:['',[Validators.required]],
      telefono:['',[Validators.required]],
      distrito:['',[Validators.required]],
      barrio:['',[Validators.required]],
      zona:['',[Validators.required]],
      direccion:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]]
    });
     }

  

  ngOnInit(): void {


  }

  onShowAll(){
    console.log('DDDD',this.formReactive.value);
  }


  imageSrc = "https://cnnespanol.cnn.com/wp-content/uploads/2021/10/211028182411-rba-shiba-inu-full-169-e1635461449925.jpg?quality=100&strip=info"


}
