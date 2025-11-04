import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Router, RouterModule } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  SocialAuthServiceConfig,
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { apiInterceptor } from './app/interceptors/api.interceptor';
import { errorInterceptor } from './app/interceptors/error.handler.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor, errorInterceptor])),
    importProvidersFrom(BrowserAnimationsModule, MatSnackBarModule, RouterModule),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '1048959448643-daek0gru58fma69mvf0mqej3c140o8ui.apps.googleusercontent.com' // ← replace with your real client ID
            )
          }
        ],
        onError: (err) => console.error(err)
      } as SocialAuthServiceConfig
    }
  ],
}).catch(err => console.error(err));