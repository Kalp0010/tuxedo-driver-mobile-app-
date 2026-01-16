import React, { useState } from 'react';
import { Phone, Lock, ArrowRight } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { useNotification } from '../../contexts/NotificationContext';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const correctOtp = '123456'; // Demo OTP code
  const { showSuccess, showInfo } = useNotification();
  
  const handlePhoneSubmit = () => {
    if (phone.length === 10) {
      setStep('otp');
      showSuccess('OTP Sent', `Verification code sent to ${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`);
    }
  };
  
  const handleOtpInput = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
    
    // Auto-submit when all digits are entered
    if (index === 5 && value) {
      setTimeout(() => onLogin(), 500);
    }
  };
  
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };
  
  const handleAutofillOtp = () => {
    const otpArray = correctOtp.split('');
    setOtp(otpArray);
    setTimeout(() => onLogin(), 800);
  };
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 safe-area">
      <div className="w-full max-w-md animate-fade-in">
        <div className="mb-12 text-center">
          <h1 className="text-5xl mb-2 bg-gradient-to-r from-[#D4AF37] to-[#F7E29F] bg-clip-text text-transparent font-bold tracking-tight">
            TUXEDO
          </h1>
          <p className="text-[#D4AF37] text-xl tracking-wide">Driver Login</p>
        </div>
        
        <GlassCard variant="strong" className="space-y-6 mb-6">
          {step === 'phone' ? (
            <>
              <div>
                <label className="block text-sm text-gray-400 mb-3">Phone Number</label>
                <div className="flex items-center gap-3 glass-card p-4 border-[#D4AF37]/30 min-h-[56px]">
                  <Phone size={20} className="text-[#D4AF37]" />
                  <input 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="(555) 000-0000"
                    className="flex-1 bg-transparent outline-none text-white"
                    autoFocus
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Enter any 10-digit number for demo</p>
              </div>
              
              {/* Quick Demo Numbers */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setPhone('5551234567')}
                  className="glass-card p-2 text-xs text-[#D4AF37] rounded-lg hover:border-[#D4AF37]/50 transition-all min-h-[44px]"
                >
                  555-123-4567
                </button>
                <button
                  onClick={() => setPhone('5559876543')}
                  className="glass-card p-2 text-xs text-[#D4AF37] rounded-lg hover:border-[#D4AF37]/50 transition-all min-h-[44px]"
                >
                  555-987-6543
                </button>
                <button
                  onClick={() => setPhone('5555555555')}
                  className="glass-card p-2 text-xs text-[#D4AF37] rounded-lg hover:border-[#D4AF37]/50 transition-all min-h-[44px]"
                >
                  555-555-5555
                </button>
              </div>
              
              <button className="text-[#D4AF37] text-sm hover:text-[#F7E29F] transition-colors min-h-[44px] flex items-center">
                Forgot Password?
              </button>
            </>
          ) : (
            <div>
              <label className="block text-sm text-gray-400 mb-4 text-center">Enter 6-digit code</label>
              <div className="flex justify-center gap-3 mb-4">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleOtpInput(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl glass-card rounded-xl outline-none transition-all border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:border-2"
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              <button 
                onClick={() => setStep('phone')} 
                className="text-[#D4AF37] text-sm hover:text-[#F7E29F] transition-colors min-h-[44px] w-full text-center"
              >
                Change Phone Number
              </button>
            </div>
          )}
        </GlassCard>
        
        {/* Demo Helper - Show OTP when in OTP step */}
        {step === 'otp' && (
          <GlassCard variant="subtle" className="mb-6 border-green-500/30 bg-green-500/5 animate-fade-in">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-2">DEMO MODE - Your OTP Code:</p>
              <div className="text-3xl text-[#D4AF37] mb-3 tracking-[0.5em] ml-4">
                {correctOtp}
              </div>
              <Button onClick={handleAutofillOtp} variant="outline" size="medium">
                Auto-Fill OTP
              </Button>
            </div>
          </GlassCard>
        )}
        
        <div className="space-y-4">
          <Button 
            onClick={step === 'phone' ? handlePhoneSubmit : onLogin}
            disabled={step === 'phone' ? phone.length !== 10 : false}
            icon={step === 'phone' ? <ArrowRight /> : <Lock />}
          >
            {step === 'phone' ? 'Send Code' : 'Verify & Sign In'}
          </Button>
          <button className="w-full text-center text-gray-400 text-sm min-h-[44px] hover:text-gray-300 transition-colors">
            New driver? <span className="text-[#D4AF37]">Apply Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}