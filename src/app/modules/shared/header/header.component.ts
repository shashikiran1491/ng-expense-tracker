import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionComponent } from "../../dashboard/add-transaction/add-transaction.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private dialog: MatDialog) {}

  onAddTransaction() {
    this.dialog.open(AddTransactionComponent, {
      disableClose: true,
      width: '500px',
      panelClass: 'custom-dialog-container'
    });
  }
}
