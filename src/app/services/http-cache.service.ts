import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {
  readonly #localStorageService = inject(LocalStorageService);

  cache = new Map<string,any>();

  constructor() { }

  init():void{
    
  }




}
