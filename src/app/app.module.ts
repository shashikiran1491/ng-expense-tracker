import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from "@angular/common";
import { LoginComponent } from './modules/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api-interceptor';
import { ShowTransactionsComponent } from './modules/show-transactions/show-transactions.component';
import { HeaderComponent } from "./modules/shared/header/header.component";
import { TransactionFilterComponent } from './modules/shared/transaction-filter/transaction-filter.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatDialogModule,
    DashboardComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    CommonModule,
    HttpClientModule,
    LoginComponent,
    HeaderComponent,
],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
