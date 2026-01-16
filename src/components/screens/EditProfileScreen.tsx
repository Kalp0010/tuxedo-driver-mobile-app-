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
import { Select } from '../ui/Select';
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
    // Simulate upload logic
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
          <div className="w-10" /> {/* Spacer */}
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
                onClick={() => {}}
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
              icon={<User size={20} />}
            />
            <Input
              label="Phone Number"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
              type="tel"
              icon={<Phone size={20} />}
            />
            <Input
              label="Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              type="email"
              icon={<Mail size={20} />}
            />
            <Input
              label="Date of Birth"
              value={dob}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDob(e.target.value)}
              type="date"
              icon={<Calendar size={20} />}
            />
            <Select
              label="Gender (Optional)"
              value={gender}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setGender(e.target.value)}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
                { value: 'prefer-not', label: 'Prefer not to say' }
              ]}
            />
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
            <Select
              label="Luxury Vehicle Type"
              value={vehicleType}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setVehicleType(e.target.value)}
              options={[
                { value: 'Limousine', label: 'Limousine' },
                { value: 'Executive Sedan', label: 'Executive Sedan' },
                { value: 'Luxury SUV', label: 'Luxury SUV' },
                { value: 'Luxury Van', label: 'Luxury Van' },
                { value: 'Exotic Car', label: 'Exotic Car' }
              ]}
            />
            <Input
              label="Vehicle Make & Model"
              value={vehicleMake}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVehicleMake(e.target.value)}
              icon={<Car size={20} />}
              placeholder="e.g., Mercedes-Benz S-Class"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Year"
                value={vehicleYear}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVehicleYear(e.target.value)}
                type="number"
                icon={<Calendar size={20} />}
              />
              <Input
                label="Color"
                value={vehicleColor}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVehicleColor(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="License Plate"
                value={licensePlate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLicensePlate(e.target.value)}
              />
              <Select
                label="Capacity"
                value={capacity}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCapacity(e.target.value)}
                options={[
                  { value: '2', label: '2 passengers' },
                  { value: '4', label: '4 passengers' },
                  { value: '6', label: '6 passengers' },
                  { value: '8', label: '8 passengers' }
                ]}
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-3">Vehicle Photos</label>
              <div className="grid grid-cols-3 gap-3">
                <ImageUpload
                  label="Front"
                  imageUrl={vehiclePhotos.front}
                  onUpload={() => {}}
                  size="small"
                />
                <ImageUpload
                  label="Side"
                  imageUrl={vehiclePhotos.side}
                  onUpload={() => {}}
                  size="small"
                />
                <ImageUpload
                  label="Interior"
                  imageUrl={vehiclePhotos.interior}
                  onUpload={() => {}}
                  size="small"
                />
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
                <Chip
                  label="Google"
                  selected={navApp === 'google'}
                  onClick={() => setNavApp('google')}
                  icon={<Globe size={16} />}
                />
                <Chip
                  label="Apple"
                  selected={navApp === 'apple'}
                  onClick={() => setNavApp('apple')}
                  icon={<Apple size={16} />}
                />
                <Chip
                  label="Waze"
                  selected={navApp === 'waze'}
                  onClick={() => setNavApp('waze')}
                  icon={<Navigation size={16} />}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-white">Accept Cash Rides</p>
                <p className="text-sm text-gray-400">Allow passengers to pay with cash</p>
              </div>
              <Toggle checked={acceptCash} onChange={setAcceptCash} />
            </div>

            <Select
              label="Max Luggage Capacity"
              value={maxLuggage}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setMaxLuggage(e.target.value)}
              options={[
                { value: '1', label: '1 bag' },
                { value: '2', label: '2 bags' },
                { value: '3', label: '3 bags' },
                { value: '4', label: '4+ bags' }
              ]}
            />

            <div>
              <label className="block text-sm text-gray-400 mb-3">Operating Hours</label>
              <div className="grid grid-cols-2 gap-4">
                <TimeInput
                  label="Start Time"
                  value={startTime}
                  onChange={setStartTime}
                />
                <TimeInput
                  label="End Time"
                  value={endTime}
                  onChange={setEndTime}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-3">Amenities Available</label>
              <div className="flex flex-wrap gap-2">
                <Chip
                  label="WiFi"
                  selected={amenities.includes('wifi')}
                  onClick={() => toggleAmenity('wifi')}
                  icon={<Wifi size={16} />}
                />
                <Chip
                  label="Charger"
                  selected={amenities.includes('charger')}
                  onClick={() => toggleAmenity('charger')}
                  icon={<Smartphone size={16} />}
                />
                <Chip
                  label="Water"
                  selected={amenities.includes('water')}
                  onClick={() => toggleAmenity('water')}
                  icon={<Droplet size={16} />}
                />
                <Chip
                  label="Child Seat"
                  selected={amenities.includes('childSeat')}
                  onClick={() => toggleAmenity('childSeat')}
                  icon={<Baby size={16} />}
                />
                <Chip
                  label="Umbrella"
                  selected={amenities.includes('umbrella')}
                  onClick={() => toggleAmenity('umbrella')}
                  icon={<CloudRain size={16} />}
                />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Safety & Emergency */}
        <div>
          <h3 className="text-lg text-[#D4AF37] mb-3 flex items-center gap-2">
            <Shield size={20} />
            Safety & Emergency
          </h3>
          <GlassCard variant="subtle" className="space-y-4">
            <Input
              label="Emergency Contact Name"
              value={emergencyName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmergencyName(e.target.value)}
              icon={<User size={20} />}
            />
            <Input
              label="Emergency Contact Number"
              value={emergencyPhone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmergencyPhone(e.target.value)}
              type="tel"
              icon={<Phone size={20} />}
            />
            <div>
              <label className="block text-sm text-gray-400 mb-2">Medical Notes (Optional)</label>
              <textarea
                value={medicalNotes}
                onChange={(e) => setMedicalNotes(e.target.value)}
                placeholder="Any medical conditions we should know about..."
                rows={3}
                className="w-full glass-card p-3 rounded-xl bg-transparent outline-none text-white resize-none border border-transparent focus:border-[#D4AF37] transition-all duration-300"
              />
            </div>
            <Button variant="danger" size="medium" icon={<AlertCircle size={20} />}>
              SOS Contact
            </Button>
          </GlassCard>
        </div>

        {/* Account Security */}
        <div>
          <h3 className="text-lg text-[#D4AF37] mb-3 flex items-center gap-2">
            <Lock size={20} />
            Account Security
          </h3>
          <GlassCard variant="subtle" className="space-y-4">
            <button className="w-full flex items-center justify-between p-3 glass-card rounded-xl hover:border-[#D4AF37]/50 transition-all min-h-[56px]">
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-[#D4AF37]" />
                <span className="text-white">Change Password</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>

            <div className="flex items-center justify-between p-3 glass-card rounded-xl">
              <div className="flex items-center gap-3">
                <Shield size={20} className="text-[#D4AF37]" />
                <div>
                  <p className="text-white">Biometric Auth</p>
                  <p className="text-xs text-gray-400">Face ID / Touch ID</p>
                </div>
              </div>
              <Toggle checked={biometricEnabled} onChange={setBiometricEnabled} />
            </div>

            <div className="flex items-center justify-between p-3 glass-card rounded-xl">
              <div className="flex items-center gap-3">
                <Lock size={20} className="text-[#D4AF37]" />
                <div>
                  <p className="text-white">2FA</p>
                  <p className="text-xs text-gray-400">Extra security layer</p>
                </div>
              </div>
              <Toggle checked={twoFactorEnabled} onChange={setTwoFactorEnabled} />
            </div>

            <button className="w-full flex items-center justify-between p-3 glass-card rounded-xl hover:border-[#D4AF37]/50 transition-all min-h-[56px]">
              <div className="flex items-center gap-3">
                <Smartphone size={20} className="text-[#D4AF37]" />
                <span className="text-white">Trusted Devices</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>

            <button className="w-full flex items-center justify-between p-3 glass-card rounded-xl hover:border-red-500/50 transition-all min-h-[56px] border-red-500/20">
              <div className="flex items-center gap-3">
                <X size={20} className="text-red-400" />
                <span className="text-red-400">Logout of All Devices</span>
              </div>
              <span className="text-gray-400">›</span>
            </button>
          </GlassCard>
        </div>
      </div>

      {/* Sticky Footer Actions - Constrained Width */}
      <div className="fixed bottom-0 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <div className="w-full max-w-md glass-strong border-t border-white/10 p-4 safe-bottom pointer-events-auto rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="secondary" onClick={onBack} icon={<X size={20} />}>
              Cancel
            </Button>
            <Button onClick={handleSave} icon={<Save size={20} />}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}