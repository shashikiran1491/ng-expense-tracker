import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';
import { AddTransactionComponent } from "../add-transaction/add-transaction.component";
import { MatDialog } from "@angular/material/dialog";
import { TransactionService } from "src/app/service/transaction-service";
import { MonthYearService } from "src/app/service/month-year-service";
import { Subscription } from "rxjs";
import { DateUtils } from "src/app/utils/date-utils";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TransactionResponse } from "src/app/model/transaction-response";

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  standalone: true,
  styleUrls: ['./recent-transactions.component.scss'],
  imports: [CommonModule, MatIconModule, MatCardModule]
})
export class RecentTransactionsComponent {

  constructor(private dialog: MatDialog,
    private transactionService: TransactionService,
    private monthYearService: MonthYearService,
    private snackBar: MatSnackBar) {
  }

  month!: number;
  year!: number
  startDate!: string;
  endDate!: string;
  private sub!: Subscription;
  recentTransactions: TransactionResponse[] = [];

  ngOnInit(): void {
    this.sub = this.monthYearService.monthYear$.subscribe(({ month, year }) => {
      this.month = month;
      this.year = year;
      const { start, end } = DateUtils.getMonthDateRange(this.month + 1, this.year);
      const { startDate, endDate } = DateUtils.formatDateToString(start, end);
      this.startDate = startDate;
      this.endDate = endDate;
      this.loadRecentTransactions();
    });
  }

  onAddTransaction() {
    const dialogRef = this.dialog.open(AddTransactionComponent, {
      disableClose: true,
      width: '500px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadRecentTransactions();
      }
    });
}

  onDelete(txn: any) {
    console.log("deleting trnsaction", txn);
  }

  loadRecentTransactions() {

    this.transactionService.loadTransactions(this.startDate, this.endDate, "All Categories", "All Types", 0, 5).subscribe({
      next: (response) => {
        if (response) {
          const formattedExpenses = this.formatExpenseDate(response);
          this.recentTransactions = formattedExpenses;
        }
      },
      error: (err) => {
        this.snackBar.open('Something unexpected happened. Please try again after sometime.', '', {
          duration: 6000
        });
      }

    });
  }

  private formatExpenseDate(response: any) {
    return response.expenses.map((expense: any) => ({
      ...expense,
      expenseDate: expense.expenseDate ? expense.expenseDate.split('T')[0] : ''
    }));
  }
}
