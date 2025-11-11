import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FinanceOverviewComponent } from "../finance-overview/finance-overview.component";
import { RecentTransactionsComponent } from "../recent-transactions/recent-transactions.component";
import { MatDialogModule } from '@angular/material/dialog';
import { FinanceSummaryComponent } from '../finance-summary/finance-summary.component';
import { NoTransactionsComponent } from '../no-transactions/no-transactions.component';
import { CategoryExpensesV1Component } from '../category-expenses-v1/category-expenses-v1.component';
import { ExpenseInsightsComponent } from "../expense-insights/expense-insights.component";
import { TransactionService } from 'src/app/service/transaction-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MonthYearService } from 'src/app/service/month-year-service';
import { Subscription } from 'rxjs';
import { DateUtils } from 'src/app/utils/date-utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  styleUrls: ['./dashboard.component.scss'],
  imports: [FinanceOverviewComponent,
    FinanceSummaryComponent,
    RecentTransactionsComponent,
    NoTransactionsComponent,
    CategoryExpensesV1Component,
    ExpenseInsightsComponent,
    HeaderComponent,
    MatDialogModule,
    ExpenseInsightsComponent,
    CommonModule]
})
export class DashboardComponent implements OnInit, OnDestroy {

  loadNoTransactionsPage = false;
  month!: number;
  year!: number
  startDate!: string;
  endDate!: string;
  private sub!: Subscription;

  constructor(private transactionService: TransactionService,
    private snackBar: MatSnackBar,
    private monthYearService: MonthYearService
  ) { }

  ngOnInit(): void {
    this.sub = this.monthYearService.monthYear$.subscribe(({ month, year }) => {
      this.month = month;
      this.year = year;
      const { start, end } = DateUtils.getMonthDateRange(this.month + 1, this.year);
      const { startDate, endDate } = DateUtils.formatDateToString(start, end);
      this.startDate = startDate;
      this.endDate = endDate;
      this.loadTransactions();
    });
}

ngOnDestroy() {
    this.sub.unsubscribe();
  }

  loadTransactions() {
    this.transactionService.loadTransactions(this.startDate, this.endDate, "All Categories", "All Types", 0, 1).subscribe({
      next: (response) => {
        if (response) {
         this.loadNoTransactionsPage = response.totalElements == 0
        }
      },
      error: (err) => {
        this.snackBar.open('Something unexpected happened. Please try again after sometime.', '', {
          duration: 6000
        });
      }
    });
  }
}
