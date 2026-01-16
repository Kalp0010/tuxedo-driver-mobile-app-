import React, { useState, useEffect } from 'react';
import { NotificationProvider } from './contexts/NotificationContext';
import { SplashScreen } from './components/screens/SplashScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { KYCUploadScreen } from './components/screens/KYCUploadScreen';
import { ProfileSetupScreen } from './components/screens/ProfileSetupScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { RideRequestModal } from './components/modals/RideRequestModal';
import { CodeVerificationScreen } from './components/screens/CodeVerificationScreen';
import { PreTripCashScreen } from './components/screens/PreTripCashScreen';
import { RideFlowScreen } from './components/screens/RideFlowScreen';
import { CashVerificationScreen } from './components/screens/CashVerificationScreen';
import { RatingScreen } from './components/screens/RatingScreen';
import { EarningsScreen } from './components/screens/EarningsScreen';
import { DestinationEntryScreen } from './components/screens/DestinationEntryScreen';
import { EditProfileScreen } from './components/screens/EditProfileScreen';

type Screen = 
  | 'splash' 
  | 'login' 
  | 'kyc' 
  | 'profile' 
  | 'home' 
  | 'codeVerify'
  | 'preTripCash'
  | 'ride' 
  | 'cash' 
  | 'rating'
  | 'earnings'
  | 'manualRide'
  | 'editProfile';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [isOnline, setIsOnline] = useState(false);
  const [showRideRequest, setShowRideRequest] = useState(false);
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [paymentType, setPaymentType] = useState<'card' | 'cash'>('card');
  const [manualRideDestination, setManualRideDestination] = useState('');
  const [manualRideFare, setManualRideFare] = useState(0);
  
  // Simulate incoming ride request when online
  useEffect(() => {
    if (isOnline && currentScreen === 'home') {
      const timer = setTimeout(() => {
        setShowRideRequest(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isOnline, currentScreen]);
  
  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
  };
  
  const handleAcceptRide = (payment: 'card' | 'cash') => {
    setShowRideRequest(false);
    setPaymentType(payment);
    setCurrentScreen('codeVerify');
  };
  
  const handleRejectRide = () => {
    setShowRideRequest(false);
  };
  
  const handleCounterOffer = () => {
    setShowRideRequest(false);
    alert('Counter offer sent to passenger!');
  };
  
  const handleCodeVerified = () => {
    if (paymentType === 'cash') {
      setCurrentScreen('preTripCash');
    } else {
      setCurrentScreen('ride');
    }
  };
  
  const handlePreTripCashCollected = () => {
    setCurrentScreen('ride');
  };
  
  const handleCompleteRide = () => {
    if (paymentType === 'cash') {
      setCurrentScreen('rating');
    } else {
      setCurrentScreen('cash');
    }
  };
  
  const handleCashVerified = () => {
    setCurrentScreen('rating');
  };
  
  const handleRatingComplete = () => {
    setCurrentScreen('home');
    setIsOnline(false);
  };
  
  const handleCancelRide = () => {
    setCurrentScreen('home');
  };
  
  const handleNavigate = (destination: string) => {
    if (destination === 'earnings') {
      setCurrentScreen('earnings');
    } else if (destination === 'profile') {
      setCurrentScreen('profile');
    } else if (destination === 'editProfile') {
      setCurrentScreen('editProfile');
    }
  };
  
  const handleManualRide = () => {
    setCurrentScreen('manualRide');
  };
  
  const handleStartManualRide = (destination: string, fare: number) => {
    setManualRideDestination(destination);
    setManualRideFare(fare);
    setPaymentType('cash'); // Manual rides are always cash
    setCurrentScreen('ride');
  };
  
  // Demo quick navigation
  const jumpToScreen = (screen: Screen) => {
    setCurrentScreen(screen);
    setShowDemoMenu(false);
    if (screen === 'home') setIsOnline(false);
  };
  
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center font-sans p-4 sm:p-0">
      {/* Mobile App Container - Border Removed */}
      <div className="w-full max-w-md bg-black min-h-[800px] h-[95vh] sm:h-screen relative shadow-2xl overflow-hidden rounded-3xl sm:rounded-none flex flex-col">
        
        {/* Demo Menu Button */}
        {currentScreen !== 'splash' && (
          <button
            onClick={() => setShowDemoMenu(!showDemoMenu)}
            className="absolute top-4 right-4 z-[9999] w-12 h-12 rounded-full glass-strong border-2 border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] hover:border-[#D4AF37] transition-all safe-top"
          >
            ⚡
          </button>
        )}
        
        {/* Demo Menu Overlay */}
        {showDemoMenu && (
          <div className="absolute inset-0 z-[9999] bg-black/80 backdrop-blur-sm p-6 flex items-center justify-center" onClick={() => setShowDemoMenu(false)}>
            <div className="glass-strong border-2 border-[#D4AF37] rounded-2xl p-6 w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl text-[#D4AF37] mb-4">Quick Navigation</h3>
              <div className="space-y-2">
                <button onClick={() => jumpToScreen('login')} className="w-full text-left p-3 glass-card rounded-xl hover:border-[#D4AF37] text-white transition-colors">
                  1. Login Screen
                </button>
                <button onClick={() => jumpToScreen('kyc')} className="w-full text-left p-3 glass-card rounded-xl hover:border-[#D4AF37] text-white transition-colors">
                  2. KYC Upload
                </button>
                <button onClick={() => jumpToScreen('profile')} className="w-full text-left p-3 glass-card rounded-xl hover:border-[#D4AF37] text-white transition-colors">
                  3. Profile Setup
                </button>
                <button onClick={() => jumpToScreen('home')} className="w-full text-left p-3 glass-card rounded-xl hover:border-[#D4AF37] text-white transition-colors">
                  4. Home Dashboard
                </button>
                <button onClick={() => jumpToScreen('manualRide')} className="w-full text-left p-3 glass-card rounded-xl hover:border-[#D4AF37] text-white transition-colors">
                  5. Manual Ride Entry
                </button>
                <button onClick={() => jumpToScreen('codeVerify')} className="w-full text-left p-3 glass-card rounded-xl hover:border-[#D4AF37] text-white transition-colors">
                  6. Code Verification
                </button>
                <button onClick={() => jumpToScreen('preTripCash')} className="w-full text-left p-3 glass-card rounded-xl hover:border-[#D4AF37] text-white transition-colors">
                  7. Pre-Trip Cash
                </button>
                <button onClick={() => jumpToScreen('ride')} className="w-full text-left p-3 glass-card rounded-xl hover:border-[#D4AF37] text-white transition-colors">
                  8. Ride Flow
                </button>
                <button onClick={() => jumpToScreen('cash')} className="w-full text-left p-3 glass-card rounded-xl hover:border-[#D4AF37] text-white transition-colors">
                  9. Post-Trip Cash
                </button>
                <button onClick={() => jumpToScreen('rating')} className="w-full text-left p-3 glass-card rounded-xl hover:border-[#D4AF37] text-white transition-colors">
                  10. Rating
                </button>
                <button onClick={() => jumpToScreen('earnings')} className="w-full text-left p-3 glass-card rounded-xl hover:border-[#D4AF37] text-white transition-colors">
                  11. Earnings
                </button>
                <button onClick={() => jumpToScreen('editProfile')} className="w-full text-left p-3 glass-card rounded-xl hover:border-[#D4AF37] text-white transition-colors">
                  12. Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content Area - Scrollable */}
        <div className="flex-1 w-full h-full overflow-y-auto scrollbar-hide relative">
          {currentScreen === 'splash' && (
            <SplashScreen onComplete={() => setCurrentScreen('login')} />
          )}
          
          {currentScreen === 'login' && (
            <LoginScreen onLogin={() => setCurrentScreen('kyc')} />
          )}
          
          {currentScreen === 'kyc' && (
            <KYCUploadScreen onComplete={() => setCurrentScreen('profile')} />
          )}
          
          {currentScreen === 'profile' && (
            <ProfileSetupScreen onComplete={() => setCurrentScreen('home')} />
          )}
          
          {currentScreen === 'home' && (
            <>
              <HomeScreen 
                isOnline={isOnline}
                onToggleOnline={handleToggleOnline}
                onNavigate={handleNavigate}
                onManualRide={handleManualRide}
              />
              <RideRequestModal
                isOpen={showRideRequest}
                onAccept={handleAcceptRide}
                onReject={handleRejectRide}
                onCounter={handleCounterOffer}
              />
            </>
          )}
          
          {currentScreen === 'ride' && (
            <RideFlowScreen 
              onComplete={handleCompleteRide}
              onCancel={handleCancelRide}
            />
          )}
          
          {currentScreen === 'cash' && (
            <CashVerificationScreen 
              fare={24.50}
              onComplete={handleCashVerified}
            />
          )}
          
          {currentScreen === 'rating' && (
            <RatingScreen 
              passengerName="Sarah Johnson"
              onComplete={handleRatingComplete}
            />
          )}
          
          {currentScreen === 'earnings' && (
            <EarningsScreen onBack={() => setCurrentScreen('home')} />
          )}
          
          {currentScreen === 'codeVerify' && (
            <CodeVerificationScreen 
              passengerName="Sarah Johnson"
              onVerified={handleCodeVerified}
              onCancel={handleCancelRide}
            />
          )}
          
          {currentScreen === 'preTripCash' && (
            <PreTripCashScreen 
              fare={manualRideFare || 24.50}
              passengerName="Sarah Johnson"
              onCollected={handlePreTripCashCollected}
              onCancel={handleCancelRide}
            />
          )}
          
          {currentScreen === 'manualRide' && (
            <DestinationEntryScreen 
              onStartManualRide={handleStartManualRide}
              onCancel={() => setCurrentScreen('home')}
            />
          )}
          
          {currentScreen === 'editProfile' && (
            <EditProfileScreen onBack={() => setCurrentScreen('home')} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
}