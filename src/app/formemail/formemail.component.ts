import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-formemail',
  templateUrl: './formemail.component.html',
  styleUrls: ['./formemail.component.css']
})
export class FormemailComponent implements OnInit {

  formReactive:FormGroup;
  
  constructor(private formBuilder:FormBuilder) {

    this.formReactive=this.formBuilder.group({

      correo:['',[Validators.required,Validators.email]],
      estadodeenvio:['',[Validators.required]],
      fechaderegistroemail:['',[Validators.required]]
    });
     }

  

  ngOnInit(): void {


  }

  onShowAll(){
    console.log('DDDD',this.formReactive.value);
  }

}
