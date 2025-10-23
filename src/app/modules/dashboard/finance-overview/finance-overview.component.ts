import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MonthYearService } from 'src/app/service/month-year-service';
import { FinanceSummaryComponent } from "../../shared/finance-summary/finance-summary.component";

@Component({
  selector: 'app-finance-overview',
  templateUrl: './finance-overview.component.html',
  standalone: true,
  styleUrls: ['./finance-overview.component.scss'],
  imports: [MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule, FinanceSummaryComponent]
})
export class FinanceOverviewComponent {

  constructor(private router: Router,
    private monthYearService: MonthYearService) {
  }

  selectedMonth = new Date().getMonth() + 1;
  selectedYear = new Date().getFullYear();

  months = [
    { name: 'January', value: 0 },
    { name: 'February', value: 1 },
    { name: 'March', value: 2 },
    { name: 'April', value: 3 },
    { name: 'May', value: 4 },
    { name: 'June', value: 5 },
    { name: 'July', value: 6 },
    { name: 'August', value: 7 },
    { name: 'September', value: 8 },
    { name: 'October', value: 9 },
    { name: 'November', value: 10 },
    { name: 'December', value: 11 },
  ];

  years: number[] = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);


  ngOnInit() {
    const { month, year } = this.monthYearService.getCurrentMonthYear();
    this.selectedMonth = month - 1;
    this.selectedYear = year;
  }

  onMonthYearChange(): void {
    this.monthYearService.setMonthYear(this.selectedMonth + 1, this.selectedYear);
  }

  showTransactions() {
    const selectedMonth = this.selectedMonth;
    const selectedYear = this.selectedYear; 
    this.router.navigate(['/show-transactions'], {
      queryParams: { month: selectedMonth, year: selectedYear }
    });
  }

  getMonthAndYear() : string {
    return this.months[this.selectedMonth].name + ' ' +this.selectedYear;
  }
}
