import React, { useState } from 'react';
import { Wifi, Baby, Droplets, Music, Newspaper, ChevronRight, Smartphone, CloudRain, Briefcase, Car } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

interface ProfileSetupScreenProps {
  onComplete: () => void;
}

interface Amenity {
  id: string;
  name: string;
  icon: React.ReactNode;
  enabled: boolean;
}

export function ProfileSetupScreen({ onComplete }: ProfileSetupScreenProps) {
  const [vehicleType, setVehicleType] = useState('limousine');
  const [amenities, setAmenities] = useState<Amenity[]>([
    { id: 'wifi', name: 'WiFi', icon: <Wifi size={28} />, enabled: false },
    { id: 'charger', name: 'Phone Charger', icon: <Smartphone size={28} />, enabled: false },
    { id: 'water', name: 'Bottled Water', icon: <Droplets size={28} />, enabled: false },
    { id: 'music', name: 'Premium Audio', icon: <Music size={28} />, enabled: false },
    { id: 'newspaper', name: 'Newspaper', icon: <Newspaper size={28} />, enabled: false },
    { id: 'umbrella', name: 'Umbrella', icon: <CloudRain size={28} />, enabled: false },
    { id: 'carseat', name: 'Child Seat', icon: <Baby size={28} />, enabled: false },
    { id: 'luggage', name: 'Extra Luggage', icon: <Briefcase size={28} />, enabled: false }
  ]);
  
  const toggleAmenity = (id: string) => {
    setAmenities(items => 
      items.map(item => 
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };
  
  return (
    <div className="min-h-full bg-black p-6 safe-area flex flex-col items-center">
      <div className="w-full max-w-md pt-4 pb-8 animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-3xl text-[#D4AF37] mb-2">Driver Profile</h1>
          <p className="text-gray-400">Set up your vehicle and amenities</p>
        </div>
        
        <GlassCard className="mb-6">
          <h3 className="text-lg text-[#D4AF37] mb-4">Luxury Vehicle Type</h3>
          <div className="space-y-3">
            {[
              { type: 'Limousine', desc: 'Extended luxury sedan' },
              { type: 'Executive Sedan', desc: 'Mercedes S-Class, BMW 7 Series' },
              { type: 'Luxury SUV', desc: 'Range Rover, Cadillac Escalade' },
              { type: 'Luxury Van', desc: 'Mercedes Sprinter, luxury shuttle' },
              { type: 'Exotic Car', desc: 'Sports cars, supercars' }
            ].map((vehicle) => (
              <button
                key={vehicle.type}
                onClick={() => setVehicleType(vehicle.type.toLowerCase())}
                className={`w-full p-4 rounded-xl border-2 transition-all hover-lift min-h-[72px] ${
                  vehicleType === vehicle.type.toLowerCase()
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 gold-glow'
                    : 'border-[#D4AF37]/20 glass-card hover:border-[#D4AF37]/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <div className={`mb-1 ${vehicleType === vehicle.type.toLowerCase() ? 'text-[#D4AF37]' : 'text-white'}`}>
                      {vehicle.type}
                    </div>
                    <div className="text-xs text-gray-400">{vehicle.desc}</div>
                  </div>
                  <ChevronRight size={20} className={vehicleType === vehicle.type.toLowerCase() ? 'text-[#D4AF37]' : 'text-gray-500'} />
                </div>
              </button>
            ))}
          </div>
        </GlassCard>
        
        <GlassCard className="mb-6">
          <h3 className="text-lg text-[#D4AF37] mb-4">Premium Amenities</h3>
          <div className="grid grid-cols-2 gap-3">
            {amenities.map((amenity) => (
              <button
                key={amenity.id}
                onClick={() => toggleAmenity(amenity.id)}
                className={`p-5 rounded-xl border-2 transition-all hover-lift min-h-[110px] flex flex-col items-center justify-center gap-3 ${
                  amenity.enabled
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 gold-glow'
                    : 'border-[#D4AF37]/20 glass-card hover:border-[#D4AF37]/40'
                }`}
              >
                <div className={`relative ${amenity.enabled ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                  {amenity.icon}
                  {amenity.enabled && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#D4AF37] rounded-full border-2 border-black"></div>
                  )}
                </div>
                <span className={`text-sm text-center ${amenity.enabled ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                  {amenity.name}
                </span>
              </button>
            ))}
          </div>
        </GlassCard>
        
        <div className="pb-8">
          <Button onClick={onComplete} className="w-full">
            Complete Setup
          </Button>
        </div>
      </div>
    </div>
  );
}