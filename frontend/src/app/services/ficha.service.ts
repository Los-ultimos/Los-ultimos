import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Ficha } from '../models/ficha.model';

@Injectable({
  providedIn: 'root'
})
export class FichaService {
  private fichas:Ficha[]=[];
  private fetchFichas = new Subject<Ficha[]>();




   saveFicha(ficha:Ficha){
     this.http.post("http://localhost:3000/api/fichas", ficha)
    .subscribe(res=>{
      console.log(res)
    })
    this.fetchFichas.next([...this.fichas])
    }

    updateFicha(ficha:Ficha,id:string){
      this.http
      .put("http://localhost:3000/api/fichas/" + id, ficha)
      .subscribe(response => {
        const updatedFichas = [...this.fichas];
        const oldAnimalIndex = updatedFichas.findIndex(f => f.id === ficha.id);
        updatedFichas[oldAnimalIndex] = ficha;
        this.fichas = updatedFichas;
        this.fetchFichas.next([...this.fichas]);
      });
    }


  getFichas(){
    this.http.get<{message:string, fichas: []}>("http://localhost:3000/api/fichas")
    .pipe(map(
      responseData=>{
        console.log(responseData)
        return responseData.fichas.map(
          (fichasResp:{
            _id:string,
            number:number,
            typeConsult:string,
            vet:string,
            state:string,
            atention:string,
            registryDate:Date,
            systemRegistry:Date,
            name:string,
            species:string,
            sex:string,
            color:string,
            birthDate:Date,
            breed: string,
            picture:string,
            age:string,
            sterilized:boolean,
            vaccines:string,
            ownerName:string,
            ownerCi:string,
            ownerCellphone:string,
            ownerDistrict:string,
            ownerRegion:string,
            ownerNeighborhood: string,
            ownerAddress:string,
            ownerEmail:string,

            }) =>{
            return {
              id:fichasResp._id,
              number:fichasResp.number+1,
              typeConsult:fichasResp.typeConsult,
              vet:fichasResp.vet,
              state:fichasResp.state,
              atention:fichasResp.atention,
              registryDate:fichasResp.registryDate,
              name:fichasResp.name,
              species:fichasResp.species,
              sex:fichasResp.sex,
              color:fichasResp.color,
              birthDate:fichasResp.birthDate,
              breed: fichasResp.breed,
              picture:fichasResp.picture,
              age:fichasResp.age,
              sterilized:fichasResp.sterilized,
              vaccines:fichasResp.vaccines,
              ownerName:fichasResp.ownerName,
              ownerCi:fichasResp.ownerCi,
              ownerCellphone:fichasResp.ownerCellphone,
              ownerDistrict:fichasResp.ownerDistrict,
              ownerRegion:fichasResp.ownerRegion,
              ownerNeighborhood: fichasResp.ownerNeighborhood,
              ownerAddress:fichasResp.ownerAddress,
              ownerEmail:fichasResp.ownerEmail,
              }
          }
        )

      })

)
.subscribe(transformedData=>{
  console.log(transformedData)
  this.fichas=transformedData;
  this.fetchFichas.next([...this.fichas])
  console.log(this.fichas)
})


}

getFichasListener(){
  return this.fetchFichas.asObservable()
}



  constructor(private http:HttpClient) { }

}
