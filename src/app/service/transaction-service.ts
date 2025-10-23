import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
  })
export class TransactionService {

    constructor(private httpClient: HttpClient) {
    }

    addTransaction(expenseRequest: any) : Observable<any> {
        return this.httpClient.post('http://localhost:8080/api/expense-tracker/v1/expenses', expenseRequest);
    }

    loadFinanceSummary(startDate: string, endDate: string) : Observable<any> {
      const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

      return this.httpClient.get('http://localhost:8080/api/expense-tracker/v1/transactions/summary', {params}); 
    }

}