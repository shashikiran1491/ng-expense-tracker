import { Component } from '@angular/core';
import { DashboardComponent } from "./modules/dashboard/dashboard.component";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AppComponent {
  title = 'ng-expense-tracker';
}
