import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { reduce, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {Chart} from 'chart.js';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Animal } from 'src/app/models/animal.model';
import { AnimalService } from 'src/app/services/animal.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { DialogformComponent } from './dialogform/dialogform.component';
import { ReporteService } from '../services/reporte.service';
import { DecesosService } from '../services/decesos.service';
import { FichaService } from '../services/ficha.service';
import { AtencionService } from '../services/atencion.service';
import { Atencion } from '../models/atencion.model';
import { Deceso } from '../models/deceso.model';
import { Ficha } from '../models/ficha.model';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Reporte } from '../models/reporte.model';
import { keys } from 'ts-transformer-keys';

export interface entidadTable {
  entity: string;
  counted: number;
}



@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  private proof:Boolean=true;
  private animalSub!: Subscription
  private decesosSub!: Subscription
  private atencionesSub!: Subscription
  private fichasSub!: Subscription


  animColumn=[
    { columnDef: 'name', header: 'Nombre',  cell: (element: any) => `${element.name}` },
    { columnDef: 'sex',  header: 'Sexo',   cell: (element: any) => `${element.sex}` },
    { columnDef: 'species', header: 'Especie',  cell: (element: any) => `${element.species}` },
    { columnDef: 'color',  header: 'Color',   cell: (element: any) => `${element.color}` },
    { columnDef: 'age', header: 'Edad',  cell: (element: any) => `${element.age}` },
    { columnDef: 'breed', header: 'Raza',  cell: (element: any) => `${element.name}` },
    { columnDef: 'registryDate',  header: 'Fecha de registro',   cell: (element: any) => `${element.registryDate.getDate()+"/"+element.registryDate.getMonth()+"/"+element.registryDate.getFullYear()}` }
  ];

  ateColumn=[
    { columnDef: 'estadoat', header: 'Estado',  cell: (element: any) => `${element.estadoat}` },
    { columnDef: 'state',  header: 'Estado general',   cell: (element: any) => `${element.state}` },
    { columnDef: 'mucosas', header: 'Mucosas',  cell: (element: any) => `${element.mucosas}` },
    { columnDef: 'hidra',  header: 'Hidratación',   cell: (element: any) => `${element.hidra}` },
    { columnDef: 'appetite', header: 'Apetito',  cell: (element: any) => `${element.appetite}` },
    {columnDef: 'registro',  header: 'Fecha de registro',   cell: (element: any) => `${this.dateRet(element.registro).getDate()+"/"+this.dateRet(element.registro).getMonth()+"/"+this.dateRet(element.registro).getFullYear()}` }
  ];

  decColumn=[
    { columnDef: 'name', header: 'Nombre del animal',  cell: (element: any) => `${element.name}` },
    { columnDef: 'ownerName', header: 'Nombre del propietario',  cell: (element: any) => `${element.ownerName}` },
    { columnDef: 'sector', header: 'Sector',  cell: (element: any) => `${element.sector}` },
    { columnDef: 'enfermedad',  header: 'Estado general',   cell: (element: any) => `${element.enfermedad}` },
    { columnDef: 'factores', header: 'Mucosas',  cell: (element: any) => `${element.factores}` },
    { columnDef: 'registroDeceso',  header: 'Fecha de registro',   cell: (element: any) => `${this.dateRet(element.registroDeceso).getDate()+"/"+this.dateRet(element.registroDeceso).getMonth()+"/"+this.dateRet(element.registroDeceso).getFullYear()}` }
  ];

  fichaColumn=[
    { columnDef: 'name', header: 'Nombre',  cell: (element: any) => `${element.name}` },
    { columnDef: 'sex',  header: 'Sexo',   cell: (element: any) => `${element.sex}` },
    { columnDef: 'species', header: 'Especie',  cell: (element: any) => `${element.species}` },
    { columnDef: 'state',  header: 'Estado general',   cell: (element: any) => `${element.state}` },
    { columnDef: 'vet', header: 'Veterinario a cargo',  cell: (element: any) => `${element.vet}` },
    { columnDef: 'atention',  header: 'Atencion en el albergue',   cell: (element: any) => `${element.atention}` },
    { columnDef: 'typeConsult', header: 'Tipo de consulta',  cell: (element: any) => `${element.typeConsult}` },
    { columnDef: 'registryDate',  header: 'Fecha de registro',   cell: (element: any) => `${this.dateRet(element.registryDate).getDate()+"/"+this.dateRet(element.registryDate).getMonth()+"/"+this.dateRet(element.registryDate).getFullYear()}` }
  ]



  selectColumn=[
    { columnDef: 'name', header: 'Nombre',  cell: (element: any) => `${element.name}` },
    { columnDef: 'sex',  header: 'Sexo',   cell: (element: any) => `${element.sex}` },
    { columnDef: 'species', header: 'Especie',  cell: (element: any) => `${element.species}` },
    { columnDef: 'color',  header: 'Color',   cell: (element: any) => `${element.color}` },
    { columnDef: 'age', header: 'Edad',  cell: (element: any) => `${element.age}` },
    { columnDef: 'breed', header: 'Raza',  cell: (element: any) => `${element.name}` },
    { columnDef: 'registryDate',  header: 'Fecha de registro',   cell: (element: any) => `${element.registryDate.getDate()+"/"+element.registryDate.getMonth()+"/"+element.registryDate.getFullYear()}` }
  ]


  isShown:boolean=false;
  isShownDecesos:boolean=false;
  isShownAtencion: boolean=false;
  isShownFichas:boolean=false;

  animal:boolean=false;
  ficha:boolean=false;
  atencion:boolean=false;
  deceso:boolean=false;
  carnet:boolean=false;

  dataSource: any = [];
  dataSource2:entidadTable[]=[];
  dataService: any;

  rows: object[] = [];

  columns: string[] = [];

  displayedColumns:string[]=['entity','counted'];


  animals:Animal[]=[];
  filter:any[]=[];
  filter2:any[]=[];
  fichas:Ficha[]=[];
  atenciones:Atencion[]=[];
  decesos:Deceso[]=[];

  selected!:Reporte;


  results:any[]=[];
  resultDB:any[]=[];


  datoCat=0;
  datoPerro=0;
  datoEquino=0;
  datoGeneroMCat=0;
  datoGeneroFCat=0;
  datoGeneroMCan=0;
  datoGeneroFCan=0;
  datoGeneroMEquino=0;
  datoGeneroFEquino=0;

  datoPostCat=0;
  datoAtCat=0;
  datoEspCat=0;
  datoPostCan=0;
  datoAtCan=0;
  datoEspCan=0;
  datoPostEquino=0;
  datoAtEquino=0;
  datoEspEquino=0;

  datoAtBueno=0;
  datoAtMalo=0;
  datoAtRegular=0;
  datoAtSobrepeso=0;

  datoAtMuR=0;
  datoAtMuP=0;
  datoAtMuC=0;
  datoAtMuI=0;
  datoAtMuCl=0;

  datoAtHn=0;
  datoAtHDm=0;
  datoAtHDl=0;
  datoAtHDg=0;

  datoAtApN=0;
  datoAtApD=0;
  datoAtApA=0;
  datoAtApC=0;


  datoAtEspera=0;
  datoAtAt=0;
  datoAtPost=0;


  datoEdad010=0;
  datoEdad1020=0;
  datoEdad20m=0;

  datoFiTipCPer=0;
  datoFiTipRCPer=0;
  datoFiTipCGat=0;
  datoFiTipRCGat=0;
  datoFiTipCEq=0;
  datoFiTipRCEq=0;

  datoFiAtPM=0;
  datoFiAtAH=0;
  datoFiAtFM=0;
  datoFiAtPH=0;
  datoFiAtAM=0;
  datoFiAtFH=0;


  datoMuerteEnero=0;
  datoMuerteFebrero=0;
  datoMuerteMarzo=0;
  datoMuerteAbril=0;
  datoMuerteMayo=0;
  datoMuerteJunio=0;
  datoMuerteJulio=0;
  datoMuerteAgosto=0;
  datoMuerteSeptiembre=0;
  datoMuerteOctubre=0;
  datoMuerteNoviembre=0;
  datoMuerteDiciembre=0;


  edades=0;


  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ this.datoMuerteEnero,
          this.datoMuerteFebrero,
          this.datoMuerteMarzo,
          this.datoMuerteAbril,
          this.datoMuerteMayo,
          this.datoMuerteJunio,
          this.datoMuerteJulio,
          this.datoMuerteAgosto,
          this.datoMuerteSeptiembre,
          this.datoMuerteOctubre,
          this.datoMuerteNoviembre,
          this.datoMuerteDiciembre ],
        label: 'Frecuencia de muertes',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio' ,'Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },
    plugins: {
      legend: { display: true }

    }
  };

  public lineChartType: ChartType = 'line';




  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
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



  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ '0 a 9 años', '10 a 19 años', '20 años para adelante' ],
    datasets: [ {
      data: [ this.datoEdad010, this.datoEdad1020, this.datoEdad20m ]
    } ]
  };


  public pieChartData2: ChartData<'pie', number[], string | string[]> = {
    labels: [ 'Bueno', 'Malo', 'Regular','Sobrepeso' ],
    datasets: [ {
      data: [ this.datoAtBueno, this.datoAtMalo, this.datoAtRegular,this.datoAtSobrepeso ]
    } ]
  };

  public pieChartData3: ChartData<'pie', number[], string | string[]> = {
    labels: [ 'Consulta perros','Re consulta perros','Consulta gatos','Re consulta gatos','Consulta equinos','Re consulta equinos'],
    datasets: [ {
      data: [ this.datoFiTipCPer, this.datoFiTipRCPer,this.datoFiTipCGat, this.datoFiTipRCGat,this.datoFiTipCEq, this.datoFiTipRCEq ]
    } ]
  };

  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DataLabelsPlugin ];





  public barChartData: ChartData<'bar'> = {
    labels: [ 'Macho','Hembra' ],
    datasets: [
      { data: [ this.datoGeneroMCat, this.datoGeneroFCat], label: 'Cantidad de felinos' },
      { data: [ this.datoGeneroMCan, this.datoGeneroFCan], label: 'Cantidad de canes' },
      { data: [ this.datoGeneroMEquino, this.datoGeneroFEquino], label: 'Cantidad de equinos' }
    ]
  }


  public barChartData2: ChartData<'bar'> = {
    labels: [ 'Realizada','Postergada', 'En espera' ],
    datasets: [
      { data: [ this.datoAtAt, this.datoAtPost,this.datoAtEspera], label: 'Cantidad de atenciones médicas' },
    ]
  }

  public barChartData3: ChartData<'bar'> = {
    labels: [ 'Normal','Disminuido', 'Anoréxico', 'Caquexico' ],
    datasets: [
      { data: [ this.datoAtApN, this.datoAtApD,this.datoAtApA,this.datoAtApC], label: 'Cantidad de atenciones médicas' },
    ]
  }

  public doughnutChartLabels: string[] = [ 'Mucosa rosada', 'Mucosa pálida', 'Mucosa Congestionada', 'Mucosa ictérica', 'Mucosas Cianótica' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ this.datoAtMuR,this.datoAtMuP,this.datoAtMuC,this.datoAtMuI,this.datoAtMuCl ] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartLabels2: string[] = [ 'Normal', 'Deshidratación moderada', 'Deshidratación leve', 'Deshidratación grave' ];
  public doughnutChartData2: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels2,
    datasets: [
      { data: [ this.datoAtHn,this.datoAtHDm,this.datoAtHDl,this.datoAtHDg] }
    ]
  };


  public radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };
  public radarChartLabels: string[] = [ 'Primera vez','A veces','Con frecuencia' ];

  public radarChartData: ChartData<'radar'> = {
    labels: this.radarChartLabels,
    datasets: [
      { data: [ this.datoFiAtPM, this.datoFiAtAM, this.datoFiAtFM ], label: 'Machos' },
      { data: [ this.datoFiAtPH, this.datoFiAtAH, this.datoFiAtFH ], label: 'Hembras' }
    ]
  };
  public radarChartType: ChartType = 'radar';

  @ViewChildren(BaseChartDirective)
  charts!: QueryList<BaseChartDirective>;






  constructor(private animalService:AnimalService,private decesosService:DecesosService,private fichaService:FichaService,private atencionService:AtencionService,  public dialog: MatDialog, public route: ActivatedRoute, private elementRef:ElementRef,private reportteService:ReporteService) { }
  ngOnDestroy() {
    this.animalSub.unsubscribe()
    this.atencionesSub.unsubscribe()
    this.decesosSub.unsubscribe()
    this.fichasSub.unsubscribe()
  }


  ngOnInit(): void {

  }

  submitRequest(){

  }



  openDialog(){
    console.log(this.selected)
    let dialogRef=this.dialog.open(DialogformComponent, {
      height: '70%',
      width: '40%'
    });
    dialogRef.afterClosed().subscribe(res =>{
      this.getDepartments()
    })
  }

  getDepartments() {





    this.selected=this.reportteService.getData();
    console.log(this.selected)
    var dateObjectStart:Date;
    var dateObjectEnd:Date;
    if (this.selected.fechaInicio!="" && this.selected.fechaFin!=""){
      dateObjectStart= new Date(this.selected.fechaInicio);
      dateObjectEnd = new Date(this.selected.fechaFin);
      console.log("Filled")
    }


    if (this.selected.fuente=="Animales"){
      this.isShown=true;
      this.isShownDecesos=false;
      this.isShownAtencion=false;
      this.isShownFichas=false;
      this.animalService.getAnimals()

      this.animalSub = this.animalService.getAnimalListener()
      .subscribe((animals:Animal[])=>{

       // Oct 23



        this.datoGeneroMCat=animals.filter(animal=>animal.sex.toLowerCase()=="macho" && animal.species.toLowerCase()=="felino").length;
        this.datoGeneroFCat=animals.filter(animal=>animal.sex.toLowerCase()=="hembra" && animal.species.toLowerCase()=="felino").length;
        this.datoGeneroFCan=animals.filter(animal=>animal.sex.toLowerCase()=="hembra" && animal.species.toLowerCase()=="can").length;
        this.datoGeneroMCan=animals.filter(animal=>animal.sex.toLowerCase()=="macho" && animal.species.toLowerCase()=="can").length;
        this.datoGeneroFEquino=animals.filter(animal=>animal.sex.toLowerCase()=="hembra" && animal.species.toLowerCase()=="equino").length;
        this.datoGeneroMEquino=animals.filter(animal=>animal.sex.toLowerCase()=="macho" && animal.species.toLowerCase()=="equino").length;
        this.datoEdad010=animals.filter(animal=>parseInt(animal.age)>=0 && parseInt(animal.age)<=9).length;
        this.datoEdad1020=animals.filter(animal=>parseInt(animal.age)>=10 && parseInt(animal.age)<=19).length;
        this.datoEdad20m=animals.filter(animal=>parseInt(animal.age)>=20).length;
        this.datoCat=animals.filter(animal=>animal.species.toLowerCase()=="felino").length;
        this.datoPerro=animals.filter(animal=>animal.species.toLowerCase()=="can").length;
        this.datoEquino=animals.filter(animal=>animal.species.toLowerCase()=="equino").length;

        this.barChartData.datasets[0].data=[
          this.datoGeneroMCat,this.datoGeneroFCat
        ];

        this.barChartData.datasets[1].data=[
          this.datoGeneroMCan,this.datoGeneroFCan
        ];

        this.barChartData.datasets[2].data=[
          this.datoGeneroMEquino,this.datoGeneroFEquino
        ];

        this.pieChartData.datasets[0].data=[
          this.datoEdad010,this.datoEdad1020,this.datoEdad20m
        ];

        this.dataSource2=[
          {entity: "Canes, equinos y felinos",counted:animals.length},
          {entity: "Felinos",counted:this.datoCat},
          {entity: "Canes",counted:this.datoPerro},
          {entity: "Equinos",counted:this.datoEquino},
          {entity: "Felinos Macho",counted:this.datoGeneroMCat},
          {entity: "Canes Macho",counted:this.datoGeneroMCan},
          {entity: "Equinos Macho",counted:this.datoGeneroMEquino},
          {entity: "Felinos Hembra",counted:this.datoGeneroFCat},
          {entity: "Canes Hembra",counted:this.datoGeneroFCan},
          {entity: "Equinos Hembra",counted:this.datoGeneroFEquino}
        ]

        this.charts.forEach((c) => {
          c.ngOnChanges({});
        });

        var extractedad=animals.map(animal=>parseInt(animal.age))
        var sumedad=extractedad.reduce((a,b)=>a +b,0)
        var avedad=sumedad/extractedad.length;
        console.log(avedad)
        if (this.selected.dato!=""){
          if (this.selected.criterio=="Edades"){
            this.animals=animals.filter(animal=>parseInt(animal.age)==parseInt(this.selected.dato))
          } else if (this.selected.criterio=="Sexo"){
            this.animals=animals.filter(animal=>animal.sex.toLowerCase() === this.selected.dato.toLowerCase())
          } else if (this.selected.criterio=="Especie"){
            this.animals=animals.filter(animal=>animal.species.toLowerCase() === this.selected.dato.toLowerCase())
          } else if (this.selected.criterio=="Todos"){
            this.animals=animals;
          }
        } else {
          this.animals=animals;
        }


        if (this.selected.fechaInicio!="" && this.selected.fechaFin!=""){

          this.animals=this.animals.filter(animal=>animal.registryDate>=dateObjectStart && animal.registryDate<=dateObjectEnd)
        }
        this.selectColumn=this.animColumn;
        this.columns= this.animColumn.map(c=>c.columnDef)
        this.dataSource=this.animals;



      })

    } else if (this.selected.fuente=="Atenciones clínicas"){
      this.isShown=false;
      this.isShownDecesos=false;
      this.isShownAtencion=true;
      this.isShownFichas=false;
      this.atencionService.getAtencion()
      this.atencionesSub = this.atencionService.getAtencionListener()
      .subscribe((atenciones:Atencion[])=>{

        this.datoAtAt=atenciones.filter(atencion=>atencion.estadoat.toLowerCase()==="atendido").length;
        this.datoAtPost=atenciones.filter(atencion=>atencion.estadoat.toLowerCase()==="postergado").length;
        this.datoAtEspera=atenciones.filter(atencion=>atencion.estadoat.toLowerCase()==="en espera de resultado").length;

        this.datoAtBueno=atenciones.filter(atencion=>atencion.state.toLowerCase()==="bueno").length;
        this.datoAtMalo=atenciones.filter(atencion=>atencion.state.toLowerCase()==="malo").length;
        this.datoAtRegular=atenciones.filter(atencion=>atencion.state.toLowerCase()==="regular").length;
        this.datoAtSobrepeso=atenciones.filter(atencion=>atencion.state.toLowerCase()==="sobrepeso").length;

        this.datoAtMuR=atenciones.filter(atencion=>atencion.mucosas.toLowerCase()==="rosada").length;
        this.datoAtMuP=atenciones.filter(atencion=>atencion.mucosas.toLowerCase()==="pálida").length;
        this.datoAtMuC=atenciones.filter(atencion=>atencion.mucosas.toLowerCase()==="congestionada").length;
        this.datoAtMuI=atenciones.filter(atencion=>atencion.mucosas.toLowerCase()==="ictérica").length;
        this.datoAtMuCl=atenciones.filter(atencion=>atencion.mucosas.toLowerCase()==="cianótica").length;

        this.datoAtApN=atenciones.filter(atencion=>atencion.appetite.toLowerCase()==="normal").length;
        this.datoAtApD=atenciones.filter(atencion=>atencion.appetite.toLowerCase()==="disminuido").length;
        this.datoAtApA=atenciones.filter(atencion=>atencion.appetite.toLowerCase()==="anorexico").length;
        this.datoAtApC=atenciones.filter(atencion=>atencion.appetite.toLowerCase()==="caquexico").length;

        this.datoAtHn=atenciones.filter(atencion=>atencion.hidra.toLowerCase()==="normal").length;
        this.datoAtHDm=atenciones.filter(atencion=>atencion.hidra.toLowerCase()==="deshidratación moderada").length;
        this.datoAtHDl=atenciones.filter(atencion=>atencion.hidra.toLowerCase()==="deshidratación leve").length;
        this.datoAtHDg=atenciones.filter(atencion=>atencion.hidra.toLowerCase()==="deshidratación grave").length;


        this.dataSource2=[
          {entity: "Atenciones médicas registradas",counted:atenciones.length},
          {entity: "Atenciones médicas postergadas",counted:this.datoAtPost},
          {entity: "Atenciones médicas atendidas",counted:this.datoAtAt},
          {entity: "Atenciones médicas en espera",counted:this.datoAtEspera},
          {entity: "Registros en sobrepeso",counted:this.datoAtSobrepeso},
          {entity: "Registros en Deshidratación grave",counted:this.datoAtHDg},
          {entity: "Registros en apetito normal",counted:this.datoAtApN},
          {entity: "Registros en peso bueno",counted:this.datoAtBueno},
          {entity: "Registros en hidratación normal",counted:this.datoAtHn},
          {entity: "Registros en anorexia",counted:this.datoAtApA},
          {entity: "Registros en mucosa congestionada",counted:this.datoAtMuC}
        ]

        this.barChartData2.datasets[0].data=[
          this.datoAtAt,this.datoAtPost,this.datoAtEspera
        ];

        this.pieChartData2.datasets[0].data=[
          this.datoAtBueno,this.datoAtMalo,this.datoAtRegular,this.datoAtSobrepeso
        ];

        this.doughnutChartData.datasets[0].data=[
          this.datoAtMuR,this.datoAtMuP,this.datoAtMuC,this.datoAtMuI,this.datoAtMuCl
        ];

        this.doughnutChartData2.datasets[0].data=[
          this.datoAtHn,this.datoAtHDm,this.datoAtHDl,this.datoAtHDg
        ];

        this.barChartData3.datasets[0].data=[
          this.datoAtApN, this.datoAtApD,this.datoAtApA,this.datoAtApC
        ];

        this.charts.forEach((c) => {
          c.ngOnChanges({});
        });

        if (this.selected.dato!=""){
          if (this.selected.criterio=="Estado"){
            this.atenciones=atenciones.filter(atencion=>atencion.estadoat.toLowerCase()===this.selected.dato.toLowerCase())
          } else if (this.selected.criterio=="Estado general"){
            this.atenciones=atenciones.filter(atencion=>atencion.state.toLowerCase()===this.selected.dato.toLowerCase())
          } else if (this.selected.criterio=="Mucosas"){
            this.atenciones=atenciones.filter(atencion=>atencion.mucosas.toLowerCase() === this.selected.dato.toLowerCase())
          } else if (this.selected.criterio=="Apetito"){
            this.atenciones=atenciones.filter(atencion=>atencion.appetite.toLowerCase() == this.selected.dato.toLowerCase())
          } else if (this.selected.criterio=="Hidratación"){
            this.atenciones=atenciones.filter(atencion=>atencion.hidra.toLowerCase() === this.selected.dato.toLowerCase())
          }else if( this.selected.criterio=="Todos"){
            this.atenciones=atenciones;
          }
        } else {
          this.atenciones=atenciones;
        }

        if (this.selected.fechaInicio!="" && this.selected.fechaFin!=""){
          this.atenciones=this.atenciones.filter(atencion=> this.dateRet(atencion.registro)>=dateObjectStart && this.dateRet(atencion.registro)<=dateObjectEnd)
        }


        this.selectColumn=this.ateColumn;
        this.columns= this.ateColumn.map(c=>c.columnDef)
        this.dataSource=this.atenciones;

      })
    } else if (this.selected.fuente=="Decesos"){
      this.isShown=false;
      this.isShownDecesos=true;
      this.isShownAtencion=false;
      this.isShownFichas=false;
      this.decesosService.getDecesos()
      this.decesosSub = this.decesosService.getDecesoListener()
      .subscribe((decesos:Deceso[])=>{
        this.datoCat=decesos.filter(animal=>animal.species.toLowerCase()=="felino").length;
        this.datoPerro=decesos.filter(animal=>animal.species.toLowerCase()=="can").length;
        this.datoEquino=decesos.filter(animal=>animal.species.toLowerCase()=="equino").length;
        this.datoGeneroMCat=decesos.filter(animal=>animal.sex.toLowerCase()=="macho" && animal.species.toLowerCase()=="felino").length;
        this.datoGeneroFCat=decesos.filter(animal=>animal.sex.toLowerCase()=="hembra" && animal.species.toLowerCase()=="felino").length;
        this.datoGeneroFCan=decesos.filter(animal=>animal.sex.toLowerCase()=="hembra" && animal.species.toLowerCase()=="can").length;
        this.datoGeneroMCan=decesos.filter(animal=>animal.sex.toLowerCase()=="macho" && animal.species.toLowerCase()=="can").length;
        this.datoGeneroFEquino=decesos.filter(animal=>animal.sex.toLowerCase()=="hembra" && animal.species.toLowerCase()=="equino").length;
        this.datoGeneroMEquino=decesos.filter(animal=>animal.sex.toLowerCase()=="macho" && animal.species.toLowerCase()=="equino").length;

        this.datoMuerteEnero=decesos.filter(deceso=>this.dateRet(deceso.registroDeceso).getMonth()===0).length;
        this.datoMuerteFebrero=decesos.filter(deceso=>this.dateRet(deceso.registroDeceso).getMonth()===1).length;
          this.datoMuerteMarzo=decesos.filter(deceso=>this.dateRet(deceso.registroDeceso).getMonth()===2).length;
          this.datoMuerteAbril=decesos.filter(deceso=>this.dateRet(deceso.registroDeceso).getMonth()===3).length;
          this.datoMuerteMayo=decesos.filter(deceso=>this.dateRet(deceso.registroDeceso).getMonth()===4).length;
          this.datoMuerteJunio=decesos.filter(deceso=>this.dateRet(deceso.registroDeceso).getMonth()===5).length;
          this.datoMuerteJulio=decesos.filter(deceso=>this.dateRet(deceso.registroDeceso).getMonth()===6).length;
          this.datoMuerteAgosto=decesos.filter(deceso=>this.dateRet(deceso.registroDeceso).getMonth()===7).length;
          this.datoMuerteSeptiembre=decesos.filter(deceso=>this.dateRet(deceso.registroDeceso).getMonth()===8).length;
          this.datoMuerteOctubre=decesos.filter(deceso=>this.dateRet(deceso.registroDeceso).getMonth()===9).length;
          this.datoMuerteNoviembre=decesos.filter(deceso=>this.dateRet(deceso.registroDeceso).getMonth()===10).length;
          this.datoMuerteDiciembre=decesos.filter(deceso=>this.dateRet(deceso.registroDeceso).getMonth()===11).length;


        this.lineChartData.datasets[0].data= [
          this.datoMuerteEnero,
          this.datoMuerteFebrero,
          this.datoMuerteMarzo,
          this.datoMuerteAbril,
          this.datoMuerteMayo,
          this.datoMuerteJunio,
          this.datoMuerteJulio,
          this.datoMuerteAgosto,
          this.datoMuerteSeptiembre,
          this.datoMuerteOctubre,
          this.datoMuerteNoviembre,
          this.datoMuerteDiciembre ]

          this.barChartData.datasets[0].data=[
            this.datoGeneroMCat,this.datoGeneroFCat
          ];

          this.barChartData.datasets[1].data=[
            this.datoGeneroMCan,this.datoGeneroFCan
          ];

          this.barChartData.datasets[2].data=[
            this.datoGeneroMEquino,this.datoGeneroFEquino
          ];

          this.dataSource2=[
            {entity: "Decesos totales",counted:decesos.length},
            {entity: "Decesos de Felinos",counted:this.datoCat},
            {entity: "Decesos de Canes",counted:this.datoPerro},
            {entity: "Decesos de Equinos",counted:this.datoEquino},
            {entity: "Decesos de Felinos Macho",counted:this.datoGeneroMCat},
            {entity: "Decesos de Canes Macho",counted:this.datoGeneroMCan},
            {entity: "Decesos de Equinos Macho",counted:this.datoGeneroMEquino},
            {entity: "Decesos de Felinos Hembra",counted:this.datoGeneroFCat},
            {entity: "Decesos de Canes Hembra",counted:this.datoGeneroFCan},
            {entity: "Decesos de Equinos Hembra",counted:this.datoGeneroFEquino}
          ]


          this.charts.forEach((c) => {
            c.ngOnChanges({});
        });

        if (this.selected.dato!=""){
          if (this.selected.criterio=="Sector"){
            this.decesos=decesos.filter(deceso=>deceso.sector.toLowerCase()===this.selected.dato.toLowerCase())
          } else if (this.selected.criterio=="Enfermedad"){
            var pattern1=this.selected.dato.toLowerCase()
            this.decesos=decesos.filter(deceso=>deceso.enfermedad.toLowerCase().includes(pattern1))
          } else if (this.selected.criterio=="Factores"){
            var pattern2=this.selected.dato.toLowerCase()
            this.decesos=decesos.filter(deceso=>deceso.factores.toLowerCase().includes(pattern2))
          } else if( this.selected.criterio=="Todos"){
            this.decesos=decesos;
          }
        } else {
          this.decesos=decesos;
        }

        if (this.selected.fechaInicio!="" && this.selected.fechaFin!=""){
          this.decesos=this.decesos.filter(deceso=>this.dateRet(deceso.registroDeceso)>=dateObjectStart && this.dateRet(deceso.registroDeceso)<=dateObjectEnd)
        }
        this.selectColumn=this.decColumn;
        this.columns= this.decColumn.map(c=>c.columnDef)
        this.dataSource=this.decesos;

      })
    }  else if (this.selected.fuente=="Fichas médicas"){
      this.isShown=false;
      this.isShownDecesos=false;
      this.isShownAtencion=false;
      this.isShownFichas=true;
        this.fichaService.getFichas()
        this.fichasSub = this.fichaService.getFichasListener()
        .subscribe((ficha:Ficha[])=>{

          this.datoFiAtPM=ficha.filter(animal=>animal.sex.toLowerCase()=="macho" && animal.atention.toLowerCase()=="1ra vez").length;
          this.datoFiAtPH=ficha.filter(animal=>animal.sex.toLowerCase()=="hembra" && animal.atention.toLowerCase()=="1ra vez").length;
          this.datoFiAtAM=ficha.filter(animal=>animal.sex.toLowerCase()=="macho" && animal.atention.toLowerCase()=="a veces").length;
          this.datoFiAtAH=ficha.filter(animal=>animal.sex.toLowerCase()=="hembra" && animal.atention.toLowerCase()=="a veces").length;
          this.datoFiAtFM=ficha.filter(animal=>animal.sex.toLowerCase()=="macho" && animal.atention.toLowerCase()=="con frecuencia").length;
          this.datoFiAtFH=ficha.filter(animal=>animal.sex.toLowerCase()=="hembra" && animal.atention.toLowerCase()=="con frecuencia").length;


          this.datoFiTipCPer=ficha.filter(animal=>animal.typeConsult.toLowerCase()=="consulta" && animal.species.toLowerCase()=="can").length;
          this.datoFiTipRCPer=ficha.filter(animal=>animal.typeConsult.toLowerCase()=="re consulta" && animal.species.toLowerCase()=="can").length;
          this.datoFiTipCGat=ficha.filter(animal=>animal.typeConsult.toLowerCase()=="consulta" && animal.species.toLowerCase()=="felino").length;
          this.datoFiTipRCGat=ficha.filter(animal=>animal.typeConsult.toLowerCase()=="re consulta" && animal.species.toLowerCase()=="felino").length;
          this.datoFiTipCEq=ficha.filter(animal=>animal.typeConsult.toLowerCase()=="consulta" && animal.species.toLowerCase()=="equino").length;
          this.datoFiTipRCEq=ficha.filter(animal=>animal.typeConsult.toLowerCase()=="re consulta" && animal.species.toLowerCase()=="equino").length;

          this.datoGeneroFCat=ficha.filter(animal=>animal.sex.toLowerCase()=="hembra" && animal.species.toLowerCase()=="felino").length;
          this.datoGeneroMCat=ficha.filter(animal=>animal.sex.toLowerCase()=="macho" && animal.species.toLowerCase()=="felino").length;
          this.datoGeneroFCan=ficha.filter(animal=>animal.sex.toLowerCase()=="hembra" && animal.species.toLowerCase()=="can").length;
          this.datoGeneroMCan=ficha.filter(animal=>animal.sex.toLowerCase()=="macho" && animal.species.toLowerCase()=="can").length;
          this.datoGeneroFEquino=ficha.filter(animal=>animal.sex.toLowerCase()=="hembra" && animal.species.toLowerCase()=="equino").length;
          this.datoGeneroMEquino=ficha.filter(animal=>animal.sex.toLowerCase()=="macho" && animal.species.toLowerCase()=="equino").length;

          this.barChartData.datasets[0].data=[
            this.datoGeneroMCat,this.datoGeneroFCat
          ];

          this.barChartData.datasets[1].data=[
            this.datoGeneroMCan,this.datoGeneroFCan
          ];

          this.barChartData.datasets[2].data=[
            this.datoGeneroMEquino,this.datoGeneroFEquino
          ];

          this.pieChartData3.datasets[0].data=[
            this.datoFiTipCPer, this.datoFiTipRCPer,this.datoFiTipCGat, this.datoFiTipRCGat,this.datoFiTipCEq, this.datoFiTipRCEq
          ];

          this.radarChartData.datasets[0].data=[
             this.datoFiAtPM, this.datoFiAtAM, this.datoFiAtFM
          ]
          this.radarChartData.datasets[1].data=[
            this.datoFiAtPH, this.datoFiAtAH, this.datoFiAtFH
         ]


         this.dataSource2=[
          {entity: "Fichas Médicas registradas",counted:ficha.length},
          {entity: "Fichas Médicas atendidas",counted:ficha.filter(ficha=>ficha.state.toLowerCase()!="en espera").length},
          {entity: "Fichas Médicas en espera",counted:ficha.filter(ficha=>ficha.state.toLowerCase()=="en espera").length},
          {entity:"Fichas Médicas con atención frecuente en albergue",counted:this.datoFiAtFH+this.datoFiAtFM},
          {entity:"Fichas Médicas con atención casual en albergue",counted:this.datoFiAtAH+this.datoFiAtAM},
          {entity:"Fichas Médicas con primera atención en albergue",counted:this.datoFiAtPH+this.datoFiAtPM}

        ]

          this.charts.forEach((c) => {
            c.ngOnChanges({});
          });


          if (this.selected.dato!=""){
            if (this.selected.criterio=="Estado"){
              this.fichas=ficha.filter(ficha=>ficha.state.toLowerCase()===this.selected.dato.toLowerCase())
            } else if (this.selected.criterio=="Veterinario a cargo"){
              this.fichas=ficha.filter(ficha=>ficha.vet.toLowerCase()===this.selected.dato.toLowerCase())
            } else if (this.selected.criterio=="Atención en el albergue"){
              this.fichas=ficha.filter(ficha=>ficha.atention.toLowerCase()==this.selected.dato.toLowerCase())
            }else if (this.selected.criterio=="Tipo de consultas"){
              this.fichas=ficha.filter(ficha=>ficha.typeConsult.toLowerCase()==this.selected.dato.toLowerCase())
            } else if( this.selected.criterio=="Todos"){
              this.fichas=ficha;
            }
          } else {
            this.fichas=ficha;
          }

          if (this.selected.fechaInicio!="" && this.selected.fechaFin!=""){

            this.fichas=this.fichas.filter(ficha=>this.dateRet(ficha.registryDate)>=dateObjectStart && this.dateRet(ficha.registryDate)<=dateObjectEnd)
          }

        this.selectColumn=this.fichaColumn;
        this.columns= this.fichaColumn.map(c=>c.columnDef)
        this.dataSource=this.fichas;
        })
    }





    // else if (this.selected[0]=="Carnets"){

    //lo mismo pero con los servicios del carnet


    //   this.fichaService.getFichas
    //   this.fichasSub = this.fichaService.getFichasListener()

    //   .subscribe((ficha:Ficha[])=>{
    //     this.results=ficha;
    //     this.fichas=ficha;
    //   })
    //   this.atencion=false;
    //   this.animal=false;
    //   this.ficha=true;
    //   this.deceso=false;

    // } else {
    //   this.atencion=false;
    //   this.animal=false;
    //   this.ficha=false;
    //   this.deceso=false;
    // }


  }



  dateRet(date:Date){
    var d = new Date(date);
    console.log(d + " " + d.getMonth());
    return d;
  }



}
