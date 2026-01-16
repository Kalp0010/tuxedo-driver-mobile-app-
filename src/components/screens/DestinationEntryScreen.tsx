import React, { useState } from 'react';
import { MapPin, DollarSign, Clock, Navigation, Search } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

interface DestinationEntryScreenProps {
  onStartManualRide: (destination: string, fare: number) => void;
  onCancel: () => void;
}

export function DestinationEntryScreen({ onStartManualRide, onCancel }: DestinationEntryScreenProps) {
  const [destination, setDestination] = useState('');
  const [showQuote, setShowQuote] = useState(false);
  const [cashReceived, setCashReceived] = useState('');
  
  // Mock pricing calculation
  const quote = {
    distance: '8.5 mi',
    duration: '18 min',
    baseFare: 5.00,
    perMile: 2.50,
    total: 26.25
  };
  
  const handleGetQuote = () => {
    if (destination.trim()) {
      setShowQuote(true);
    }
  };
  
  const handleStartRide = () => {
    if (parseFloat(cashReceived) >= quote.total) {
      onStartManualRide(destination, quote.total);
    }
  };
  
  return (
    <div className="min-h-screen bg-black p-6 safe-area">
      <div className="max-w-md mx-auto pt-4 pb-8">
        <div className="mb-8">
          <h1 className="text-3xl text-[#D4AF37] mb-2">Manual Ride Entry</h1>
          <p className="text-gray-400">For passengers without phone/app</p>
        </div>
        
        {!showQuote ? (
          <div className="animate-fade-in">
            {/* Current Location */}
            <GlassCard className="mb-6">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-gray-400 mb-1">Pickup (Current Location)</p>
                  <p className="text-sm">123 Main Street, Downtown</p>
                </div>
              </div>
            </GlassCard>
            
            {/* Destination Input */}
            <GlassCard className="mb-6">
              <label className="block text-sm text-gray-400 mb-3">
                Where is the passenger going?
              </label>
              <div className="flex items-center gap-3 glass-card p-4 border-[#D4AF37]/30 min-h-[56px] mb-4">
                <MapPin size={20} className="text-[#D4AF37]" />
                <input 
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination address"
                  className="flex-1 bg-transparent outline-none text-white"
                  autoFocus
                />
              </div>
              
              {/* Suggested Destinations */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500 mb-2">Recent destinations:</p>
                {['456 Oak Avenue, Uptown', 'City Airport Terminal 2', '789 Park Plaza'].map((addr, i) => (
                  <button
                    key={i}
                    onClick={() => setDestination(addr)}
                    className="w-full text-left p-3 glass-card rounded-xl hover:border-[#D4AF37]/50 transition-colors text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-500" />
                      <span>{addr}</span>
                    </div>
                  </button>
                ))}
              </div>
            </GlassCard>
            
            <div className="space-y-3">
              <Button 
                onClick={handleGetQuote}
                disabled={!destination.trim()}
                icon={<Search />}
              >
                Get Pricing Quote
              </Button>
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* Route Summary */}
            <GlassCard className="mb-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">Pickup</p>
                    <p className="text-sm">123 Main Street, Downtown</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">Dropoff</p>
                    <p className="text-sm">{destination}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 pt-3 border-t border-[#D4AF37]/20">
                  <div className="flex items-center gap-2">
                    <Navigation size={16} className="text-[#D4AF37]" />
                    <span className="text-sm text-gray-400">{quote.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[#D4AF37]" />
                    <span className="text-sm text-gray-400">{quote.duration}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
            
            {/* Pricing Breakdown */}
            <GlassCard className="mb-6 border-[#D4AF37]">
              <h3 className="text-lg text-[#D4AF37] mb-4">Pricing Quote</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-400">Base Fare</span>
                  <span className="text-sm">${quote.baseFare.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-400">Distance ({quote.distance})</span>
                  <span className="text-sm">${(parseFloat(quote.distance) * quote.perMile).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-t border-[#D4AF37]/30">
                  <span className="text-lg text-[#D4AF37]">Total Fare</span>
                  <span className="text-2xl text-[#D4AF37]">${quote.total.toFixed(2)}</span>
                </div>
              </div>
            </GlassCard>
            
            {/* Cash Collection */}
            <GlassCard className="mb-6">
              <h3 className="text-lg text-[#D4AF37] mb-4">Collect Cash Payment</h3>
              <label className="block text-sm text-gray-400 mb-3">
                Cash received from passenger
              </label>
              <div className="flex items-center gap-3 glass-card p-4 border-[#D4AF37]/30 min-h-[64px]">
                <DollarSign size={24} className="text-[#D4AF37]" />
                <input 
                  type="number"
                  inputMode="decimal"
                  value={cashReceived}
                  onChange={(e) => setCashReceived(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 bg-transparent outline-none text-white text-2xl"
                />
              </div>
              
              {parseFloat(cashReceived) > quote.total && (
                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                  <p className="text-sm text-green-400">
                    Change to return: ${(parseFloat(cashReceived) - quote.total).toFixed(2)}
                  </p>
                </div>
              )}
              
              {parseFloat(cashReceived) > 0 && parseFloat(cashReceived) < quote.total && (
                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                  <p className="text-sm text-red-400">
                    Insufficient payment. Need ${(quote.total - parseFloat(cashReceived)).toFixed(2)} more
                  </p>
                </div>
              )}
            </GlassCard>
            
            <div className="space-y-3">
              <Button 
                onClick={handleStartRide}
                disabled={!cashReceived || parseFloat(cashReceived) < quote.total}
              >
                Confirm & Start Ride
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowQuote(false)}
              >
                Change Destination
              </Button>
            </div>
          </div>  
        )}
      </div>
    </div>
  );
}
