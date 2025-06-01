import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { authInterceptor } from './interceptors/auth.interceptor';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // provideHttpClient: Necessary because the login component initializes a service that needs HttpClient
    // Auth interceptor is not mandatory but best practice for token mgmt
    provideHttpClient(withInterceptors([authInterceptor])),
  ]
};
