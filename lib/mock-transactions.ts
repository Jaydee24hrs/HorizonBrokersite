// lib/mock-transactions.ts

import { faker } from "@faker-js/faker";

// Define the Transaction type (adjust if you have your own type)
export type Transaction = {
  id: string;
  name: string;
  amount: number;
  date: string;
  type: "credit" | "debit";
  paymentChannel: "Card" | "Bank" | "Transfer" | "Mobile";
  category: string;
};

// Categories to randomize
const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Income",
  "Entertainment",
  "Health",
  "Education",
];

// Generate a list of 50 fake transactions
export const mockTransactions: Transaction[] = Array.from({ length: 50 }, () => {
  const isCredit = faker.datatype.boolean();
  const amount = faker.number.float({ min: 10, max: 5000, precision: 0.01 });
  const type = isCredit ? "credit" : "debit";

  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    amount: Number(amount.toFixed(2)),
    date: faker.date.recent({ days: 30 }).toISOString(),
    type,
    paymentChannel: faker.helpers.arrayElement(["Card", "Bank", "Transfer", "Mobile"]),
    category: faker.helpers.arrayElement(categories),
  };
});
