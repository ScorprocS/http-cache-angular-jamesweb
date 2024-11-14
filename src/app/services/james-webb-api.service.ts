import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

interface ApiResponse{
  statusCode:number,
  body: any;

}
interface Program{
  program:number
}
interface Mission{
  mission: string,
  instruments: [{
            instrument: string
          }],
  suffix: string,
  description: string
}
export interface ProgramPartDetail{

    
      id: string,
      observation_id: string,
      program: number,
      details:Mission,
      file_type: string,
      thumbnail:string,
      location: string
    
    
}

@Injectable({
  providedIn: 'root'
})
export class JamesWebbApiService {

  readonly #httpClient = inject(HttpClient);
  public static readonly API_URL = 'https://api.jwstapi.com';
  public static readonly API_KEY = '7bf69e85-8db2-40f6-b5df-5c28ca922d73';

  readonly path='program';

  constructor() { }

  public getAllProgram():Observable<Program[]>{
    return this.#httpClient.get<ApiResponse>(`${JamesWebbApiService.API_URL}/${this.path}/list`).pipe(map((res:ApiResponse)=> res.body));
  }

  public getProgramById(id:string,page:number=1,perPage:number=10):Observable<ProgramPartDetail[]>{
    return this.#httpClient.get<ApiResponse>(`${JamesWebbApiService.API_URL}/${this.path}/id/${id}?page=${page}&perPage=${perPage}`).pipe(map((res:ApiResponse)=> res.body));
  }

  public getAllByFileType(type:'jpg' | 'ecsv' | 'fits' | 'json',page:number=1,perPage:number=10):Observable<ProgramPartDetail[]>{
       return this.#httpClient.get<ApiResponse>(`${JamesWebbApiService.API_URL}/all/type/${type}?page=${page}&perPage=${perPage}`).pipe(map((res:ApiResponse)=> res.body));
  }



}
