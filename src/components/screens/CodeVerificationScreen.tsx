import React, { useState } from 'react';
import { Shield, X, User, Phone, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { useNotification } from '../../contexts/NotificationContext';

interface CodeVerificationScreenProps {
  passengerName: string;
  onVerified: () => void;
  onCancel: () => void;
}

export function CodeVerificationScreen({ passengerName, onVerified, onCancel }: CodeVerificationScreenProps) {
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const correctCode = '1234'; // Demo code
  const { showSuccess, showError } = useNotification();
  
  const handleCodeInput = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(false);
    
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
    
    // Auto-verify when all 4 digits are entered
    if (index === 3 && value) {
      const enteredCode = [...newCode.slice(0, 3), value].join('');
      setTimeout(() => {
        if (enteredCode === correctCode) {
          showSuccess('Code Verified!', 'Passenger identity confirmed');
          setTimeout(() => onVerified(), 500);
        } else {
          setError(true);
          showError('Invalid Code', 'Please check the code and try again');
          setCode(['', '', '', '']);
          document.getElementById('code-0')?.focus();
        }
      }, 300);
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };
  
  const handleAutofill = () => {
    const codeArray = correctCode.split('');
    setCode(codeArray);
    setTimeout(() => onVerified(), 800);
  };
  
  return (
    <div className="min-h-screen bg-black p-6 flex items-center justify-center safe-area">
      <div className="w-full max-w-md pt-8 pb-8 animate-fade-in">
        <div className="text-center mb-8">
          <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center transition-all duration-500 ${
            error ? 'bg-red-500/20 shadow-lg shadow-red-500/30' : 'bg-[#D4AF37]/20 gold-glow'
          }`}>
            <Shield size={48} className={error ? 'text-red-500' : 'text-[#D4AF37]'} />
          </div>
          <h2 className="text-3xl text-[#D4AF37] mb-3 tracking-tight">Verify Pickup Code</h2>
          <p className="text-gray-400">Ask passenger for their 4-digit code</p>
        </div>
        
        {/* Passenger Info */}
        <GlassCard className="mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
              <User size={24} className="text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Picking up</p>
              <p className="text-lg">{passengerName}</p>
            </div>
          </div>
        </GlassCard>
        
        {/* Code Input */}
        <GlassCard className={`mb-6 ${error ? 'border-red-500' : ''}`}>
          <div className="flex justify-center gap-4 mb-4">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeInput(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-16 h-16 text-center text-2xl glass-card rounded-xl outline-none transition-all ${
                  error 
                    ? 'border-2 border-red-500 text-red-500' 
                    : digit 
                    ? 'border-2 border-[#D4AF37] text-[#D4AF37]'
                    : 'border border-[#D4AF37]/30 text-white'
                }`}
                autoFocus={index === 0}
              />
            ))}
          </div>
          
          {error && (
            <p className="text-center text-red-500 text-sm">
              ✗ Incorrect code. Please try again.
            </p>
          )}
          
          {!error && code.every(d => d) && (
            <div className="flex items-center justify-center gap-2 text-green-500">
              <CheckCircle size={20} />
              <span className="text-sm">Code verified!</span>
            </div>
          )}
        </GlassCard>
        
        {/* Help */}
        <GlassCard className="mb-6 bg-[#D4AF37]/5">
          <div className="flex items-start gap-3">
            <Phone size={20} className="text-[#D4AF37] mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-400 mb-1">Can't get the code?</p>
              <p className="text-xs text-gray-500">Call the passenger or verify their identity with their name and photo.</p>
            </div>
          </div>
        </GlassCard>
        
        {/* Demo Helper - Show Code */}
        <GlassCard className="mb-6 border-green-500/30 bg-green-500/5">
          <div className="text-center">
            <p className="text-xs text-gray-400 mb-2">DEMO MODE - Passenger's Code:</p>
            <div className="text-3xl text-[#D4AF37] mb-3 tracking-[0.5em] ml-4">
              {correctCode}
            </div>
            <Button onClick={handleAutofill} variant="outline" size="medium">
              Auto-Fill Code
            </Button>
          </div>
        </GlassCard>
        
        <Button variant="outline" onClick={onCancel}>
          Cancel Pickup
        </Button>
      </div>
    </div>
  );
}