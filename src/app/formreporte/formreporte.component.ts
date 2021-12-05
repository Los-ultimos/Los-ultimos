import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-formreporte',
  templateUrl: './formreporte.component.html',
  styleUrls: ['./formreporte.component.css']
})
export class FormreporteComponent implements OnInit {

  formReactive:FormGroup;
  
  constructor(private formBuilder:FormBuilder) {

    this.formReactive=this.formBuilder.group({

     fuente:['',[Validators.required,Validators.email]],
      criterio:['',[Validators.required]],
      desde:['',[Validators.required]],
      hasta:['',[Validators.required]]
    });
     }

  

  ngOnInit(): void {


  }

  onShowAll(){
    console.log('DDDD',this.formReactive.value);
  }

}
