export interface Ficha{
  id?:string,
  number:number,
  typeConsult:string,
  vet:string,
  state:string,
  atention:string,
  registryDate:Date,
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
  ownerDistrict?:string,
  ownerRegion:string,
  ownerNeighborhood: string,
  ownerAddress:string,
  ownerEmail:string,
}
