import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {Chart} from 'chart.js';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Animal } from 'src/app/models/animal.model';
import { AnimalService } from 'src/app/services/animal.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { DialogformComponent } from './dialogform/dialogform.component';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  
  private animalSub!: Subscription
  optionsReport=[
    {id:1, text:"Animales"},
    {id:2, text:"Fichas médicas"},
    {id:3, text:"Atenciones clínicas"},
    {id:4, text:"Decesos"},
    {id:5, text:"Carnets"}
  ]



  selection:Number=1;

  animals:Animal[]=[];
  count: any[] = [];

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];
  public barChartData: ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;


  constructor(private animalService:AnimalService, public dialog: MatDialog, public route: ActivatedRoute, private elementRef:ElementRef) { }
  ngOnDestroy() {
    this.animalSub.unsubscribe()
  }

  ngOnInit(): void {
    this.getDepartments()
  }

  submitRequest(){
   
  }

  openDialog(){
    this.dialog.open(DialogformComponent, {
      height: '70%',
      width: '40%'
    });
  }
  
  getDepartments() {
    this.animalService.getAnimals()
    this.animalSub = this.animalService.getAnimalListener()
    .subscribe((animals:Animal[])=>{
      this.animals=animals;
      let count=animals.map(animals=>animals.age)
      let species=animals.map(animals=>animals.species)
      console.log(count)
      let htmlRef = this.elementRef.nativeElement.querySelector('canvas');

      
    })
  }

  

  
}
