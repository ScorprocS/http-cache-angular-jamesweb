import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { HttpRequest, HttpResponse } from '@angular/common/http';
type Cache = { response: HttpResponse<unknown>; expiration: number; responseDate: number }

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {
  readonly #localStorageService = inject(LocalStorageService);
  private readonly LOCAL_STORAGE_KEY = 'httpCache'
  static readonly cacheDuration = 10000;
  #caches = new Map<string,Cache>();

  constructor() { }

  init():void{
    //read from localStorage
    const caches = this.#localStorageService.getObject(this.LOCAL_STORAGE_KEY);
    if(caches){
      this.#caches = new Map(caches);
    }
  }

  get(req: HttpRequest<unknown>): HttpResponse<unknown> | undefined {
    const url = req.urlWithParams;
    const cached = this.#caches.get(url);

    if (!cached || cached.expiration <= new Date().getTime()) {
      return undefined;
    }

    const tmp = cached.response ;
    return tmp.clone();
  }

  set(req: HttpRequest<unknown>, response: HttpResponse<unknown>): void {
    this.#caches.set(req.url, {
      response,
      expiration: new Date().getTime() + HttpCacheService.cacheDuration,
      responseDate: new Date().getTime(),
    });
    this.#localStorageService.setObject(this.LOCAL_STORAGE_KEY, Array.from(this.#caches.entries()));
  }



}
