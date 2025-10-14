import { CommonModule } from "@angular/common";
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TransactionForm } from "src/app/forms/transaction-form";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  standalone: true,
  styleUrls: ['./add-transaction.component.scss'],
  imports: [FormsModule,
    MatNativeDateModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule]
})
export class AddTransactionComponent {
  transactionForm = new TransactionForm();

  constructor (private dialogRef: MatDialogRef<AddTransactionComponent>) {
  }

  saveTransaction() {
    console.log("Saving Transaction", this.transactionForm.amount)
  }

  protected readonly oncancel = oncancel;

  onCancel() {
    this.dialogRef.close();
  }
}
