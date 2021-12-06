import { Owner } from "./owner.model";

export interface Animal{

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
  registryDate:Date,
  owner:Owner
}
