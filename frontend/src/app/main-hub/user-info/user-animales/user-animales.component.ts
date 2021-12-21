import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Animal } from 'src/app/models/animal.model';
import { AnimalService } from 'src/app/services/animal.service';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterAnimalComponent } from '../../dialogs/register-animal/register-animal.component';
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

  mode:any

  constructor(private animalService:AnimalService, public dialog: MatDialog, public route: ActivatedRoute, private authService:AuthService) { }
  ngOnDestroy() {
    this.animalSub.unsubscribe()
  }

  ngOnInit(): void {
  //   this.route.paramMap.subscribe((paramMap: ParamMap) => {
  //     if (typeof paramMap.get("mode") ==='string') {
  //       this.mode = paramMap.get("mode");
  //     }
  // });
  this.mode=this.authService.getUser().access
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

  openDialog(animal:Animal) {
    let dialogRef = this.dialog.open(RegisterAnimalComponent, {
      height: '90%',
      data: animal
    });

  }

  deleteAnimal(animal:Animal){
    if(typeof animal.id ==='string'){
      this.animalService.deleteAnimal(animal.id)
    }
  }



}
