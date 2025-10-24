import {Component, OnInit} from '@angular/core';
import {Chart, registerables} from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {CategoryExpense} from "src/app/model/category-expense";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";

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
  chartData: CategoryExpense[] = [];

  labels: string[] = [];
  expense: number[] = [];
  percentage: number[] = [];

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData() {

    this.chartData = [
      {category: 'Food', expense: 60, percentage: 20},
      {category: 'Transport', expense: 40, percentage: 40},
      {category: 'Utilities', expense: 40, percentage: 40},
      {category: 'Entertainment', expense: 20, percentage: 20}
    ];

    this.chartData.map(data => {
      this.labels.push(data.category);
      this.expense.push(data.expense);
      this.percentage.push(data.percentage);
    })

    this.renderChart(this.labels, this.expense, this.percentage);
  }

  renderChart(labels: string[], expense: number[], percentage: number[]) {
    const chart = new Chart('pieChart', {
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
            top: 10,
            left: 50,
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
              const label = context.chart.data.labels?.[context.dataIndex] || '';
              return `${label}: ${value}`;
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


