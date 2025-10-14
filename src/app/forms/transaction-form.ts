import {FormControl, FormGroup, Validators} from "@angular/forms";

export class TransactionForm extends FormGroup {

  readonly expenseType = new FormControl<string>('Expense');
  readonly amount = new FormControl<number>(0, [Validators.required, Validators.min(0.01), Validators.pattern(/^\d{1,7}(\.\d{1,2})?$/)])
  readonly category = new FormControl<string>('other',Validators.required);
  readonly description = new FormControl<string>('');
  readonly expenseDate = new FormControl<string>(new Date().toISOString(), Validators.required);

  constructor() {
    super({});
    this.setControl('expenseType', this.expenseType);
    this.setControl('amount', this.amount);
    this.setControl('category', this.category);
    this.setControl('description', this.description);
    this.setControl('expenseDate', this.expenseDate);
  }
}
