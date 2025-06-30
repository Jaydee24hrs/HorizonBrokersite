"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import HeaderBox from "@/components/HeaderBox";

interface WithdrawClientProps {
  user: { email: string };
}

const WithdrawClient = ({ user }: WithdrawClientProps) => {
  const [amount, setAmount] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [balance] = useState(175000);
  const [banks] = useState([
    { id: "bank_001", name: "Chase Bank" },
    { id: "bank_002", name: "Bank of America" },
    { id: "bank_003", name: "Paypal" },
    { id: "bank_004", name: "WellsFargo " },
    { id: "bank_005", name: "Cashapp" },
    { id: "bank_006", name: "Plaid" },
    { id: "bank_007", name: "T-mobile" },
    { id: "bank_008", name: "Truist Bank" },
    { id: "bank_009", name: "Navy Federal Credit Union" },
    { id: "bank_010", name: "United Bank" },
    { id: "bank_011", name: "Southern Bank" },
    { id: "bank_012", name: "ORNL Federal Credit Union" },
    { id: "bank_013", name: "NYMCU Mobile Banking" },
  ]);

  const withdrawalFee = 2.5;
  const estimatedArrival = "1–2 business days";

  const handleSubmit = () => {
    if (!amount || !selectedBank) {
      alert("Kindly fund Account to activate withdrawal.");
      return;
    }

    alert(`$${amount} withdrawal to ${selectedBank} initiated.`);
  };

  return (
    <main className="w-full px-4 py-8 md:px-8 lg:px-16 xl:px-24 max-w-5xl mx-auto">
      <HeaderBox 
        title="Withdraw Funds "
        subtext="See your bank details and transactions."
      />

      <div className="grid grid-cols-1 mt-8 md:grid-cols-2 gap-6">
        {/* Account Summary */}
        <Card className="w-full shadow-sm">
          <CardHeader>
            <CardTitle className="header-2">Account Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            {user ? (
  <p className="total-balance-label">
    <strong>Email:</strong> {user.email}
  </p>
) : (
  <p className="text-red-500"></p>
)}
            <p className="total-balance-label">
              <strong>Balance:</strong> ${balance.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        {/* Withdrawal Details */}
        <Card className="w-full shadow-sm">
          <CardHeader>
            <CardTitle className="header-2">Withdrawal Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Select Bank Account</Label>
              <Select onValueChange={setSelectedBank}>
                <SelectTrigger className="bg-gray-50 border-gray-300">
                  <SelectValue placeholder="Choose a bank" />
                </SelectTrigger>
                <SelectContent className="bg-gray-50">
                  {banks.map((bank) => (
                    <SelectItem key={bank.id} value={bank.id}>
                      {bank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Withdrawal Amount</Label>
              <Input
                type="number"
                placeholder="$0.00"
                min={1}
                max={balance}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="text-sm space-y-1 text-muted-foreground">
              <p className="total-balance-label">
                <strong>Fee:</strong> ${withdrawalFee.toFixed(2)}
              </p>
              <p className="total-balance-label">
                <strong>Arrival:</strong> {estimatedArrival}
              </p>
              <p className="total-balance-label">
                <strong>You will receive:</strong> $
                {Math.max(0, Number(amount) - withdrawalFee).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 w-full flex justify-center">
        <Button
          onClick={handleSubmit}
          className="w-full max-w-md py-4 text-lg font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all duration-200"
        >
          Submit Withdrawal
        </Button>
      </div>
    </main>
  );
};

export default WithdrawClient;
