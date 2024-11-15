import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpRequestInterceptor } from './services/http-request.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { httpCacheInterceptor } from './services/http-cache.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,withComponentInputBinding()), provideHttpClient(withInterceptors([httpRequestInterceptor,httpCacheInterceptor])), provideAnimationsAsync('noop')]
};
