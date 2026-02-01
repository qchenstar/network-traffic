import React from 'react';
import { AlertStatus } from '../../types';

interface AlertItemProps {
  id: number;
  type: string;
  severity: string;
  source: string;
  target?: string;
  time: string;
  status: string;
  className?: string;
}

const AlertItem: React.FC<AlertItemProps> = ({
  id,
  type,
  severity,
  source,
  target,
  time,
  status,
  className = ''
}) => {
  const getSeverityColor = () => {
    switch (severity) {
      case '高':
        return 'bg-red-500';
      case '中':
        return 'bg-yellow-500';
      case '低':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case AlertStatus.PENDING:
        return 'bg-red-500/20 text-red-400';
      case AlertStatus.PROCESSING:
        return 'bg-yellow-500/20 text-yellow-400';
      case AlertStatus.RESOLVED:
        return 'bg-green-500/20 text-green-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusIndicatorColor = () => {
    switch (status) {
      case AlertStatus.PENDING:
        return 'bg-red-500';
      case AlertStatus.PROCESSING:
        return 'bg-yellow-500';
      case AlertStatus.RESOLVED:
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div key={id} className={`bg-gray-700 rounded-lg p-3 flex justify-between items-center ${className}`}>
      <div className="flex items-center space-x-3">
        <div className={`w-2 h-2 rounded-full ${getStatusIndicatorColor()}`}></div>
        <div>
          <p className="font-medium text-white">{type}</p>
          {target ? (
            <p className="text-xs text-gray-400">来源: {source} → 目标: {target}</p>
          ) : (
            <p className="text-xs text-gray-400">来源: {source}</p>
          )}
        </div>
      </div>
      <div className="text-right">
        <p className={`text-xs px-2 py-0.5 rounded ${getSeverityColor()} text-white mb-1`}>
          {severity}
        </p>
        <p className="text-xs text-gray-400">{time}</p>
        <p className={`text-xs px-2 py-0.5 rounded-full mt-1 ${getStatusColor()}`}>
          {status}
        </p>
      </div>
    </div>
  );
};

export default AlertItem;