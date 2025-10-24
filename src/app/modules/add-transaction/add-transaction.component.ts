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
import { TransactionRequest } from "src/app/model/transaction-request";
import { TransactionService } from "src/app/service/transaction-service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

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
    MatButtonModule,
    MatSnackBarModule]
})
export class AddTransactionComponent {

  transactionForm = new TransactionForm();

  constructor (private dialogRef: MatDialogRef<AddTransactionComponent>, 
    private transactionService: TransactionService,
    private snackBar: MatSnackBar,
    private router: Router) {
  }

  saveTransaction() {
   const transactionRequest = this.transactionForm.getRawValue();

    const request: TransactionRequest = {
      expenseType : transactionRequest.expenseType,
      paidTo: transactionRequest.paidTo,
      amount: transactionRequest.amount,
      category: transactionRequest.category,
      description: transactionRequest.description,
      expenseDate: transactionRequest.expenseDate
    }

     this.transactionService.addTransaction(request).subscribe({
      next:(response) => {
        if(response === null) {
          this.snackBar.open('Transaction added successfully', '', {
            duration: 6000
          });
        }
      },
      error:(err) => {
        this.snackBar.open('Failed to add transaction. Please try again after sometime.', '', {
          duration: 6000
        }); 
      }
    });
    this.dialogRef.close(true);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
