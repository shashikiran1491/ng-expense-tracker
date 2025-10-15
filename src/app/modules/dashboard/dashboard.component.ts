import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { AddTransactionComponent } from "./add-transaction/add-transaction.component";
import { FinanceOverviewComponent } from "./finance-overview/finance-overview.component";
import { CategoryExpensesComponent } from "./category-expenses/category-expenses.component";
import { RecentTransactionsComponent } from "./recent-transactions/recent-transactions.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.scss'],
  imports:[HeaderComponent, AddTransactionComponent, FinanceOverviewComponent, CategoryExpensesComponent,
    RecentTransactionsComponent]
})
export class DashboardComponent {

}
