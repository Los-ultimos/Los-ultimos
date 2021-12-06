import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Animal } from 'src/app/models/animal.model';
import { AnimalService } from 'src/app/services/animal.service';
import { RegisterDecesoComponent } from '../../dialogs/register-deceso/register-deceso.component';
import { RegisterFichaComponent } from '../../dialogs/register-ficha/register-ficha.component';

@Component({
  selector: 'app-user-animales',
  templateUrl: './user-animales.component.html',
  styleUrls: ['./user-animales.component.css']
})
export class UserAnimalesComponent implements OnInit, OnDestroy{
  private animalSub!: Subscription

  animals:Animal[]=[];

  constructor(private animalService:AnimalService, public dialog: MatDialog) { }
  ngOnDestroy() {
    this.animalSub.unsubscribe()
  }

  ngOnInit(): void {
    this.animalService.getAnimals()
    this.animalSub = this.animalService.getAnimalListener()
    .subscribe((animals:Animal[])=>{
      this.animals=animals;
    })
  }

  openFichaDialog(animal:Animal) {
    let dialogRef = this.dialog.open(RegisterFichaComponent, {
      height: '90%',
      data: animal
    });

    // dialogRef.afterClosed().subscribe(res => {
    //   this.workService.updateData()
    // })
  }

  openDecesosDialog(animal:Animal) {
    let dialogRef = this.dialog.open(RegisterDecesoComponent, {
      height: '90%',
      data: animal
    });

    // dialogRef.afterClosed().subscribe(res => {
    //   this.workService.updateData()
    // })
  }

}
