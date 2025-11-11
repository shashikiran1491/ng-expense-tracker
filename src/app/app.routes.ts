import { Routes } from "@angular/router";
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { LoginComponent } from "./modules/login/login.component";
import { RegisterComponent } from "./modules/register/register.component";
import { ShowTransactionsComponent } from "./modules/show-transactions/show-transactions.component";
import { authGuard } from "./service/security/auth.guard";
import { LandingPageComponent } from "./modules/landing-page/landing-page.component";

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'show-transactions', component: ShowTransactionsComponent, canActivate: [authGuard] },
  { path: 'expenses', component: ShowTransactionsComponent, canActivate: [authGuard] },
];

