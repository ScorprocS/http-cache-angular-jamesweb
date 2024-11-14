import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key:string,value:string) :void{
    localStorage.setItem(key,value);

  }

  getItem(key:string) :string | null{
    return localStorage.getItem(key);

  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  getObject(key:string):any|null{
    const value=this.getItem(key);
    if(value){
      try{
        return JSON.parse(value);
      }catch(e){
        console.log("Error parsing json from local storage")
      }
    }
    return null;
  }

  setObject(key:string,object:any): void{
    this.setItem(key, JSON.stringify(object))
  }

}
