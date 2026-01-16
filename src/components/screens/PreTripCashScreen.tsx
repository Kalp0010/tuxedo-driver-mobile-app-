import React, { useState } from 'react';
import { DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

interface PreTripCashScreenProps {
  fare: number;
  passengerName: string;
  onCollected: () => void;
  onCancel: () => void;
}

export function PreTripCashScreen({ fare, passengerName, onCollected, onCancel }: PreTripCashScreenProps) {
  const [cashReceived, setCashReceived] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  
  const handleConfirm = () => {
    if (parseFloat(cashReceived) >= fare) {
      setConfirmed(true);
      setTimeout(() => onCollected(), 1000);
    }
  };
  
  return (
    <div className="min-h-full bg-black p-6 safe-area flex flex-col items-center justify-center">
      <div className="w-full max-w-md pt-8 pb-8">
        {!confirmed ? (
          <div className="animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                <DollarSign size={40} className="text-[#D4AF37]" />
              </div>
              <h2 className="text-2xl text-[#D4AF37] mb-2">Collect Cash Payment</h2>
              <p className="text-gray-400">Cash payment required before trip starts</p>
            </div>
            
            <GlassCard className="mb-6 bg-yellow-500/5 border-yellow-500/30">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm text-yellow-500 mb-1">Cash Ride Policy</p>
                  <p className="text-xs text-gray-400">
                    For cash rides, collect the full fare from {passengerName} before starting the trip.
                  </p>
                </div>
              </div>
            </GlassCard>
            
            <GlassCard className="mb-6">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-400 mb-2">Trip Fare</p>
                <p className="text-4xl text-[#D4AF37]">${fare.toFixed(2)}</p>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Cash Amount Received</label>
                <div className="flex items-center gap-3 glass-card p-4 border-[#D4AF37]/30 min-h-[64px]">
                  <DollarSign size={24} className="text-[#D4AF37]" />
                  <input 
                    type="number"
                    inputMode="decimal"
                    value={cashReceived}
                    onChange={(e) => setCashReceived(e.target.value)}
                    placeholder="0.00"
                    className="flex-1 bg-transparent outline-none text-white text-2xl"
                    autoFocus
                  />
                </div>
              </div>
              
              {parseFloat(cashReceived) > fare && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <p className="text-sm text-green-400">
                    Change to return: ${(parseFloat(cashReceived) - fare).toFixed(2)}
                  </p>
                </div>
              )}
              
              {parseFloat(cashReceived) > 0 && parseFloat(cashReceived) < fare && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <p className="text-sm text-red-400">
                    Insufficient payment. Need ${(fare - parseFloat(cashReceived)).toFixed(2)} more
                  </p>
                </div>
              )}
            </GlassCard>
            
            <div className="space-y-3">
              <Button 
                onClick={handleConfirm}
                disabled={!cashReceived || parseFloat(cashReceived) < fare}
                className="w-full"
              >
                Confirm Cash Received
              </Button>
              <Button variant="danger" onClick={onCancel} className="w-full">
                Cancel Ride
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl text-[#D4AF37] mb-2">Payment Confirmed</h2>
            <p className="text-gray-400">Starting trip...</p>
          </div>
        )}
      </div>
    </div>
  );
}