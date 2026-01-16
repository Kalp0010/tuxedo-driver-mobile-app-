import React from 'react';
import { 
  LogIn, 
  Shield, 
  User, 
  Home, 
  Navigation, 
  DollarSign, 
  Star, 
  TrendingUp,
  CheckCircle,
  MapPin,
  Clock,
  Wifi
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface FeatureOverviewScreenProps {
  onStart: () => void;
}

export function FeatureOverviewScreen({ onStart }: FeatureOverviewScreenProps) {
  const features = [
    {
      icon: <LogIn size={32} className="text-[#D4AF37]" />,
      title: 'Login & Onboarding',
      description: 'Secure phone-based authentication'
    },
    {
      icon: <Shield size={32} className="text-[#D4AF37]" />,
      title: 'KYC Verification',
      description: 'Upload license, insurance, registration'
    },
    {
      icon: <User size={32} className="text-[#D4AF37]" />,
      title: 'Driver Profile Setup',
      description: 'Vehicle type & amenities (WiFi, car seat, etc.)'
    },
    {
      icon: <Home size={32} className="text-[#D4AF37]" />,
      title: 'Home Dashboard',
      description: 'Online/offline toggle with gold glow'
    },
    {
      icon: <CheckCircle size={32} className="text-green-500" />,
      title: 'Ride Request Popup',
      description: 'Accept / Reject / Counter-offer (Card/Cash)'
    },
    {
      icon: <Shield size={32} className="text-blue-400" />,
      title: 'Code Verification',
      description: 'Mandatory 4-digit code before pickup'
    },
    {
      icon: <DollarSign size={32} className="text-green-400" />,
      title: 'Pre-Trip Cash Collection',
      description: 'Collect cash upfront for cash rides'
    },
    {
      icon: <Navigation size={32} className="text-[#D4AF37]" />,
      title: 'Ride Lifecycle',
      description: 'Navigate → Arrive → Start → End Trip'
    },
    {
      icon: <MapPin size={32} className="text-[#D4AF37]" />,
      title: 'Manual Ride Entry',
      description: 'For passengers without phone/app'
    },
    {
      icon: <DollarSign size={32} className="text-[#D4AF37]" />,
      title: 'Post-Trip Cash Verification',
      description: '2-step payment verification (Card rides)'
    },
    {
      icon: <Star size={32} className="text-[#D4AF37]" />,
      title: 'Passenger Rating',
      description: '5-star rating with preset note templates'
    },
    {
      icon: <TrendingUp size={32} className="text-[#D4AF37]" />,
      title: 'Earnings Dashboard',
      description: 'Daily, weekly, monthly, yearly analytics'
    }
  ];

  return (
    <div className="min-h-screen bg-black p-6 safe-area">
      <div className="max-w-2xl mx-auto pt-8 pb-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-[#D4AF37] to-[#F4E5A1] bg-clip-text text-transparent">
            TUXEDO DRIVER
          </h1>
          <p className="text-xl text-gray-400 mb-2">Premium Chauffeur Platform</p>
          <p className="text-sm text-gray-500">Black-White-Gold Glassmorphism Design</p>
        </div>

        {/* Design System Preview */}
        <GlassCard variant="strong" className="mb-8 border-[#D4AF37]">
          <h3 className="text-xl text-[#D4AF37] mb-4">Design System</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Dark Theme</span>
              <div className="w-8 h-8 rounded bg-black border border-[#D4AF37]/30" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Gold Accent</span>
              <div className="w-8 h-8 rounded bg-[#D4AF37]" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Glassmorphism</span>
              <div className="w-8 h-8 rounded glass-card border border-[#D4AF37]/30" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Gold Glow (Online)</span>
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] gold-glow" />
            </div>
          </div>
        </GlassCard>

        {/* Features Grid */}
        <div className="mb-8">
          <h3 className="text-2xl text-[#D4AF37] mb-6">Complete Feature Set</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <GlassCard key={index} className="hover:border-[#D4AF37] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="p-3 glass-card rounded-xl flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Key Highlights */}
        <GlassCard className="mb-8">
          <h3 className="text-xl text-[#D4AF37] mb-4">iPhone Optimized</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm">Safe Area Support (Notch & Home Indicator)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm">44pt Minimum Touch Targets (iOS HIG)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm">Momentum Scrolling & No Zoom on Input</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm">Glassmorphism with Backdrop Blur</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-sm">Smooth Animations & Transitions</p>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* CTA */}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F4E5A1] text-black text-lg shadow-lg shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/50 transition-all min-h-[56px]"
        >
          Start Demo
        </button>
        
        <p className="text-center text-sm text-gray-500 mt-4">
          Click the ⚡ button (top-right) to jump between screens
        </p>
      </div>
    </div>
  );
}