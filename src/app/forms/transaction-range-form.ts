import { FormControl, FormGroup } from "@angular/forms";

export class TransactionRangeForm extends FormGroup {

    readonly month = new FormControl<string>('');
    readonly year = new FormControl<string>('');

    constructor() {
        super({});
        this.setControl('month', this.month);
        this.setControl('year', this.year);
    }
}