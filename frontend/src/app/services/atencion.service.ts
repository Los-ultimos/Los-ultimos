import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Atencion } from '../models/atencion.model';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {
  private atencion:Atencion[]=[];
  private fetchAtencion = new Subject<Atencion[]>();




   saveAtencion(atencion:Atencion){
     this.http.post("http://localhost:3000/api/atencion", atencion)
    .subscribe(res=>{
      console.log(res)
    })
    this.fetchAtencion.next([...this.atencion])

    }

    getAtencion(){
      this.http.get<Atencion[]>("http://localhost:3000/api/atencion")
      .subscribe(transformedData=>{
        console.log(transformedData)
        this.atencion=transformedData;
        this.fetchAtencion.next([...this.atencion])
      })


  }

  getAtencionListener(){
    return this.fetchAtencion.asObservable()
  }

  constructor(private http:HttpClient) { }
}
