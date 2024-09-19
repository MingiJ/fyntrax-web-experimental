export interface ITransaction {
  _id: string;
  title: string;
  description?: string;
  amount: number;
  type: ITransactionType;
  category?: {
    name: string;
    slug: string;
    _id: string;
  };
  user: string;
  imgs?: string[];
  costs?: ICost[];
  account?: string;
  currency: string;
  date: Date;
  cost?: number;
  grandTotal?: number;
}

export type ITransactionType = "income" | "expense" | "adjustment";

interface ICost {
  title: string;
  amount: number;
}

export interface IAccount {
  _id: string;
  user: any;
  name: string;
  description?: string;
  number?: string;
  provider?: string;
  currency: string;
  type?: string;
  balance: number;
  collaborators: string[];
}

export interface IBudget {
  _id: string;
  name: string;
  totalAmount: string;
  user: any;
}
