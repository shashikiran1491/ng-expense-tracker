import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TransactionEventService {
    private transactionAddedSource = new Subject<void>();
    transactionAdded$ = this.transactionAddedSource.asObservable();

    notifyTransactionAdded() {
        this.transactionAddedSource.next();
    }
}