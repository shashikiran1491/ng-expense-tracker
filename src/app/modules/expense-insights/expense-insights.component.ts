import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseInsights } from 'src/app/model/expense-insights';
import { Subscription } from 'rxjs';
import { MonthYearService } from 'src/app/service/month-year-service';
import { TransactionService } from 'src/app/service/transaction-service';
import { TransactionEventService } from 'src/app/service/transaction-event-service';

@Component({
  selector: 'app-expense-insights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-insights.component.html',
  styleUrls: ['./expense-insights.component.scss']
})
export class ExpenseInsightsComponent implements OnInit {

  expenseInsights: ExpenseInsights | null = null;

  private sub!: Subscription;
  month !: number;
  year !: number;

  constructor(private monthYearService: MonthYearService,
    private transactionService: TransactionService,
    private transactionEvents: TransactionEventService
  ) { }

  ngOnInit() {
    this.sub = this.monthYearService.monthYear$.subscribe(({ month, year }) => {
      this.month = month;
      this.year = year;
      this.loadExpenseInsights();
    });

     this.transactionEvents.transactionAdded$.subscribe(() => {
      this.loadExpenseInsights();
    });  

  }

  loadExpenseInsights() {
    this.transactionService.loadExpenseInsights(this.month + 1, this.year)
      .subscribe({
        next: (response: ExpenseInsights) => {
          if (response) {
            this.expenseInsights = response;
          }
        },
        error: err => console.error('Error loading Expense Insights:', err)
      });
  }
}

