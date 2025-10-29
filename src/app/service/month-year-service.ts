import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MonthYearService {

    private monthYearSource = new BehaviorSubject<{ month: number; year: number }>({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    });

    monthYear$ = this.monthYearSource.asObservable();

    setMonthYear(month: number, year: number) {
        this.monthYearSource.next({ month, year });
    }

    getCurrentMonthYear() {
        return this.monthYearSource.getValue();
    }

    resetToCurrentMonthYear() {
        const today = new Date();
        this.monthYearSource.next({ month: today.getMonth(), year: today.getFullYear() });
    }
}