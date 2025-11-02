import { FormControl, FormGroup, Validators } from "@angular/forms";

export class TransactionFilterForm extends FormGroup {

    readonly startDate = new FormControl<Date | null>(null);
    readonly endDate = new FormControl<Date | null>(null);
    readonly category = new FormControl<string>('All Categories');
    readonly type = new FormControl<string>('All Types');


    constructor() {
        super({});
        this.setControl('startDate', this.startDate);
        this.setControl('endDate', this.endDate);
        this.setControl('category', this.category);
        this.setControl('type', this.type);
    }
}