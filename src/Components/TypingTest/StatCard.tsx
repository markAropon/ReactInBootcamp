import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
  iconColor: string;
  valueColor?: string;
  animate?: boolean;
}

export function StatCard({
  icon: Icon,
  value,
  label,
  iconColor,
  valueColor = '',
  animate = false
}: StatCardProps) {
  return (
    <div className="stat-card">
      <Icon className={`stat-icon ${iconColor} ${animate ? 'animate-pulse' : ''}`} />
      <div className={`text-3xl font-bold transition-all duration-300 ${valueColor}`}>
        {value}
      </div>
      <div className="text-xs text-slate-500 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}