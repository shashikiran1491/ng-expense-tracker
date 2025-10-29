import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { AddTransactionComponent } from "./add-transaction/add-transaction.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.scss'],
  imports:[HeaderComponent, AddTransactionComponent]
})
export class DashboardComponent {

}
