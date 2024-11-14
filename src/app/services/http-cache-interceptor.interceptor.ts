import { HttpResponse, type HttpInterceptorFn } from '@angular/common/http';
import { HttpCacheService } from './http-cache.service';
import { inject } from '@angular/core';
import { of, tap } from 'rxjs';



export const httpCacheInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(HttpCacheService);

  if(req.method ==='GET'){
    const cachedReq = cacheService.get(req);
    return cachedReq?of(cachedReq):next(req).pipe(
      tap((stateEvent) => {
        if (stateEvent instanceof HttpResponse) {
          cacheService.set(req, stateEvent.clone());
        }
      })
    );;
  }
 

  return next(req);
};
