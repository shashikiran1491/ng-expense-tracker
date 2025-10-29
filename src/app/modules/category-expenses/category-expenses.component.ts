import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CategoryExpense } from "src/app/model/category-expense";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MonthYearService } from 'src/app/service/month-year-service';
import { Subscription } from 'rxjs';
import { DateUtils } from 'src/app/utils/date-utils';
import { TransactionService } from 'src/app/service/transaction-service';
import { MatSnackBar } from '@angular/material/snack-bar';

Chart.register(...registerables);
Chart.register(ChartDataLabels);

@Component({
  selector: 'app-category-expenses',
  templateUrl: './category-expenses.component.html',
  standalone: true,
  styleUrls: ['./category-expenses.component.scss'],
  imports: [MatIconModule, CommonModule]
})
export class CategoryExpensesComponent implements OnInit {

  @ViewChild('pieChartCanvas') pieChartCanvas!: ElementRef<HTMLCanvasElement>;
  
  private sub!: Subscription;
  month !: number;
  year !: number;
  startDate !: string;
  endDate !: string;
  chart: Chart | undefined;

  labels: string[] = [];
  expense: number[] = [];
  percentage: number[] = [];

  noData: boolean = false;

  constructor(private monthYearService: MonthYearService,
    private transactionService: TransactionService,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.sub = this.monthYearService.monthYear$.subscribe(({ month, year }) => {
      this.month = month;
      this.year = year;
      const { start, end } = DateUtils.getMonthDateRange(this.month + 1, this.year);
      const { startDate, endDate } = DateUtils.formatDateToString(start, end);
      this.startDate = startDate;
      this.endDate = endDate;
      this.loadChartData();
      });
  }

  loadChartData() {

    this.transactionService.loadCategoryWiseSummary(this.startDate, this.endDate)
      .subscribe({
        next: (response: CategoryExpense[]) => {
          if (response && response.length > 0) {
            this.noData = false;

            // Clear old data
            this.labels = [];
            this.expense = [];
            this.percentage = [];

            // Map new data
            this.labels = response.map(data => data.category);
            this.expense = response.map(data => data.totalAmount);
            this.percentage = response.map(data => data.percentage);

            this.renderChart(this.labels, this.expense, this.percentage);
          } else {
            this.noData = true;

            if (this.chart) {
              this.chart.destroy();
            }
          }
        },
        error: err => console.error('Error loading chart data:', err)
      });
  }

  renderChart(labels: string[], expense: number[], percentage: number[]) {

    if (this.chart) {
      this.chart.destroy();
    }

    if (!this.pieChartCanvas?.nativeElement) {
      console.warn('Canvas element not available yet.');
      return;
    }

    const ctx = this.pieChartCanvas.nativeElement.getContext('2d');

    if (!ctx) {
      console.error("Can't acquire canvas context");
      return; 
    }

    this.chart = new Chart(ctx , {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: expense,
        }]
      },
      options: {
        layout: {
          padding: {
            left: 120,
            right: 60,
            bottom: 70
          }
        },
        plugins: {
          datalabels: {
            color: '#000',
            anchor: 'end',
            align: 'end',

            formatter: (value, context) => {
              const index = context.dataIndex;
              return percentage[index]?.toFixed(2) + '%';
            }
          }
        },
        animation: {
          duration: 1500
        }
      },
      plugins: [ChartDataLabels]
    });
  }
}
