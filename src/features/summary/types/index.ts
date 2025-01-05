export interface SummaryData {
  remainingAmount: number;
  incomeAmount: number;
  expensesAmount: number;
  remainingChange: number;
  incomeChange: number;
  expensesChange: number;
  categories: {
    name: string;
    value: number;
  }[];
  days: {
    date: Date;
    income: number;
    expenses: number;
  }[];
}

export interface SummaryResponse {
  success: boolean;
  message: string;
  data: SummaryData;
}
