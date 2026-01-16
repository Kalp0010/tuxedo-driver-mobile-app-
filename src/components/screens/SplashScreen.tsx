import React, { useEffect } from 'react';
import { Car } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center animate-fade-in">
      <div className="text-center">
        <div className="mb-8 inline-block p-10 rounded-full glass-strong gold-glow-strong animate-pulse-gold">
          <Car size={96} className="text-[#D4AF37]" strokeWidth={1.5} />
        </div>
        <h1 className="text-6xl mb-3 gold-shimmer bg-clip-text text-transparent font-bold tracking-tight">
          TUXEDO
        </h1>
        <p className="text-[#D4AF37] text-2xl tracking-[0.2em] font-light">DRIVER</p>
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse-gold" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse-gold" style={{ animationDelay: '200ms' }} />
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse-gold" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    </div>
  );
}
