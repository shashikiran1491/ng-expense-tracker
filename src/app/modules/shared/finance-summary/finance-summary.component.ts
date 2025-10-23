import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { FinanceSummary } from 'src/app/model/finance-summary';
import { MonthYearService } from 'src/app/service/month-year-service';
import { TransactionService } from 'src/app/service/transaction-service';

@Component({
  selector: 'app-finance-summary',
  templateUrl: './finance-summary.component.html',
  styleUrls: ['./finance-summary.component.scss'],
  standalone: true,
  imports: [MatIconModule]
})
export class FinanceSummaryComponent {

  financeSummary: FinanceSummary | null = null;
  month!:  number;
  year!: number;
  private sub!: Subscription;

  constructor(private transactionService: TransactionService,
    private monthYearService: MonthYearService) {
}

  ngOnInit(): void {
    this.sub = this.monthYearService.monthYear$.subscribe(({ month, year }) => {
      this.month = month;
      this.year = year;
      const { startDate, endDate } = this.getMonthDateRange(this.month, this.year);
      this.loadFinanceSummary(startDate, endDate);
    });
}


  ngOnDestroy() {
    this.sub.unsubscribe(); // important to prevent stacked subscriptions
  }

  loadFinanceSummary(startDate: string, endDate: string) {
    this.transactionService.loadFinanceSummary(startDate, endDate).subscribe({
      next:(response) => {
        this.financeSummary = response;
      }
    });
  }

  private getMonthDateRange(month: number, year: number) {
    const start = new Date(year, month - 1, 1);
    const today = new Date();
    let end: Date;

    if (year === today.getFullYear() && month === today.getMonth() + 1) {
      end = today;
    } else {
      end = new Date(year, month, 0);
    }

    const format = (d: Date) => d.toLocaleDateString('en-CA');
    return {
      startDate: format(start),
      endDate: format(end)
    };
  }
}
