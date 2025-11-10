import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TransactionService } from 'src/app/service/transaction-service';
import { MonthYearService } from 'src/app/service/month-year-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateUtils } from 'src/app/utils/date-utils';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';

@Component({
  selector: 'app-no-transactions',
  standalone: true,
  imports: [CommonModule,
    RouterModule
  ],
  templateUrl: './no-transactions.component.html',
  styleUrls: ['./no-transactions.component.scss']
})
export class NoTransactionsComponent {

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

  ngOnInit(): void {
    this.sub = this.monthYearService.monthYear$.subscribe(({ month, year }) => {
      this.month = month;
      this.year = year;
      const { start, end } = DateUtils.getMonthDateRange(this.month + 1, this.year);
      const { startDate, endDate } = DateUtils.formatDateToString(start, end);
      this.startDate = startDate;
      this.endDate = endDate;
    });
  }

  onAddTransaction() {
    const dialogRef = this.dialog.open(AddTransactionComponent, {
      disableClose: true,
      width: '500px',
      panelClass: 'custom-dialog-container'
    });
  }
}
