import { HighestCategory } from "./highest-category";

export interface ExpenseInsights {
    averageDailySpending : number;
    projectedMonthlyTotal : number;
    noOfDaysRemaining : number;
    highestCategory : HighestCategory;
}