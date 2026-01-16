import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  Calendar,
  FileText,
  Car,
  Settings,
  Shield,
  Lock,
  Save,
  X,
  Star,
  Camera,
  CreditCard,
  Navigation,
  Globe,
  Apple,
  Wifi,
  Smartphone,
  Droplet,
  Baby,
  CloudRain,
  AlertCircle
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/Select';
import { Toggle } from '../ui/Toggle';
import { Chip } from '../ui/Chip';
import { DocumentUpload, DocumentStatus } from '../ui/DocumentUpload';
import { TimeInput } from '../ui/TimeInput';
import { ImageUpload } from '../ui/ImageUpload';
import { useNotification } from '../../contexts/NotificationContext';

interface EditProfileScreenProps {
  onBack: () => void;
}

export function EditProfileScreen({ onBack }: EditProfileScreenProps) {
  const { showSuccess } = useNotification();
  
  // Profile state
  const [profilePhoto, setProfilePhoto] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400');
  const [fullName, setFullName] = useState('Michael Anderson');
  const [phone, setPhone] = useState('555-123-4567');
  const [email, setEmail] = useState('michael.anderson@tuxedo.com');
  const [dob, setDob] = useState('1985-06-15');
  const [gender, setGender] = useState('male');
  
  // KYC Documents
  const [documents, setDocuments] = useState({
    license: 'verified' as DocumentStatus,
    insurance: 'verified' as DocumentStatus,
    registration: 'pending' as DocumentStatus,
    background: 'verified' as DocumentStatus,
    idProof: 'verified' as DocumentStatus
  });
  
  // Vehicle info
  const [vehicleType, setVehicleType] = useState('Executive Sedan');
  const [vehicleMake, setVehicleMake] = useState('Mercedes-Benz S-Class');
  const [vehicleYear, setVehicleYear] = useState('2022');
  const [vehicleColor, setVehicleColor] = useState('Black');
  const [licensePlate, setLicensePlate] = useState('TUX 2024');
  const [capacity, setCapacity] = useState('4');
  const [vehiclePhotos, setVehiclePhotos] = useState({
    front: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400',
    side: '',
    interior: ''
  });
  
  // Preferences
  const [navApp, setNavApp] = useState<'google' | 'apple' | 'waze'>('google');
  const [acceptCash, setAcceptCash] = useState(true);
  const [maxLuggage, setMaxLuggage] = useState('3');
  const [startTime, setStartTime] = useState('06:00');
  const [endTime, setEndTime] = useState('22:00');
  const [amenities, setAmenities] = useState(['wifi', 'charger', 'water']);
  
  // Safety
  const [emergencyName, setEmergencyName] = useState('Sarah Anderson');
  const [emergencyPhone, setEmergencyPhone] = useState('555-987-6543');
  const [medicalNotes, setMedicalNotes] = useState('');
  
  // Security
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  
  const handleSave = () => {
    showSuccess('Profile Updated', 'Your changes have been saved successfully');
    setTimeout(() => onBack(), 1000);
  };
  
  const handleDocumentUpload = (docType: string) => {
    showSuccess('Document Uploaded', 'Your document is being verified');
  };
  
  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter(a => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  return (
    <div className="min-h-full bg-black safe-area flex flex-col items-center relative">
      {/* Header - Sticky Top */}
      <div className="sticky top-0 z-30 w-full max-w-md glass-strong border-b border-white/10 backdrop-blur-xl">
        <div className="px-6 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="text-[#D4AF37] hover:text-[#F7E29F] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full hover:bg-white/5"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl text-white font-semibold">Edit Profile</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md px-6 py-6 space-y-6 pb-32">
        {/* Profile Header */}
        <GlassCard variant="strong">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#D4AF37] gold-glow">
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button 
                className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#D4AF37] text-black flex items-center justify-center gold-shimmer hover-lift border-2 border-black"
              >
                <Camera size={20} />
              </button>
            </div>
            <div>
              <h2 className="text-2xl text-white mb-1">{fullName}</h2>
              <div className="flex items-center justify-center gap-1 text-[#D4AF37]">
                <Star size={16} className="fill-[#D4AF37]" />
                <span>4.9</span>
                <span className="text-gray-400 text-sm ml-1">(1,247 rides)</span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Personal Information */}
        <div>
          <h3 className="text-lg text-[#D4AF37] mb-3 flex items-center gap-2">
            <User size={20} />
            Personal Information
          </h3>
          <GlassCard variant="subtle" className="space-y-4">
            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              icon={<User size={20} />}
            />
            <Input
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              icon={<Phone size={20} />}
            />
            <Input
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              icon={<Mail size={20} />}
            />
            <Input
              label="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              type="date"
              icon={<Calendar size={20} />}
            />
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Gender (Optional)</label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="w-full bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-[#D4AF37]/20 text-white">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </GlassCard>
        </div>

        {/* KYC Information */}
        <div>
          <h3 className="text-lg text-[#D4AF37] mb-3 flex items-center gap-2">
            <FileText size={20} />
            Verification Documents
          </h3>
          <GlassCard variant="subtle" className="space-y-3">
            <DocumentUpload
              label="Driver's License"
              status={documents.license}
              onUpload={() => handleDocumentUpload('license')}
              icon={<CreditCard size={24} />}
            />
            <DocumentUpload
              label="Vehicle Insurance"
              status={documents.insurance}
              onUpload={() => handleDocumentUpload('insurance')}
              icon={<Shield size={24} />}
            />
            <DocumentUpload
              label="Registration Certificate"
              status={documents.registration}
              onUpload={() => handleDocumentUpload('registration')}
              icon={<FileText size={24} />}
            />
            <DocumentUpload
              label="Background Check"
              status={documents.background}
              onUpload={() => handleDocumentUpload('background')}
              icon={<Shield size={24} />}
            />
            <DocumentUpload
              label="ID Proof"
              status={documents.idProof}
              onUpload={() => handleDocumentUpload('idProof')}
              icon={<CreditCard size={24} />}
            />
          </GlassCard>
        </div>

        {/* Vehicle Information */}
        <div>
          <h3 className="text-lg text-[#D4AF37] mb-3 flex items-center gap-2">
            <Car size={20} />
            Vehicle Information
          </h3>
          <GlassCard variant="subtle" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Luxury Vehicle Type</label>
              <Select value={vehicleType} onValueChange={setVehicleType}>
                <SelectTrigger className="w-full bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]">
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-[#D4AF37]/20 text-white">
                  <SelectItem value="Limousine">Limousine</SelectItem>
                  <SelectItem value="Executive Sedan">Executive Sedan</SelectItem>
                  <SelectItem value="Luxury SUV">Luxury SUV</SelectItem>
                  <SelectItem value="Luxury Van">Luxury Van</SelectItem>
                  <SelectItem value="Exotic Car">Exotic Car</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Input
              label="Vehicle Make & Model"
              value={vehicleMake}
              onChange={(e) => setVehicleMake(e.target.value)}
              icon={<Car size={20} />}
              placeholder="e.g., Mercedes-Benz S-Class"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Year"
                value={vehicleYear}
                onChange={(e) => setVehicleYear(e.target.value)}
                type="number"
                icon={<Calendar size={20} />}
              />
              <Input
                label="Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="License Plate"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Capacity</label>
                <Select value={capacity} onValueChange={setCapacity}>
                  <SelectTrigger className="w-full bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]">
                    <SelectValue placeholder="Capacity" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-[#D4AF37]/20 text-white">
                    <SelectItem value="2">2 passengers</SelectItem>
                    <SelectItem value="4">4 passengers</SelectItem>
                    <SelectItem value="6">6 passengers</SelectItem>
                    <SelectItem value="8">8 passengers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-3">Vehicle Photos</label>
              <div className="grid grid-cols-3 gap-3">
                <ImageUpload label="Front" imageUrl={vehiclePhotos.front} onUpload={() => {}} size="small" />
                <ImageUpload label="Side" imageUrl={vehiclePhotos.side} onUpload={() => {}} size="small" />
                <ImageUpload label="Interior" imageUrl={vehiclePhotos.interior} onUpload={() => {}} size="small" />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Driver Preferences */}
        <div>
          <h3 className="text-lg text-[#D4AF37] mb-3 flex items-center gap-2">
            <Settings size={20} />
            Driver Preferences
          </h3>
          <GlassCard variant="subtle" className="space-y-5">
            <div>
              <label className="block text-sm text-gray-400 mb-3">Preferred Navigation App</label>
              <div className="grid grid-cols-3 gap-3">
                <Chip label="Google" selected={navApp === 'google'} onClick={() => setNavApp('google')} icon={<Globe size={16} />} />
                <Chip label="Apple" selected={navApp === 'apple'} onClick={() => setNavApp('apple')} icon={<Apple size={16} />} />
                <Chip label="Waze" selected={navApp === 'waze'} onClick={() => setNavApp('waze')} icon={<Navigation size={16} />} />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Accept Cash Rides</p>
                <p className="text-sm text-gray-400">Allow passengers to pay with cash</p>
              </div>
              {/* FIXED: Use pressed and onPressedChange for Radix/Shadcn Toggle */}
              <Toggle pressed={acceptCash} onPressedChange={setAcceptCash} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Max Luggage Capacity</label>
              <Select value={maxLuggage} onValueChange={setMaxLuggage}>
                <SelectTrigger className="w-full bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-[#D4AF37]/50 focus:border-[#D4AF37]">
                  <SelectValue placeholder="Select luggage" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-[#D4AF37]/20 text-white">
                  <SelectItem value="1">1 bag</SelectItem>
                  <SelectItem value="2">2 bags</SelectItem>
                  <SelectItem value="3">3 bags</SelectItem>
                  <SelectItem value="4">4+ bags</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* ... other amenities chips ... */}
          </GlassCard>
        </div>

        {/* Account Security */}
        <div>
          <h3 className="text-lg text-[#D4AF37] mb-3 flex items-center gap-2">
            <Lock size={20} />
            Account Security
          </h3>
          <GlassCard variant="subtle" className="space-y-4">
            <div className="flex items-center justify-between p-3 glass-card rounded-xl">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-[#D4AF37]" />
                <div>
                  <p className="text-white">Biometric Auth</p>
                  <p className="text-xs text-gray-400">Face ID / Touch ID</p>
                </div>
              </div>
              {/* FIXED: Use pressed and onPressedChange */}
              <Toggle pressed={biometricEnabled} onPressedChange={setBiometricEnabled} />
            </div>

            <div className="flex items-center justify-between p-3 glass-card rounded-xl">
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-[#D4AF37]" />
                <div>
                  <p className="text-white">2FA</p>
                  <p className="text-xs text-gray-400">Extra security layer</p>
                </div>
              </div>
              {/* FIXED: Use pressed and onPressedChange */}
              <Toggle pressed={twoFactorEnabled} onPressedChange={setTwoFactorEnabled} />
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Sticky Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center pointer-events-auto bg-gradient-to-t from-black via-black/80 to-transparent p-4 pb-safe">
        <div className="w-full max-w-md grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={onBack} icon={<X size={20} />}>
            Cancel
          </Button>
          <Button onClick={handleSave} icon={<Save size={20} />}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}