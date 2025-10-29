export interface TransactionRequest {
    expenseType: string;
    paidTo: string;
    amount: number;
    category: string;
    description: string;
    expenseDate: string;
}