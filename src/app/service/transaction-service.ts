import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
export class TransactionService {

    constructor(private httpClient: HttpClient) {
       
    }

    addTransaction(expenseRequest: any) : Observable<any> {
        console.log("reached here");
        const res = this.httpClient.post('http://localhost:8080/api/expense-tracker/v1/expenses', expenseRequest);
        console.log("printing res", res);
        return res;
      }

}