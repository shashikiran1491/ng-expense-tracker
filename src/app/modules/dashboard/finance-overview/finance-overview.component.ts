import { Component } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-finance-overview',
  templateUrl: './finance-overview.component.html',
  standalone: true,
  styleUrls: ['./finance-overview.component.scss'],
  imports: [MatIconModule]
})
export class FinanceOverviewComponent {

  showTransactions() {
    console.log("Showing all Transactions")
  }
}
