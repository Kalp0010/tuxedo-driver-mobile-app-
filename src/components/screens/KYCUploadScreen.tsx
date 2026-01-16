import React, { useState } from 'react';
import { Upload, CheckCircle, FileText, Shield, Car } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

interface KYCUploadScreenProps {
  onComplete: () => void;
}

interface Document {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  uploaded: boolean;
}

export function KYCUploadScreen({ onComplete }: KYCUploadScreenProps) {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'license',
      title: "Driver's License",
      description: 'Upload front and back',
      icon: <Shield size={32} className="text-[#D4AF37]" />,
      uploaded: false
    },
    {
      id: 'insurance',
      title: 'Insurance Certificate',
      description: 'Valid insurance proof',
      icon: <FileText size={32} className="text-[#D4AF37]" />,
      uploaded: false
    },
    {
      id: 'registration',
      title: 'Vehicle Registration',
      description: 'Current registration',
      icon: <Car size={32} className="text-[#D4AF37]" />,
      uploaded: false
    }
  ]);
  
  const handleUpload = (id: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === id ? { ...doc, uploaded: true } : doc
      )
    );
  };
  
  const allUploaded = documents.every(doc => doc.uploaded);
  
  return (
    <div className="min-h-full bg-black p-6 safe-area flex flex-col items-center">
      <div className="w-full max-w-md pt-4 pb-8 animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-3xl text-[#D4AF37] mb-2">KYC Verification</h1>
          <p className="text-gray-400">Upload required documents to continue</p>
        </div>
        
        <div className="space-y-4 mb-8">
          {documents.map((doc) => (
            <GlassCard 
              key={doc.id}
              className={`transition-all duration-300 ${doc.uploaded ? 'border-green-500/50 bg-green-500/5' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl transition-colors ${doc.uploaded ? 'bg-green-500/20' : 'bg-[#D4AF37]/10'}`}>
                  {doc.uploaded ? <CheckCircle size={32} className="text-green-500" /> : doc.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg mb-1 text-white">{doc.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{doc.description}</p>
                  
                  {doc.uploaded ? (
                    <div className="flex items-center gap-2 text-green-500 font-medium">
                      <span className="text-sm">Upload Complete</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleUpload(doc.id)}
                      className="flex items-center gap-2 text-[#D4AF37] text-sm hover:text-[#F4E5A1] transition-colors min-h-[44px] px-2 -ml-2 rounded-lg hover:bg-[#D4AF37]/10"
                    >
                      <Upload size={18} />
                      <span>Upload Document</span>
                    </button>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
        
        <div className="pb-8">
          <Button 
            onClick={onComplete}
            disabled={!allUploaded}
            className="w-full"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}