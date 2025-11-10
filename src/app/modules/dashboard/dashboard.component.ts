import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FinanceOverviewComponent } from "../finance-overview/finance-overview.component";
import { CategoryExpensesComponent } from "../category-expenses/category-expenses.component";
import { RecentTransactionsComponent } from "../recent-transactions/recent-transactions.component";
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FinanceSummaryComponent } from '../finance-summary/finance-summary.component';
import { NoTransactionsComponent } from '../no-transactions/no-transactions.component';
import { CategoryExpensesV1Component } from '../category-expenses-v1/category-expenses-v1.component';
import { ExpenseInsightsComponent } from "../expense-insights/expense-insights.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.scss'],
  imports: [FinanceOverviewComponent,
    FinanceSummaryComponent,
    CategoryExpensesComponent,
    RecentTransactionsComponent,
    NoTransactionsComponent,
    CategoryExpensesV1Component,
    ExpenseInsightsComponent,
    HeaderComponent,
    MatDialogModule,
    MatSnackBarModule, ExpenseInsightsComponent]
})
export class DashboardComponent {

}
