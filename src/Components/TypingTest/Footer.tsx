import { CheckCircle2 } from "lucide-react";

interface FooterProps {
  endedAt: number | null;
  timeLeft: number;
}

export function Footer({ endedAt, timeLeft }: FooterProps) {
  return (
    <div className="text-center text-xs text-slate-400 mt-auto py-5 border-t border-slate-200">
      <span className="hint-pill">click anywhere to focus</span> 
      <span className="mx-2">|</span> 
      <span className="hint-pill">press tab to restart</span>
      {endedAt && timeLeft === 0 && 
        <div className="mt-3 text-sm text-amber-600 animate-bounce">
          <CheckCircle2 className="w-4 h-4 inline mr-1 animate-pulse" /> Time's up!
        </div>
      }
    </div>
  );
}