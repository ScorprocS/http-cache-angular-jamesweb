import { HttpInterceptorFn } from '@angular/common/http';
import { JamesWebbApiService } from './james-webb-api.service';

export const httpRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({ setHeaders: { 'X-API-KEY': JamesWebbApiService.API_KEY } });
  return next(clonedRequest);
};
