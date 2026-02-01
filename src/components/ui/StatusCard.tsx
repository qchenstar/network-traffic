import React from 'react';

interface StatusCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: string;
  color?: string;
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  color = '#3B82F6',
  className = ''
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-red-400';
      case 'decrease':
        return 'text-green-400';
      default:
        return 'text-yellow-400';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase':
        return '↑';
      case 'decrease':
        return '↓';
      default:
        return '';
    }
  };

  return (
    <div className={`bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700 ${className}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-gray-300">{title}</h3>
        {icon && (
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
            <span style={{ color }}>{icon}</span>
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold" style={{ color }}>{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${getChangeColor()}`}>
              {getChangeIcon()} {change}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;