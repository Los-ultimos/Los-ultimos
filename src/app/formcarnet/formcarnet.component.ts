import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-formcarnet',
  templateUrl: './formcarnet.component.html',
  styleUrls: ['./formcarnet.component.css']
})
export class FormcarnetComponent implements OnInit {

  formReactive:FormGroup;
  
  constructor(private formBuilder:FormBuilder) {

    this.formReactive=this.formBuilder.group({
      fechadeemisioncarnet:['',[Validators.required]],
      fechadeexpiracioncarnet:['',[Validators.required]],
      codigocarnet:['',[Validators.required]],
      fechaderegistrocarnet:['',[Validators.required]],
    });
     }

  

  ngOnInit(): void {


  }

  onShowAll(){
    console.log('DDDD',this.formReactive.value);
  }

}
