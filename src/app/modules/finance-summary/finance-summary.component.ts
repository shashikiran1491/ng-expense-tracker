import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { FinanceSummary } from 'src/app/model/finance-summary';
import { MonthYearService } from 'src/app/service/month-year-service';
import { TransactionService } from 'src/app/service/transaction-service';
import { DateUtils } from 'src/app/utils/date-utils';

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
      console.log("Printing month and year ", this.month, "----", this.year);
      const {startDate, endDate} = DateUtils.getMonthDateRange(this.month + 1, this.year);
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
}
