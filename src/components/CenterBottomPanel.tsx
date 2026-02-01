import React from 'react';
import { indicatorSystem } from '../data/mockData';

const CenterBottomPanel: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'best': return { color: '#10B981', bg: 'rgba(16,185,129,0.1)', label: '优' };
      case 'good': return { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', label: '良' };
      case 'normal': return { color: '#6B7280', bg: 'rgba(107,114,128,0.1)', label: '正常' };
      case 'warn': return { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', label: '警告' };
      case 'danger': return { color: '#F97316', bg: 'rgba(249,115,22,0.1)', label: '危险' };
      case 'critical': return { color: '#EF4444', bg: 'rgba(239,68,68,0.1)', label: '危急' };
      default: return { color: '#6B7280', bg: 'rgba(107,114,128,0.1)', label: '未知' };
    }
  };

  const getAllQuaternaryItems = () => {
    const items: any[] = [];
    indicatorSystem.dimensions.forEach((dim) => {
      dim.indicators.forEach((ind) => {
        ind.items.forEach((item) => {
          items.push({ ...item, dimension: dim.name });
        });
      });
    });
    return items;
  };

  return (
    <div className="center-bottom-panel tech-panel rounded-xl p-6 relative overflow-hidden">
      <div className="corner corner-tl text-blue-500"></div>
      <div className="corner corner-tr text-blue-500"></div>
      <div className="corner corner-bl text-blue-500"></div>
      <div className="corner corner-br text-blue-500"></div>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">四级原始监测指标（40+项）</h3>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-xs bg-gray-800 rounded border border-gray-600 text-gray-400 hover:text-white transition-all">全部</button>
          <button className="px-3 py-1 text-xs bg-gray-800 rounded border border-gray-600 text-gray-400 hover:text-white transition-all">异常</button>
          <button className="px-3 py-1 text-xs bg-red-500/20 rounded border border-red-500/50 text-red-400">危急</button>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4 h-full overflow-y-auto pr-2" id="quaternary-grid">
        {getAllQuaternaryItems().map((item, index) => {
          const status = getStatusColor(item.status);
          return (
            <div key={index} className="p-3 rounded-lg border border-gray-700 bg-gray-800/30 hover:border-gray-500 transition-all group">
              <div className="flex justify-between items-start mb-2">
                <div className="text-xs text-gray-500 truncate" title={item.dimension}>{item.dimension}</div>
                <div className="px-2 py-0.5 rounded text-xs font-bold" style={{ color: status.color, background: status.bg, border: `1px solid ${status.color}40` }}>
                  {status.label}
                </div>
              </div>
              <div className="text-sm font-medium text-white mb-1 truncate" title={item.name}>{item.name}</div>
              <div className="flex justify-between items-end">
                <div className="text-lg digit font-bold" style={{ color: status.color }}>{item.value}</div>
                <div className="text-xs text-gray-600">基线: {item.baseline}</div>
              </div>
              <div className="mt-2 w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.random() * 40 + 60}%`, background: status.color }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CenterBottomPanel;
