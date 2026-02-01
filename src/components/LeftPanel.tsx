import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { indicatorSystem } from '../data/mockData';

const LeftPanel: React.FC = () => {
  const [selectedDimension, setSelectedDimension] = useState<number | null>(null);
  const [overallScore] = useState(87);

  const getOverallGrade = (score: number) => {
    if (score >= 90) return { cls: 'bg-grade-best text-green-400 border-green-500/30', text: '优' };
    if (score >= 80) return { cls: 'bg-grade-good text-blue-400 border-blue-500/30', text: '良' };
    if (score >= 60) return { cls: 'bg-grade-warn text-yellow-400 border-yellow-500/30', text: '中' };
    if (score >= 40) return { cls: 'bg-grade-danger text-orange-400 border-orange-500/30', text: '差' };
    return { cls: 'bg-grade-critical text-red-400 border-red-500/30', text: '危' };
  };

  const getDimensionColor = (grade: string) => {
    switch (grade) {
      case 'best': return 'bg-blue-500/10 border-l-4 border-blue-500 text-blue-400 hover:bg-blue-500/20';
      case 'good': return 'bg-blue-400/10 border-l-4 border-blue-400 text-blue-400 hover:bg-blue-400/20';
      case 'warn': return 'bg-yellow-500/10 border-l-4 border-yellow-500 text-yellow-400 hover:bg-yellow-500/20';
      case 'danger': return 'bg-orange-500/10 border-l-4 border-orange-500 text-orange-400 hover:bg-orange-500/20';
      case 'critical': return 'bg-red-500/10 border-l-4 border-red-500 text-red-400 hover:bg-red-500/20';
      default: return 'bg-gray-500/10 border-l-4 border-gray-500 text-gray-400 hover:bg-gray-500/20';
    }
  };

  const getGradeText = (grade: string) => {
    switch (grade) {
      case 'best': return '优';
      case 'good': return '良';
      case 'warn': return '中';
      case 'danger': return '差';
      case 'critical': return '危';
      default: return '未知';
    }
  };

  const gaugeOption = {
    backgroundColor: 'transparent',
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      min: 0,
      max: 100,
      radius: '100%',
      center: ['50%', '70%'],
      splitNumber: 5,
      itemStyle: { color: getOverallGrade(overallScore).text === '优' ? '#10B981' : '#3B82F6' },
      progress: { show: true, width: 20 },
      pointer: {
        show: true,
        length: '60%',
        width: 6,
        itemStyle: { color: '#fff' }
      },
      axisLine: {
        lineStyle: {
          width: 20,
          color: [[1, 'rgba(255,255,255,0.1)']]
        }
      },
      axisTick: { show: false },
      splitLine: { length: 15, lineStyle: { width: 2, color: '#374151' } },
      axisLabel: {
        distance: 20,
        color: '#9CA3AF',
        fontSize: 12,
        formatter: '{value}'
      },
      title: { show: false },
      detail: {
        valueAnimation: true,
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        offsetCenter: [0, '-10%'],
        formatter: '{value}'
      },
      data: [{ value: overallScore }]
    }]
  };

  return (
    <aside className="left-panel space-y-4 pr-2">
      {/* 一级指标卡片 */}
      <div className="tech-panel rounded-xl p-6 relative overflow-hidden bg-gradient-to-br from-gray-800/50 to-gray-900/50">
        <div className="corner corner-tl text-blue-500"></div>
        <div className="corner corner-br text-blue-500"></div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">总体安全态势指数（一级指标）</h3>
            <div className="flex items-baseline space-x-3">
              <span id="overall-score" className="text-5xl digit font-bold text-white">{overallScore}</span>
              <span className="text-xl text-gray-500">/100</span>
            </div>
          </div>
          <div id="overall-grade" className={`px-4 py-2 rounded-lg border font-bold text-lg ${getOverallGrade(overallScore).cls}`}>
            {getOverallGrade(overallScore).text}
          </div>
        </div>
        
        {/* 四级指标摘要 */}
        <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
          <div className="p-2 bg-gray-800/50 rounded border border-gray-700">
            <div className="text-gray-500">一级指标</div>
            <div className="text-white font-bold mt-1">总体态势指数</div>
          </div>
          <div className="p-2 bg-gray-800/50 rounded border border-gray-700">
            <div className="text-gray-500">二级维度</div>
            <div className="text-white font-bold mt-1">4个维度</div>
          </div>
          <div className="p-2 bg-gray-800/50 rounded border border-gray-700">
            <div className="text-gray-500">三级指标</div>
            <div className="text-white font-bold mt-1">17个分类</div>
          </div>
          <div className="p-2 bg-gray-800/50 rounded border border-gray-700">
            <div className="text-gray-500">四级指标</div>
            <div className="text-white font-bold mt-1">40+监测项</div>
          </div>
        </div>
        
        {/* 仪表盘图表 */}
        <div id="gaugeChart" className="w-full h-48 mt-4">
          <ReactECharts option={gaugeOption} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
      
      {/* 二级指标：四个维度卡片 */}
      <div className="tech-panel rounded-xl p-5 relative flex-1">
        <div className="corner corner-tl text-blue-500"></div>
        <div className="corner corner-br text-blue-500"></div>
        <h3 className="text-lg font-bold text-white mb-4 flex items-center">
          <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
          二级维度指标（权重分配）
        </h3>
        
        <div className="space-y-3" id="dimensions-container">
          {indicatorSystem.dimensions.map((dim, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg hover:bg-opacity-20 transition-all cursor-pointer group ${getDimensionColor(dim.grade)}`}
              onClick={() => setSelectedDimension(index)}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{Math.round(dim.weight * 100)}%</span>
                  <span className="text-white font-medium">{dim.name}</span>
                </div>
                <span className="text-2xl digit font-bold">{dim.score}</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_#3B82F6]" style={{ width: `${dim.score}%` }}></div>
              </div>
              <div className="mt-2 text-xs text-gray-400 flex justify-between">
                <span>{dim.indicators.map(ind => ind.name).join(' • ')}</span>
                <span>{getGradeText(dim.grade)}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* 三级指标详情（动态显示） */}
        {selectedDimension !== null && (
          <div id="tertiary-panel" className="mt-4 pt-4 border-t border-gray-700">
            <h4 className="text-sm font-bold text-gray-300 mb-3" id="tertiary-title">
              {indicatorSystem.dimensions[selectedDimension].name} - 三级指标详情
            </h4>
            <div className="space-y-2" id="tertiary-content">
              {indicatorSystem.dimensions[selectedDimension].indicators.map((ind, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-gray-500 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-white font-medium">{ind.name}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-gray-400">权重 {Math.round(ind.weight * 100)}%</span>
                      <span className={`text-lg digit font-bold ${ind.score >= 80 ? 'text-blue-400' : ind.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {ind.score}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden mb-2">
                    <div className={`h-full ${ind.score >= 80 ? 'bg-blue-500' : ind.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${ind.score}%` }}></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    包含四级指标: {ind.items.map(i => i.name).join('、')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default LeftPanel;
