import React, { useState } from 'react';
import { Navigation, User, Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

interface RideFlowScreenProps {
  onComplete: () => void;
  onCancel: () => void;
}

type RideStatus = 'navigate' | 'arrive' | 'start' | 'complete';

export function RideFlowScreen({ onComplete, onCancel }: RideFlowScreenProps) {
  const [status, setStatus] = useState<RideStatus>('navigate');
  
  const rideDetails = {
    passenger: 'Sarah Johnson',
    rating: 4.8,
    phone: '+1 (555) 123-4567',
    pickup: '123 Main Street, Downtown',
    dropoff: '456 Oak Avenue, Uptown',
    distance: '8.5 mi',
    duration: '18 min',
    fare: 24.50
  };
  
  const statusConfig = {
    navigate: {
      title: 'Navigate to Pickup',
      subtitle: 'ETA: 5 minutes',
      action: 'I Have Arrived',
      nextStatus: 'arrive' as RideStatus,
      icon: <Navigation size={48} className="text-[#D4AF37]" />,
      color: 'blue'
    },
    arrive: {
      title: 'Arrived at Pickup',
      subtitle: 'Waiting for passenger',
      action: 'Start Trip',
      nextStatus: 'start' as RideStatus,
      icon: <MapPin size={48} className="text-green-500" />,
      color: 'green'
    },
    start: {
      title: 'Trip in Progress',
      subtitle: 'Navigate to destination',
      action: 'End Trip',
      nextStatus: 'complete' as RideStatus,
      icon: <Clock size={48} className="text-[#D4AF37]" />,
      color: 'gold'
    },
    complete: {
      title: 'Trip Completed',
      subtitle: 'Arrived at destination',
      action: 'Complete & Collect Payment',
      nextStatus: 'complete' as RideStatus,
      icon: <MapPin size={48} className="text-green-500" />,
      color: 'green'
    }
  };
  
  const config = statusConfig[status];
  
  const handleAction = () => {
    if (status === 'complete') {
      onComplete();
    } else {
      setStatus(config.nextStatus);
    }
  };
  
  // Progress indicator
  const getProgress = () => {
    switch(status) {
      case 'navigate': return 25;
      case 'arrive': return 50;
      case 'start': return 75;
      case 'complete': return 100;
    }
  };
  
  return (
    <div className="min-h-screen bg-black flex flex-col safe-area">
      {/* Map Area with Navigation Preview */}
      <div className="flex-1 relative bg-gradient-to-b from-gray-900 to-black">
        {/* Map Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-pulse-gold">
            {config.icon}
            <p className="text-gray-400 mt-4">Navigation Preview</p>
            <p className="text-sm text-gray-500 mt-2">Dark map with gold route overlay</p>
          </div>
        </div>
        
        {/* Top Status Card with Lifecycle Stage */}
        <div className="absolute top-6 left-6 right-6">
          <GlassCard variant="strong" className="border-[#D4AF37]">
            <div className="text-center mb-4">
              <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                status === 'navigate' ? 'bg-blue-500/20' :
                status === 'arrive' ? 'bg-green-500/20' :
                status === 'start' ? 'bg-[#D4AF37]/20' :
                'bg-green-500/20'
              }`}>
                {config.icon}
              </div>
              <h2 className="text-xl text-[#D4AF37] mb-1">{config.title}</h2>
              <p className="text-sm text-gray-400">{config.subtitle}</p>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F4E5A1] transition-all duration-500"
                style={{ width: `${getProgress()}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span className={status === 'navigate' ? 'text-[#D4AF37]' : ''}>Navigate</span>
              <span className={status === 'arrive' ? 'text-[#D4AF37]' : ''}>Arrive</span>
              <span className={status === 'start' ? 'text-[#D4AF37]' : ''}>Start</span>
              <span className={status === 'complete' ? 'text-[#D4AF37]' : ''}>End</span>
            </div>
          </GlassCard>
        </div>
        
        {/* Distance/Duration overlay */}
        {status === 'navigate' && (
          <div className="absolute bottom-6 left-6 right-6">
            <GlassCard className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation size={20} className="text-[#D4AF37]" />
                <span className="text-sm">5 min away</span>
              </div>
              <span className="text-sm text-gray-400">1.2 mi</span>
            </GlassCard>
          </div>
        )}
        
        {status === 'start' && (
          <div className="absolute bottom-6 left-6 right-6">
            <GlassCard className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-[#D4AF37]" />
                <span className="text-sm">{rideDetails.duration} remaining</span>
              </div>
              <span className="text-sm text-gray-400">{rideDetails.distance}</span>
            </GlassCard>
          </div>
        )}
      </div>
      
      {/* Bottom Sheet - Ride Details */}
      <div className="glass-strong rounded-t-3xl p-6 border-t-2 border-[#D4AF37] safe-bottom">
        <div className="max-w-md mx-auto">
          {/* Passenger Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
              <User size={32} className="text-[#D4AF37]" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg mb-1 truncate">{rideDetails.passenger}</h3>
              <div className="flex items-center gap-1">
                <span className="text-[#D4AF37]">★</span>
                <span className="text-sm text-gray-400">{rideDetails.rating}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button className="p-3 glass-card rounded-xl text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center">
                <Phone size={20} />
              </button>
              <button className="p-3 glass-card rounded-xl text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center">
                <MessageCircle size={20} />
              </button>
            </div>
          </div>
          
          {/* Locations */}
          <GlassCard className="mb-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-400">Pickup</p>
                  <p className="text-sm">{rideDetails.pickup}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-400">Dropoff</p>
                  <p className="text-sm">{rideDetails.dropoff}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-[#D4AF37]/20">
                <span className="text-sm text-gray-400">{rideDetails.distance} • {rideDetails.duration}</span>
                <span className="text-lg text-[#D4AF37]">${rideDetails.fare}</span>
              </div>
            </div>
          </GlassCard>
          
          {/* Actions */}
          <div className="space-y-3">
            <Button onClick={handleAction}>
              {config.action}
            </Button>
            
            {status !== 'complete' && (
              <Button variant="danger" onClick={onCancel}>
                Cancel Ride
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}