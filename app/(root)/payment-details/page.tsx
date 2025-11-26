'use client';

import { useState } from 'react';

export default function PaymentPage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  // Handle Copy Functionality
  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Handle Payment Confirmation (Simulated Error)
  const handleConfirm = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-6 font-sans">
      
      {/* Dynamic Alert Box */}
      <div 
        className={`fixed top-5 right-5 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 transform ${
          showError ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="font-medium">Payment Unsuccessful!</span>
        </div>
      </div>

      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* Header */}
        <div className="bg-white p-6 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">H</div>
               <span className="text-xl font-bold text-gray-800 tracking-tight">Horizon</span>
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-full">Secure Checkout</span>
          </div>

          <div className="text-center py-4">
            <p className="text-gray-500 text-sm mb-1">Total to pay</p>
            <h1 className="text-4xl font-extrabold text-gray-900">$25,000<span className="text-2xl text-gray-400">.00</span></h1>
          </div>
        </div>

        {/* --- QR CODE SECTION (New & Improved) --- */}
        <div className="flex flex-col items-center justify-center pb-6">
          <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm">
            {/* Using a placeholder API for the QR code to ensure it renders without plugins */}
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=bc1qthdppqhn4aq02pwury5mpnx7fmx&color=1e293b" 
              alt="Payment QR Code" 
              className="w-40 h-40 rounded-lg"
            />
          </div>
          <p className="text-xs text-gray-400 mt-2 font-medium tracking-wide uppercase">Scan to Pay</p>
        </div>

        {/* Warning */}
        <div className="px-6 mb-4">
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-3 items-start">
            <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-xs text-amber-800 leading-relaxed">
              Transfer the <span className="font-bold">exact amount</span>. Incorrect transfers may be permanently lost.
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="px-6 pb-6 space-y-4">
          <InfoBlock 
            label="Payment Method" 
            value="Bitcoin (BTC)" 
            icon={<BitcoinIcon />}
          />
          
          <div className="relative">
             <InfoBlock 
              label="Wallet Address" 
              value="bc1qthdppqhn4aq02pwury5mpnx7fmx" 
              field="wallet" 
              onCopy={handleCopy} 
              copied={copiedField === 'wallet'}
              isCopyable={true}
              truncate={true} 
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 pt-2 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-center text-gray-500 mb-4">
            Expires in <span className="font-bold text-gray-700">23:59:12</span>
          </p>
          
          <button
            onClick={handleConfirm}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200"
          >
            Confirm Payment
          </button>

          <button className="w-full mt-3 text-sm text-gray-500 font-medium hover:text-gray-800 py-2 transition-colors">
            Change payment method
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Sub Components ---

type InfoBlockProps = {
  label: string;
  value: string;
  field?: string;
  onCopy?: (value: string, field: string) => void;
  copied?: boolean;
  isCopyable?: boolean;
  truncate?: boolean;
  icon?: React.ReactNode;
};

function InfoBlock({ label, value, field, onCopy, copied, isCopyable, truncate, icon }: InfoBlockProps) {
  
  const formatValue = (str: string) => {
    if (!truncate || str.length <= 20) return str;
    return ${str.slice(0, 10)}...${str.slice(-6)};
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white border border-gray-100 hover:border-blue-100 transition-colors group shadow-sm">
      <div className="flex items-center gap-3 overflow-hidden">
        {icon && <div className="p-2 bg-gray-50 rounded-full text-gray-600 flex-shrink-0">{icon}</div>}
        <div className="min-w-0">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">{label}</p>
          <p 
            className="text-sm font-bold text-gray-800 font-mono tracking-wide truncate" 
            title={value}
          >
            {formatValue(value)}
          </p>
        </div>
      </div>
      
      {isCopyable && onCopy && field && (
        <button
          onClick={() => onCopy(value, field)}
          className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
            copied 
              ? 'bg-green-100 text-green-700' 
              : 'bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white'
          }`}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </button>
      )}
    </div>
  );
}

// --- Icons ---

function CopyIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
}

function CheckIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
}

function BitcoinIcon() {
  return <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24"><path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.344 8.115 8.738 14.545v.002zm-3.961-3.746c.583-3.89-2.22-6.173-6.002-7.614l1.226-4.918-2.992-.746-1.192 4.793c-.785-.198-1.603-.377-2.41-.544l1.198-4.805L6.51 2.58l-1.22 4.908c-.655-.152-1.3-.294-1.928-.426L2 7.74l.43 1.728s1.198.293 1.173.31c.652.163.77.596.75 1.155l-1.054 4.225c.063.016.146.04.237.076l-.24-.06-1.478 5.922c-.112.278-.4.697-1.045.538.026.037-1.176-.293-1.176-.293l-.803 1.85 2.276.568c.854.212 1.688.435 2.502.64l-1.23 4.935 2.99.745 1.224-4.908c.818.223 1.614.417 2.4.588l-1.21 4.88 2.996.746 1.237-4.96c5.105.966 8.95-1.996 8.068-6.994-.718-2.868-2.906-4.226-5.83-4.596 1.272-.756 2.224-2.14 2.47-4.305z"/></svg>
}
