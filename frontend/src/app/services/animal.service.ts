import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Animal } from '../models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {


    private animals:Animal[]=[];
    private fetchAnimals = new Subject<Animal[]>();

    getAnimals(){
      this.http.get<{message:string, animal: []}>("http://localhost:3000/api/animal")
      .pipe(map(
        responseData=>{
          console.log(responseData)
          return responseData.animal.map(
            (animalResp:{
              _id:string;
              name:string;
              species:string;
              sex:string;
              color:string;
              birthDate:string;
              breed: string;
              picture:string;
              age:string;
              sterilized:boolean;
              vaccines:string;
              registryDate:string;
              systemRegistry:Date;
              owner:{
                registerCode:string,
                name:string,
                ci:string,
                cellphone:string,
                district:string,
                region:string,
                neighborhood: string,
                address:string,
                email:string,
                registryDate:Date,
                systemRegistry:Date;
              }}) =>{
              return {
                id:animalResp._id,
                name:animalResp.name,
                species:animalResp.species,
                sex:animalResp.sex,
                color:animalResp.color,
                birthDate: new Date(animalResp.birthDate),
                breed: animalResp.breed,
                picture:animalResp.picture,
                age:animalResp.age,
                sterilized:animalResp.sterilized,
                vaccines:animalResp.vaccines,
                registryDate:new Date(animalResp.registryDate),
                owner:{
                  id: animalResp.owner.registerCode,
                  name: animalResp.owner.name,
                  ci: animalResp.owner.ci,
                  cellphone: animalResp.owner.cellphone,
                  district: animalResp.owner.district,
                  region: animalResp.owner.region,
                  neighborhood: animalResp.owner.neighborhood,
                  address: animalResp.owner.address,
                  email: animalResp.owner.email,
                  registryDate: animalResp.owner.registryDate,
                }
              };
            }
          )

        })

  )
  .subscribe(transformedData=>{
    console.log(transformedData)
    this.animals=transformedData;
    this.fetchAnimals.next([...this.animals])
    console.log(this.animals)
  })


  }

  updateAnimal(animal:Animal, id: string,) {
    this.http
      .put("http://localhost:3000/api/animal/" + id, animal)
      .subscribe(response => {
        const updatedAnimals = [...this.animals];
        const oldAnimalIndex = updatedAnimals.findIndex(a => a.id === animal.id);
        updatedAnimals[oldAnimalIndex] = animal;
        this.animals = updatedAnimals;
        this.fetchAnimals.next([...this.animals]);
      });
  }

  getAnimalListener(){
    return this.fetchAnimals.asObservable()
  }


  saveAnimal(animal:Animal){
      this.http.post("http://localhost:3000/api/animal", animal)
      .subscribe(res=>{
        console.log(res)
      })
  }

  deleteAnimal(animalId: string) {
    this.http
      .delete("http://localhost:3000/api/animal/" + animalId)
      .subscribe(() => {
        const updatedAnimals = this.animals.filter(animal => animal.id !== animalId);
        this.animals = updatedAnimals;
        this.fetchAnimals.next([...this.animals]);
      });
  }




  constructor(private http:HttpClient) { }
}
