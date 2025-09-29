import { Award, Percent, AlertCircle, Clock } from "lucide-react";
import { StatCard } from "./StatCard";

interface StatsDisplayProps {
  wpm: number;
  accuracy: number;
  errors: number;
  timeLeft: number;
  timerRunning: boolean;
  startedAt: number | null;
  endedAt: number | null;
}

export function StatsDisplay({ wpm, accuracy, errors, timeLeft, timerRunning, startedAt, endedAt }: StatsDisplayProps) {
  return (
    <div className="mb-10">
      <div className="flex justify-center gap-8 mb-4">
        <StatCard 
          icon={Award}
          value={wpm}
          label="wpm"
          iconColor="text-yellow-500"
        />
        
        <StatCard 
          icon={Percent}
          value={`${accuracy}%`}
          label="accuracy"
          iconColor="text-green-500"
        />
        
        <StatCard 
          icon={AlertCircle}
          value={errors}
          label="errors"
          iconColor="text-red-500"
          valueColor="text-red-500"
        />
        
        <StatCard 
          icon={Clock}
          value={timeLeft}
          label="seconds"
          iconColor="text-blue-500"
          valueColor="text-blue-500"
          animate={timerRunning}
        />
      </div>
      
      <div className="text-center text-xs text-slate-400 font-medium">
        {startedAt && endedAt
          ? `completed in ${Math.round((endedAt - startedAt) / 1000)}s`
          : startedAt
          ? "typing..."
          : "ready to start"}
      </div>
    </div>
  );
}