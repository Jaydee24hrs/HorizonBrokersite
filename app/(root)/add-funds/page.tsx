import React  from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Link from "next/link";

const AddFundsPage = async () => {
  const user = await getLoggedInUser();
  
  return (
    <div className="min-h-screen bg-[#f9f9fb] flex flex-col items-center px-4 py-8 sm:px-8">
      <div className="w-full max-w-md">
        <header className="flex items-center mb-6">
          <Link href="/">
           <ArrowLeft className="mr-3 cursor-pointer" />
          </Link>
          <h1 className="text-xl font-semibold"> {user?.firstName || "Your"} Balance</h1>
        </header>

        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="text-sm text-gray-500">
            {user?.firstName || "Your"} balance
          </div>
          <div className="text-3xl font-bold mt-1 mb-4">$175,000</div>
          <Link href="/payment-details">
          <Button  
           
            className="w-full text-white py-6 text-base font-semibold rounded-[3rem] bg-[#0070ba] hover:bg-[#005ea6]"
          >

            Add Money
          </Button>
          </Link>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm mb-6 flex items-center gap-3">
          <RefreshCw className="text-[#0070ba]" />
          <span className="text-sm font-medium text-[#0070ba]">Reload</span>
        </div>

        <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-200 overflow-hidden">
          {[
            { title: "Transfer money", subtitle: "From your balance" },
            { title: "Set up Direct Deposit", subtitle: "Get paid up to 2 days early" },
            { title: "Add cash", subtitle: "At a store" },
          ].map((option, index) => (
            <div key={index} className="px-4 py-5 hover:bg-gray-50 cursor-pointer">
              <h3 className="text-sm font-medium text-white-900">{option.title}</h3>
              <p className="text-sm text-gray-500">{option.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddFundsPage;
