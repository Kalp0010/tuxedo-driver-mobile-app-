import React, { useState } from 'react';
import { DollarSign, CheckCircle } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

interface CashVerificationScreenProps {
  fare: number;
  onComplete: () => void;
}

export function CashVerificationScreen({ fare, onComplete }: CashVerificationScreenProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [enteredAmount, setEnteredAmount] = useState('');
  
  const handleConfirm = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onComplete();
    }
  };
  
  return (
    <div className="min-h-full bg-black p-6 safe-area flex flex-col items-center justify-center">
      <div className="w-full max-w-md pt-8 pb-8">
        {step === 1 ? (
          <div className="animate-fade-in w-full">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                <DollarSign size={40} className="text-[#D4AF37]" />
              </div>
              <h2 className="text-2xl text-[#D4AF37] mb-2">Cash Payment</h2>
              <p className="text-gray-400">Enter the cash amount received</p>
            </div>
            
            <GlassCard className="mb-6">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-400 mb-2">Trip Fare</p>
                <p className="text-4xl text-[#D4AF37]">${fare.toFixed(2)}</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Amount Received</label>
                <div className="flex items-center gap-3 glass-card p-4 border-[#D4AF37]/30 min-h-[64px]">
                  <DollarSign size={24} className="text-[#D4AF37]" />
                  <input 
                    type="number"
                    inputMode="decimal"
                    value={enteredAmount}
                    onChange={(e) => setEnteredAmount(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 bg-transparent outline-none text-white text-2xl placeholder:text-gray-600"
                    autoFocus
                  />
                </div>
              </div>
              
              {parseFloat(enteredAmount) > fare && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <p className="text-sm text-green-400">
                    Change to return: <span className="font-bold">${(parseFloat(enteredAmount) - fare).toFixed(2)}</span>
                  </p>
                </div>
              )}
            </GlassCard>
            
            <Button 
              onClick={handleConfirm}
              disabled={!enteredAmount || parseFloat(enteredAmount) < fare}
              className="w-full"
            >
              Continue
            </Button>
          </div>
        ) : (
          <div className="animate-fade-in w-full">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h2 className="text-2xl text-[#D4AF37] mb-2">Confirm Receipt</h2>
              <p className="text-gray-400">Verify cash payment details</p>
            </div>
            
            <GlassCard className="mb-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-[#D4AF37]/20">
                  <span className="text-gray-400">Trip Fare</span>
                  <span className="text-lg text-white">${fare.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-[#D4AF37]/20">
                  <span className="text-gray-400">Cash Received</span>
                  <span className="text-lg text-green-400">${parseFloat(enteredAmount).toFixed(2)}</span>
                </div>
                
                {parseFloat(enteredAmount) > fare && (
                  <div className="flex items-center justify-between py-3 border-b border-[#D4AF37]/20">
                    <span className="text-gray-400">Change Given</span>
                    <span className="text-lg text-red-400">
                      -${(parseFloat(enteredAmount) - fare).toFixed(2)}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center justify-between py-3 bg-[#D4AF37]/10 -mx-4 px-4 rounded-xl mt-2">
                  <span className="text-[#D4AF37] font-medium">Net Earnings</span>
                  <span className="text-2xl text-[#D4AF37] font-bold">${fare.toFixed(2)}</span>
                </div>
              </div>
            </GlassCard>
            
            <div className="space-y-3">
              <Button onClick={handleConfirm} className="w-full">
                Confirm Cash Received
              </Button>
              <Button 
                variant="outline"
                onClick={() => setStep(1)}
                className="w-full"
              >
                Edit Amount
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}