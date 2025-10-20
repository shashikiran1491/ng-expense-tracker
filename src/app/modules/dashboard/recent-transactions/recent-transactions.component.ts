import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';
import { AddTransactionComponent } from "../add-transaction/add-transaction.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  standalone: true,
  styleUrls: ['./recent-transactions.component.scss'],
  imports: [CommonModule, MatIconModule, MatCardModule]
})
export class RecentTransactionsComponent {

  constructor(private dialog: MatDialog){

  }

  recentTransactions : any = [
    { paidTo: 'NetBanking', category: 'Food', date: '2025-10-14', expense: 250, type: 'expense' },
    { paidTo: 'Chicken Shop', category: 'Salary', date: '2025-10-13', expense: 5000, type: 'income' },
    { paidTo: 'SRS Enterprise', category: 'Transport', date: '2025-10-12', expense: 120, type: 'expense' },
  ];

  onAddTransaction() {
    this.dialog.open(AddTransactionComponent, {
      disableClose: true,
      width: '500px',
      panelClass: 'custom-dialog-container'
    });
  }

  onDelete(txn : any) {
    console.log("deleting trnsaction", txn);

  }
}
