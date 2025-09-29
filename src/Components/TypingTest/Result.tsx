import { useEffect } from 'react';
import { Award, AlertCircle, Percent, X } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';

interface ResultProps {
  wpm: number;
  accuracy: number;
  errors: number;
  timeElapsed: number; // in seconds
  completed: boolean;
  onClose: () => void;
  isOpen: boolean;
}

function Result({ 
  wpm, 
  accuracy, 
  errors, 
  completed, 
  onClose,
  isOpen 
}: ResultProps) {
  useEffect(() => {
    // When the modal opens, prevent scrolling on the body
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const resultText = completed ? 'Completed!' : 'Time\'s up!';
  const feedbackText = completed 
    ? 'Great job completing the test!' 
    : 'You\'ve reached the time limit. Try to complete next time!';
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Content */}
      <Card className="relative z-10 p-6 bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Typing Test Results: {resultText}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="stat-card">
            <Award className="mx-auto h-6 w-6 text-yellow-500 mb-2" />
            <div className="text-3xl font-bold">{wpm}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">WPM</div>
          </div>
          
          <div className="stat-card">
            <Percent className="mx-auto h-6 w-6 text-green-500 mb-2" />
            <div className="text-3xl font-bold">{accuracy}%</div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">Accuracy</div>
          </div>
          
          <div className="stat-card">
            <AlertCircle className="mx-auto h-6 w-6 text-red-500 mb-2" />
            <div className="text-3xl font-bold text-red-500">{errors}</div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">Errors</div>
          </div>
        </div>
        
        <div className="text-center text-sm text-slate-600 mb-4">
          {feedbackText}
        </div>
        
        <Button 
          className="w-full py-6 text-lg font-medium"
          onClick={onClose}
        >
          Try Again
        </Button>
      </Card>
    </div>
  );
}

export default Result;