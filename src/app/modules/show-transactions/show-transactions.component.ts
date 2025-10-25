import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FinanceSummaryComponent } from '../finance-summary/finance-summary.component';
import { HeaderComponent } from '../header/header.component';
import { TransactionFilterComponent } from '../transaction-filter/transaction-filter.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { DateUtils } from 'src/app/utils/date-utils';
import { TransactionService } from 'src/app/service/transaction-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-transactions',
  templateUrl: './show-transactions.component.html',
  styleUrls: ['./show-transactions.component.scss'],
  standalone: true,
  imports: [HeaderComponent,
    FinanceSummaryComponent,
    TransactionFilterComponent,
    MatTableModule,
    MatIconModule,
    CommonModule,
    MatPaginatorModule
  ]
})
export class ShowTransactionsComponent {
  month?: number;
  year?: number;
  startDate!: string;
  endDate!: string;

  constructor(private route: ActivatedRoute,
    private transactionservice: TransactionService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }  

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.month = +params['month'] + 1;
      this.year = Number(params['year']);

      if (!this.month || !this.year) {
        const currentDate = new Date();
        this.month = currentDate.getMonth() + 1;
        this.year = currentDate.getFullYear();
      }

      const { startDate, endDate } = DateUtils.getMonthDateRange(this.month, this.year);
      this.startDate = startDate;
      this.endDate = endDate;
      this.loadTransactions();
    });
  }

  pageIndex = 0;
  pageSize = 5;
  totalItems = 0;
  
  startIndex = 0;
  endIndex = this.pageSize;

  displayedColumns: string[] = ['date', 'merchant', 'category', 'type', 'amount', 'actions'];
  dataSource = new MatTableDataSource([]);

  onDelete(transaction: any) {
    console.log("Transaction deleted")
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    console.log("Printing pageSize and pageIndex", this.pageSize, "------", this.pageIndex)
    this.updateRange();
    this.loadTransactions()
  }

  updateRange() {
   this.startIndex = this.pageIndex * this.pageSize;
   this.endIndex = Math.min(this.startIndex + this.pageSize, this.totalItems);
  }

  loadTransactions() {
    this.transactionservice.loadTransactions(this.startDate, this.endDate, this.pageIndex, this.pageSize).subscribe({
      next: (response) => {
        if (response) {
          const formattedExpenses = this.formatExpenseDate(response);
          this.dataSource.data = formattedExpenses;
          this.totalItems = response.totalElements;

          //this.cdr.detectChanges();

          console.log("total elemnst", this.totalItems, "----", response.totalElements)
          console.log("Printing datasource data", this.dataSource.data);
          console.log("Printing page size and total Items", this.pageSize , "---",this.pageIndex, "------", this.totalItems)
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

