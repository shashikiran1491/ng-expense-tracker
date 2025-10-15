import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  standalone: true,
  styleUrls: ['./recent-transactions.component.scss'],
  imports: [CommonModule, MatIconModule, MatCardModule]
})
export class RecentTransactionsComponent {

  recentTransactions = [
    { paidTo: 'NetBanking', category: 'Food', date: '2025-10-14', expense: 250, type: 'expense' },
    { paidTo: 'Chicken Shop', category: 'Salary', date: '2025-10-13', expense: 5000, type: 'income' },
    { paidTo: 'SRS Enterprise', category: 'Transport', date: '2025-10-12', expense: 120, type: 'expense' },
  ];

  onDelete(txn : any) {
    console.log("deleting trnsaction", txn);

  }
}
