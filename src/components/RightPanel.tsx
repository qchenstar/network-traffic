import React from 'react';
import ReactECharts from 'echarts-for-react';
import { alerts, attackTypeData, keyMetrics } from '../data/mockData';

const RightPanel: React.FC = () => {
  const getAlertLevelClass = (level: string) => {
    switch (level) {
      case 'critical': return { cls: 'bg-red-500/10 border-red-500/30 text-red-400', label: '危急' };
      case 'high': return { cls: 'bg-orange-500/10 border-orange-500/30 text-orange-400', label: '高危' };
      case 'medium': return { cls: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400', label: '中危' };
      default: return { cls: 'bg-gray-500/10 border-gray-500/30 text-gray-400', label: '未知' };
    }
  };

  const attackTypeOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#E5E7EB' }
    },
    legend: {
      orient: 'vertical',
      right: 0,
      top: 'center',
      textStyle: { color: '#9CA3AF', fontSize: 11 },
      itemWidth: 10,
      itemHeight: 10
    },
    series: [
      {
        name: '攻击类型',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: '#111827',
          borderWidth: 2
        },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold', color: '#fff' }
        },
        data: attackTypeData
      }
    ]
  };

  return (
    <aside className="right-panel space-y-4 pl-2">
      {/* 实时告警Feed */}
      <div className="tech-panel rounded-xl p-5 relative flex-[2] flex flex-col min-h-0">
        <div className="corner corner-tl text-red-500"></div>
        <div className="corner corner-br text-red-500"></div>
        
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white flex items-center">
            <span className="w-2 h-6 bg-red-500 rounded-full mr-3"></span>
            实时威胁告警
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-red-400 mono">LIVE</span>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-3 pr-1" id="alert-feed">
          {alerts.map((alert, index) => {
            const level = getAlertLevelClass(alert.level);
            return (
              <div key={index} className={`p-4 rounded-lg border ${level.cls} hover:bg-opacity-20 transition-all cursor-pointer group`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 rounded text-xs font-bold bg-current bg-opacity-20 border border-current border-opacity-30">
                      {level.label}
                    </span>
                    <span className="text-xs text-gray-500 mono">{alert.time}</span>
                  </div>
                  <span className="text-xs text-gray-400">置信度 {alert.confidence}</span>
                </div>
                <div className="text-sm font-medium text-white mb-1 group-hover:text-blue-400 transition-colors">{alert.title}</div>
                <div className="text-xs text-gray-400 space-y-1">
                  <div>源: {alert.src} → {alert.target}</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-300 border border-gray-600">IOC: {alert.ioc}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between text-sm">
          <div className="text-gray-400">今日告警: <span className="text-white font-bold mono" id="today-alerts">23</span></div>
          <div className="text-gray-400">未处理: <span className="text-red-400 font-bold mono">5</span></div>
        </div>
      </div>
      
      {/* 攻击类型统计 */}
      <div className="tech-panel rounded-xl p-5 relative flex-1">
        <div className="corner corner-tl text-orange-500"></div>
        <div className="corner corner-br text-orange-500"></div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <span className="w-2 h-6 bg-orange-500 rounded-full mr-3"></span>
          攻击类型分布
        </h3>
        <div id="attackTypeChart" className="w-full h-48">
          <ReactECharts option={attackTypeOption} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
      
      {/* 快速统计 */}
      <div className="tech-panel rounded-xl p-5 relative">
        <div className="corner corner-tl text-green-500"></div>
        <div className="corner corner-br text-green-500"></div>
        <h3 className="text-lg font-bold text-white mb-4">关键指标速览</h3>
        <div className="grid grid-cols-2 gap-3">
          {keyMetrics.map((metric, index) => (
            <div key={index} className="p-3 bg-gray-800/50 rounded-lg border border-gray-700 text-center">
              <div className="text-xs text-gray-500 mb-1">{metric.name}</div>
              <div className="text-2xl digit font-bold" style={{ color: metric.color }}>{metric.value}<span className="text-sm">{metric.unit}</span></div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;
