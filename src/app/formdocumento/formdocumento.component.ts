import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-formdocumento',
  templateUrl: './formdocumento.component.html',
  styleUrls: ['./formdocumento.component.css']
})
export class FormdocumentoComponent implements OnInit {

  formReactive:FormGroup;
  
  constructor(private formBuilder:FormBuilder) {

    this.formReactive=this.formBuilder.group({

      tipodocumento:['',[Validators.required]],
      titulodocumento:['',[Validators.required]]
    });
     }

  

  ngOnInit(): void {


  }

  onShowAll(){
    console.log('DDDD',this.formReactive.value);
  }


}
