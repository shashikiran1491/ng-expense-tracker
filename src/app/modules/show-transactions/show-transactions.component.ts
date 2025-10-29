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
  category: string = 'All Categories';
  type: string = 'All Types';

  defaultDateRange: { start: Date; end: Date } | null = null;

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

      const { start, end } = DateUtils.getMonthDateRange(this.month, this.year);
      this.defaultDateRange = {start, end};

      const {startDate, endDate} = DateUtils.formatDateToString(start, end);
      this.startDate = startDate;
      this.endDate = endDate;
      this.loadTransactions();
    });
  }

  pageIndex = 0;
  pageSize = 20;
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
    this.updateRange();
    this.loadTransactions()
  }

  updateRange() {
   this.startIndex = this.pageIndex * this.pageSize;
   this.endIndex = Math.min(this.startIndex + this.pageSize, this.totalItems);
  }

  loadTransactions() {
    this.transactionservice.loadTransactions(this.startDate, this.endDate, this.category, this.type, this.pageIndex, this.pageSize).subscribe({
      next: (response) => {
        if (response) {
          const formattedExpenses = this.formatExpenseDate(response);
          this.dataSource.data = formattedExpenses;
          this.totalItems = response.totalElements;
        }
      },
      error: (err) => {
        this.snackBar.open('Something unexpected happened. Please try again after sometime.', '', {
          duration: 6000
        });
      }
    });
  }

  onFiltersChanged(values: any) {
    const {startDate, endDate} = DateUtils.formatDateToString(values.startDate, values.endDate);
    this.startDate = startDate;
    this.endDate = endDate;
    this.category = values.category;
    this.type = values.type;
    this.loadTransactions();
  }

  private formatExpenseDate(response: any) {
    return response.expenses.map((expense: any) => ({
      ...expense,
      expenseDate: expense.expenseDate ? expense.expenseDate.split('T')[0] : ''
    }));
  }
}

