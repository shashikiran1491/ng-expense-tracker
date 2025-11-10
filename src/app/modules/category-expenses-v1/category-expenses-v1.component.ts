import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { MonthYearService } from 'src/app/service/month-year-service';
import { DateUtils } from 'src/app/utils/date-utils';
import { TransactionService } from 'src/app/service/transaction-service';
import { CategoryExpense } from 'src/app/model/category-expense';

@Component({
  selector: 'app-category-expenses-v1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-expenses-v1.component.html',
  styleUrls: ['./category-expenses-v1.component.scss']
})
export class CategoryExpensesV1Component implements OnInit {

  constructor(private monthYearService: MonthYearService,
    private transactionService: TransactionService
  ) { }

  private sub!: Subscription;
  month !: number;
  year !: number;
  startDate !: string;
  endDate !: string;
  categoryExpenses: CategoryExpense[] = [];

  ngOnInit(): void {
    this.sub = this.monthYearService.monthYear$.subscribe(({ month, year }) => {
      this.month = month;
      this.year = year;
      const { start, end } = DateUtils.getMonthDateRange(this.month + 1, this.year);
      const { startDate, endDate } = DateUtils.formatDateToString(start, end);
      this.startDate = startDate;
      this.endDate = endDate;
      this.loadCategoryWiseExpenses();
    });
  }

  loadCategoryWiseExpenses() {
    this.transactionService.loadCategoryWiseSummary(this.startDate, this.endDate)
      .subscribe({
        next: (response: CategoryExpense[]) => {
          if (response && response.length > 0) {
            this.categoryExpenses = response;
          }
        },
        error: err => console.error('Error loading category data:', err)
      });
  }
}
