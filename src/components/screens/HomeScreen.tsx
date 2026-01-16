import React, { useState } from 'react';
import { Menu, DollarSign, User, MapPin, Clock, TrendingUp, Star } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { useNotification } from '../../contexts/NotificationContext';

interface HomeScreenProps {
  isOnline: boolean;
  onToggleOnline: () => void;
  onNavigate: (destination: string) => void;
  onManualRide: () => void;
}

export function HomeScreen({ isOnline, onToggleOnline, onNavigate, onManualRide }: HomeScreenProps) {
  const [showMenu, setShowMenu] = useState(false);
  const { showSuccess, showInfo } = useNotification();
  
  const handleToggleOnline = () => {
    onToggleOnline();
    if (!isOnline) {
      showSuccess('You are now Online', 'Ready to accept ride requests');
    } else {
      showInfo('You are now Offline', 'You won\'t receive ride requests');
    }
  };
  
  const todayStats = {
    earnings: 245.50,
    trips: 12,
    hours: 6.5,
    rating: 4.9
  };
  
  return (
    <div className="min-h-full bg-black p-6 safe-area flex flex-col items-center">
      {/* Menu Overlay */}
      {showMenu && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm p-6 flex items-start justify-end animate-fade-in" onClick={() => setShowMenu(false)}>
          <div className="glass-strong border-2 border-[#D4AF37] rounded-2xl p-6 w-full max-w-xs mt-16 mr-2 animate-slide-down shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl text-[#D4AF37] mb-6 tracking-tight">Menu</h3>
            <div className="space-y-3">
              <button onClick={() => { onNavigate('editProfile'); setShowMenu(false); }} className="w-full text-left p-4 glass-card rounded-xl hover:border-[#D4AF37]/50 transition-all duration-300 hover-lift">
                <div className="flex items-center gap-3">
                  <User size={20} className="text-[#D4AF37]" />
                  <span>Edit Profile</span>
                </div>
              </button>
              <button onClick={() => { onNavigate('earnings'); setShowMenu(false); }} className="w-full text-left p-4 glass-card rounded-xl hover:border-[#D4AF37]/50 transition-all duration-300 hover-lift">
                <div className="flex items-center gap-3">
                  <DollarSign size={20} className="text-[#D4AF37]" />
                  <span>Earnings</span>
                </div>
              </button>
              <button onClick={() => { onManualRide(); setShowMenu(false); }} className="w-full text-left p-4 glass-card rounded-xl hover:border-[#D4AF37]/50 transition-all duration-300 hover-lift">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-[#D4AF37]" />
                  <span>Manual Ride</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="w-full max-w-md pt-4 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl text-[#D4AF37]">Welcome Back</h1>
            <p className="text-gray-400">John Driver</p>
          </div>
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-3 glass-card rounded-xl text-[#D4AF37] min-w-[48px] min-h-[48px] flex items-center justify-center"
          >
            <Menu size={24} />
          </button>
        </div>
        
        {/* Online/Offline Toggle */}
        <GlassCard 
          className={`mb-6 text-center w-full ${isOnline ? 'gold-glow border-[#D4AF37]' : ''}`}
          variant="strong"
        >
          <div className="mb-4">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-3 ${
              isOnline ? 'bg-[#D4AF37] gold-glow' : 'bg-gray-700'
            }`}>
              <div className={`w-4 h-4 rounded-full ${isOnline ? 'bg-black' : 'bg-gray-500'}`} />
            </div>
            <h2 className={`text-2xl mb-2 ${isOnline ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
              {isOnline ? 'You\'re Online' : 'You\'re Offline'}
            </h2>
            <p className="text-sm text-gray-400">
              {isOnline ? 'Ready to accept rides' : 'Go online to start earning'}
            </p>
          </div>
          
          <button
            onClick={handleToggleOnline}
            className={`w-full py-4 rounded-xl text-lg transition-all min-h-[56px] ${
              isOnline
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gradient-to-r from-[#D4AF37] to-[#F4E5A1] text-black shadow-lg shadow-[#D4AF37]/30'
            }`}
          >
            {isOnline ? 'Go Offline' : 'Go Online'}
          </button>
        </GlassCard>
        
        {/* Today's Stats */}
        <div className="mb-6 w-full">
          <h3 className="text-lg text-[#D4AF37] mb-4">Today's Performance</h3>
          <div className="grid grid-cols-2 gap-4">
            <GlassCard 
              onClick={() => onNavigate('earnings')}
              className="cursor-pointer hover:border-[#D4AF37] transition-colors min-h-[100px] flex flex-col justify-center"
            >
              <DollarSign size={24} className="text-[#D4AF37] mb-2" />
              <p className="text-2xl mb-1">${todayStats.earnings}</p>
              <p className="text-sm text-gray-400">Earnings</p>
            </GlassCard>
            
            <GlassCard className="min-h-[100px] flex flex-col justify-center">
              <Clock size={24} className="text-[#D4AF37] mb-2" />
              <p className="text-2xl mb-1">{todayStats.hours}h</p>
              <p className="text-sm text-gray-400">Online Time</p>
            </GlassCard>
            
            <GlassCard className="min-h-[100px] flex flex-col justify-center">
              <TrendingUp size={24} className="text-[#D4AF37] mb-2" />
              <p className="text-2xl mb-1">{todayStats.trips}</p>
              <p className="text-sm text-gray-400">Trips</p>
            </GlassCard>
            
            <GlassCard className="min-h-[100px] flex flex-col justify-center">
              <Star size={24} className="text-[#D4AF37] mb-2" />
              <p className="text-2xl mb-1">{todayStats.rating}</p>
              <p className="text-sm text-gray-400">Rating</p>
            </GlassCard>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="pb-8 w-full">
          <h3 className="text-lg text-[#D4AF37] mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <GlassCard 
              onClick={() => onNavigate('earnings')}
              className="cursor-pointer hover:border-[#D4AF37] transition-colors min-h-[60px]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <DollarSign size={24} className="text-[#D4AF37]" />
                  <span>View Earnings</span>
                </div>
                <span className="text-[#D4AF37]">→</span>
              </div>
            </GlassCard>
            
            <GlassCard 
              onClick={() => onNavigate('editProfile')}
              className="cursor-pointer hover:border-[#D4AF37] transition-colors min-h-[60px]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User size={24} className="text-[#D4AF37]" />
                  <span>Edit Profile</span>
                </div>
                <span className="text-[#D4AF37]">→</span>
              </div>
            </GlassCard>
            
            <GlassCard 
              onClick={onManualRide}
              className="cursor-pointer hover:border-[#D4AF37] transition-colors min-h-[60px]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin size={24} className="text-[#D4AF37]" />
                  <span>Manual Ride</span>
                </div>
                <span className="text-[#D4AF37]">→</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}