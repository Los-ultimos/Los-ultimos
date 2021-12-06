import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Animal } from 'src/app/models/animal.model';
import { FichaService } from 'src/app/services/ficha.service';
interface Species {
  val: string;
}
interface Sex {
  val: string;
}
@Component({
  selector: 'app-register-deceso',
  templateUrl: './register-deceso.component.html',
  styleUrls: ['./register-deceso.component.css']
})
export class RegisterDecesoComponent implements OnInit {

  species:Species[] = [
    {val: 'Can'},
    {val: 'Felino'},
    {val: 'Equino'},
    {val: 'Otro'}
  ];

  sex:Sex[] = [
    {val: 'Macho'},
    {val: 'Hembra'}
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data:Animal, private fichaService:FichaService) { }

  ngOnInit(): void {
  }

}
