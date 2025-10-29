import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { TransactionFilterForm } from 'src/app/forms/transaction-filter-form';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ]
})
export class TransactionFilterComponent {
  @Input() defaultDateRange: { start: Date; end: Date } | null = null;
  @Output() transactionAdded = new EventEmitter<void>();

  @Output() filtersChanged = new EventEmitter<{
    startDate: Date | null;
    endDate: Date | null;
    category: string | null;
    type: string | null;
  }>();

  transactionFilterForm = new TransactionFilterForm();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.transactionFilterForm.valueChanges.pipe(debounceTime(300)).subscribe(values => {
      this.filtersChanged.emit(values);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['defaultDateRange'] && this.defaultDateRange) {
      const { start, end } = this.defaultDateRange;

      this.transactionFilterForm.patchValue({
        startDate: new Date(start),
        endDate: new Date(end)
      }, { emitEvent: false });
    }
  }

  onAddTransaction() {
    const dialogRef = this.dialog.open(AddTransactionComponent, {
      disableClose: true,
      width: '500px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.transactionAdded.emit();
      }
    });
  }
}
