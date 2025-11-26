'use client';

import { useEffect, useState } from 'react';

export default function PaymentPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  useEffect(() => {
    const button = document.getElementById("confirmButton");
    if (button) {
      button.addEventListener("click", () => {
        const alertBox = document.createElement("div");
        alertBox.textContent = "Payment Unsuccessful!";
        Object.assign(alertBox.style, {
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: "#f56565",
          color: "white",
          padding: "10px 20px",
          borderRadius: "0.5rem",
          zIndex: "1000",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
        });
        document.body.appendChild(alertBox);
        setTimeout(() => {
          alertBox.remove();
        }, 5000);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-4 border rounded-xl shadow p-6 sm:p-8">

        {/* QR + Logo Section UPDATED */}
        <div className="flex flex-col items-center gap-3 mt-2">
          <img src="/icons/logo.svg" alt="logo" className="h-10 w-10" />

          {/* BIG centered QR code */}
          <img
            src="/icons/bitcoin.jpg"
            alt="bitcoin-qr"
            className="h-44 w-44 object-contain rounded-md shadow-sm"
          />
        </div>

        <div className="text-sm bg-yellow-100 border-l-4 border-yellow-400 p-3 rounded">
          For a seamless transaction, please transfer the exact amount displayed.
          Payments may be declined if the amount does not match.
        </div>

        <div className="space-y-3">
          <InfoBlock 
            label="Wallet Address" 
            value="bc1qthdppqhn4aq02pwury5mpnx7fmxcqx0ue4c5lf" 
            field="account" 
            onCopy={handleCopy} 
            copied={copiedField === 'account'} 
          />
          <InfoBlock label="Payment Method" value="Bitcoin" />
          <InfoBlock label="Beneficiary" value="Horizon" />
        </div>

        <div className="text-sm bg-gray-100 p-3 rounded">
          This account detail will expire after <span className="font-semibold">24hrs</span> and can only be used for this transaction.
        </div>

        <button
          id="confirmButton"
          className="bg-blue-500 hover:bg-orange-600 text-white w-full py-3 rounded font-semibold"
        >
          Confirm Payment for this Wallet
        </button>

        <div className="text-center mt-2">
          <button className="text-sm text-gray-600 hover:underline">Change payment method</button>
        </div>

      </div>
    </div>
  );
}

type InfoBlockProps = {
  label: string;
  value: string;
  field?: string;
  onCopy?: (value: string, field: string) => void;
  copied?: boolean;
};

function InfoBlock({ label, value, field, onCopy, copied }: InfoBlockProps) {
  return (
    <div className="flex justify-between items-start gap-2">
      <div className="max-w-[70%]">
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-base font-medium break-all">{value}</p>
      </div>

      {onCopy && field && (
        <button
          onClick={() => onCopy(value, field)}
          className="text-sm text-orange-500 hover:underline whitespace-nowrap"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      )}
    </div>
  );
}
