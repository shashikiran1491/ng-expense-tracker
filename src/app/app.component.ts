import { Component } from '@angular/core';
import { DashboardComponent } from "./modules/dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-expense-tracker';
}
