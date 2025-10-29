export interface TransactionResponse {
    id: number;
    expenseType: string;
    paidTo: string;
    amount: number;
    category: string;
    description: string;
    expenseDate: string;
}