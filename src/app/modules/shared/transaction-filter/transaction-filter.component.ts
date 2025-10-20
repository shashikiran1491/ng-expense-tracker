import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AddTransactionComponent } from '../../dashboard/add-transaction/add-transaction.component';

@Component({
  selector: 'app-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule
  ]
})
export class TransactionFilterComponent {

  constructor(private dialog: MatDialog){

  }

  category = "All Categories";
  expenseType = "All Types";

  onAddTransaction() {
    this.dialog.open(AddTransactionComponent, {
      disableClose: true,
      width: '500px',
      panelClass: 'custom-dialog-container'
    });
  }
}
