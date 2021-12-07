import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Deceso } from '../models/deceso.model';

@Injectable({
  providedIn: 'root'
})
export class DecesosService {
  private decesos:Deceso[]=[];
  private fetchDecesos = new Subject<Deceso[]>();

  saveDeceso(deceso:Deceso){
    this.http.post("http://localhost:3000/api/deceso", deceso)
   .subscribe(res=>{
     console.log(res)
   })
   this.fetchDecesos.next([...this.decesos])
   }

   getDecesoListener(){
    return this.fetchDecesos.asObservable()
  }

  getDecesos(){
    this.http.get<{message:string, decesos: []}>("http://localhost:3000/api/deceso")
    .pipe(map(
      responseData=>{
        console.log(responseData)
        return responseData.decesos.map(
          (decesosResp:{
            _id:string,
            estancia:string,
            sector:string,
            registroDeceso:Date,
            responsable:string,
            desc:string,
            antecedentes:string,
            acciones:string,
            informe:string,
            causa:string,
            enfermedad:string,
            factores:string,
            name:string,
            species:string,
            sex:string,
            color:string,
            birthDate:Date,
            breed: string,
            ownerName:string,
            ownerCi:string,
            ownerCellphone:string,
            ownerAddress:string,

            }) =>{
            return {
              id:decesosResp._id,
              estancia:decesosResp.estancia,
              sector:decesosResp.sector,
              registroDeceso:decesosResp.registroDeceso,
              responsable:decesosResp.responsable,
              desc:decesosResp.desc,
              antecedentes:decesosResp.antecedentes,
              acciones:decesosResp.acciones,
              informe:decesosResp.informe,
              causa:decesosResp.causa,
              enfermedad:decesosResp.enfermedad,
              factores:decesosResp.factores,
              name:decesosResp.name,
              species:decesosResp.species,
              sex:decesosResp.sex,
              color:decesosResp.color,
              birthDate:decesosResp.birthDate,
              breed: decesosResp.breed,
              ownerName:decesosResp.ownerName,
              ownerCi:decesosResp.ownerCi,
              ownerCellphone:decesosResp.ownerCellphone,
              ownerAddress:decesosResp.ownerAddress,
              }
          }
        )

      })

)
.subscribe(transformedData=>{
  console.log(transformedData)
  this.decesos=transformedData;
  this.fetchDecesos.next([...this.decesos])
  console.log(this.decesos)
})


}



  constructor(private http: HttpClient) { }
}
