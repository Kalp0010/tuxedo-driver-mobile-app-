import React, { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { useNotification } from '../../contexts/NotificationContext';

interface RatingScreenProps {
  passengerName: string;
  onComplete: () => void;
}

export function RatingScreen({ passengerName, onComplete }: RatingScreenProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [customNote, setCustomNote] = useState('');
  const { showSuccess } = useNotification();
  
  const noteTemplates = [
    'Great conversation',
    'Respectful passenger',
    'On time',
    'Clean and tidy',
    'Friendly',
    'Quiet ride',
    'Good tipper',
    'Polite'
  ];
  
  const toggleNote = (note: string) => {
    if (selectedNotes.includes(note)) {
      setSelectedNotes(selectedNotes.filter(n => n !== note));
    } else {
      setSelectedNotes([...selectedNotes, note]);
    }
  };
  
  const handleSubmit = () => {
    if (rating > 0) {
      showSuccess('Rating Submitted', `Thank you for rating ${passengerName}!`);
      setTimeout(() => onComplete(), 800);
    }
  };
  
  return (
    <div className="min-h-full bg-black p-6 safe-area flex flex-col items-center justify-center">
      <div className="w-full max-w-md pt-4 pb-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
            <MessageSquare size={40} className="text-[#D4AF37]" />
          </div>
          <h2 className="text-2xl text-[#D4AF37] mb-2">Rate Your Passenger</h2>
          <p className="text-gray-400">{passengerName}</p>
        </div>
        
        {/* Star Rating */}
        <GlassCard className="mb-6">
          <div className="flex justify-center gap-4 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-all hover:scale-110 min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <Star 
                  size={40}
                  className={star <= (hoveredRating || rating) ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-600'}
                />
              </button>
            ))}
          </div>
          
          {rating > 0 && (
            <p className="text-center text-[#D4AF37]">
              {rating === 5 && 'Excellent! ⭐'}
              {rating === 4 && 'Great 👍'}
              {rating === 3 && 'Good'}
              {rating === 2 && 'Could be better'}
              {rating === 1 && 'Poor experience'}
            </p>
          )}
        </GlassCard>
        
        {/* Note Templates */}
        {rating > 0 && (
          <div className="mb-6 animate-fade-in w-full">
            <GlassCard>
              <h3 className="text-lg text-[#D4AF37] mb-4 flex items-center gap-2">
                {rating >= 4 ? <Star size={20} /> : <Star size={20} />}
                {rating >= 4 ? 'What went well?' : 'What went wrong?'}
              </h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {noteTemplates.map((note) => (
                  <button
                    key={note}
                    onClick={() => toggleNote(note)}
                    className={`px-4 py-2 rounded-xl text-sm transition-all min-h-[44px] ${
                      selectedNotes.includes(note)
                        ? 'bg-[#D4AF37] text-black'
                        : 'glass-card text-gray-400 hover:text-white'
                    }`}
                  >
                    {note}
                  </button>
                ))}
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Additional Notes (Optional)</label>
                <textarea
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Add any additional comments..."
                  rows={3}
                  className="w-full glass-card p-3 rounded-xl bg-transparent outline-none text-white resize-none border-[#D4AF37]/20"
                />
              </div>
            </GlassCard>
          </div>
        )}
        
        <Button 
          onClick={handleSubmit}
          disabled={rating === 0}
          className="w-full"
        >
          Submit Rating
        </Button>
      </div>
    </div>
  );
}