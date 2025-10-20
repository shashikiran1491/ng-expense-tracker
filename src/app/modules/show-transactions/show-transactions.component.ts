import { Component, ViewChild } from '@angular/core';
import { FinanceSummaryComponent } from '../shared/finance-summary/finance-summary.component';
import { HeaderComponent } from '../shared/header/header.component';
import { TransactionFilterComponent } from '../shared/transaction-filter/transaction-filter.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

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
   month ?: number;
   year ?: number;

   constructor(private route: ActivatedRoute) {

   }

ngOnInit () {
  this.route.queryParams.subscribe(params => {
    this.month = params['month'];
    this.year = params['year'];

    if (!this.month || !this.year) {
      const currentDate = new Date();
      this.month = currentDate.getMonth();
      this.year = currentDate.getFullYear();                   
    }

    const { startDate, endDate } = this.getStartDateAndEndDate(this.month, this.year);
    this.loadTransactions(startDate, endDate);

  });
}

  transactions : any = [
    {date: new Date().toDateString(), merchant: 'merchant', category: 'sample',type: 'Expense', amount: 100},
    {date: new Date().toDateString(), merchant: 'merchant', category: 'sample',type: 'Income', amount: 100},
    {date: new Date().toDateString(), merchant: 'merchant', category: 'sample',type: 'Income', amount: 100},
    {date: new Date().toDateString(), merchant: 'merchant', category: 'sample',type: 'Income', amount: 100},
    {date: new Date().toDateString(), merchant: 'merchant', category: 'sample',type: 'Income', amount: 100},
    {date: new Date().toDateString(), merchant: 'merchant', category: 'sample',type: 'Expense', amount: 100},
    {date: new Date().toDateString(), merchant: 'merchant', category: 'sample',type: 'Income', amount: 100},
    {date: new Date().toDateString(), merchant: 'merchant', category: 'sample',type: 'Income', amount: 100},
    {date: new Date().toDateString(), merchant: 'merchant', category: 'sample',type: 'Income', amount: 100},
    {date: new Date().toDateString(), merchant: 'merchant', category: 'sample',type: 'Income', amount: 100},
    {date: new Date().toDateString(), merchant: 'merchant', category: 'sample',type: 'Expense', amount: 100},
    {date: new Date().toDateString(), merchant: 'merchant', category: 'sample',type: 'Income', amount: 100},
    {date: new Date().toDateString(), merchant: 'merchant', category: 'sample',type: 'Income', amount: 100},
    {date: new Date().toDateString(), merchant: 'merchant', category: 'sample',type: 'Income', amount: 100},
    {date: new Date().toDateString(), merchant: 'merchant', category: 'sample',type: 'Income', amount: 100},

  ]

  totalItems = this.transactions.length;
  pageSize = 5;
  pageIndex = 0;
  startIndex = 0;
  endIndex = this.pageSize;

   displayedColumns: string[] = ['date', 'merchant', 'category', 'type' ,'amount', 'actions'];

   dataSource = new MatTableDataSource(this.transactions);

   @ViewChild(MatPaginator) paginator!: MatPaginator;
 
   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
    }

   onDelete(transaction: any) {
    console.log("Transaction deleted")
    }

    onPageChange(event: PageEvent) {
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
      this.updateRange();
    }
  
    updateRange() {
      this.startIndex = this.pageIndex * this.pageSize;
      this.endIndex = Math.min(this.startIndex + this.pageSize, this.totalItems);
    }

    loadTransactions(startDate: Date, endDate: Date) {
      console.log(startDate.toISOString());
      console.log(endDate.toISOString());
      
    }

    getStartDateAndEndDate(month: number, year: number) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0); 
      return {
        startDate, 
        endDate
      };

    }

}
