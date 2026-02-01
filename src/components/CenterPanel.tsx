import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { trendData, dataStreamLogs } from '../data/mockData';

const CenterPanel: React.FC = () => {
  const [dataStream, setDataStream] = useState<string[]>([]);

  useEffect(() => {
    // 初始化数据流
    setDataStream(dataStreamLogs.slice(0, 5));

    // 模拟数据流更新
    const interval = setInterval(() => {
      const randomLog = dataStreamLogs[Math.floor(Math.random() * dataStreamLogs.length)];
      const time = new Date().toLocaleTimeString('zh-CN', { hour12: false });
      const newLog = `[${time}] ${randomLog.substring(randomLog.indexOf(']') + 2)}`;
      
      setDataStream(prev => {
        const updated = [newLog, ...prev];
        return updated.slice(0, 8); // 保持最多8条记录
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const trendOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#E5E7EB' }
    },
    legend: {
      data: ['基础运行', '脆弱性', '威胁', '数据安全', '总体态势'],
      textStyle: { color: '#9CA3AF' },
      top: 0
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: trendData.days,
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { color: '#6B7280' }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
      splitLine: { lineStyle: { color: 'rgba(55, 65, 81, 0.5)' } },
      axisLabel: { color: '#6B7280' }
    },
    series: [
      {
        name: '基础运行',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#3B82F6', width: 2 },
        data: trendData.baseRun
      },
      {
        name: '脆弱性',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#F59E0B', width: 2 },
        data: trendData.vulnerability
      },
      {
        name: '威胁',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#F97316', width: 2 },
        data: trendData.threat
      },
      {
        name: '数据安全',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#10B981', width: 2 },
        data: trendData.dataSecurity
      },
      {
        name: '总体态势',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: { color: '#E5E7EB', width: 3, type: 'dashed' },
        itemStyle: { color: '#E5E7EB', borderWidth: 2, borderColor: '#111827' },
        data: trendData.overall
      }
    ]
  };

  return (
    <main className="center-panel tech-panel rounded-xl p-6 relative flex flex-col">
      <div className="corner corner-tl text-blue-500"></div>
      <div className="corner corner-tr text-blue-500"></div>
      <div className="corner corner-bl text-blue-500"></div>
      <div className="corner corner-br text-blue-500"></div>
      <div className="scan-line"></div>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center">
            <span className="w-2 h-8 bg-blue-500 rounded-full mr-4"></span>
            全局态势感知视图
          </h2>
          <p className="text-sm text-gray-500 mt-1 ml-6">Real-time Global Situational Awareness</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm text-gray-300 hover:border-blue-500 hover:text-blue-400 transition-all">
            <span className="mr-2">📊</span>流量分析
          </button>
          <button className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm text-gray-300 hover:border-blue-500 hover:text-blue-400 transition-all">
            <span className="mr-2">🗺️</span>攻击地图
          </button>
          <button className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg text-sm text-blue-400">
            <span className="mr-2">⚡</span>实时监控
          </button>
        </div>
      </div>
      
      {/* 实时流量趋势（30天） */}
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-300">30天态势趋势分析</h3>
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="text-gray-400">基础运行</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="text-gray-400">脆弱性</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              <span className="text-gray-400">威胁</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-gray-400">数据安全</span>
            </div>
          </div>
        </div>
        <div id="trendChart" className="flex-1 w-full min-h-[300px]">
          <ReactECharts option={trendOption} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
      
      {/* 底部实时数据流 */}
      <div className="mt-4 h-32 bg-black/30 rounded-lg border border-gray-700 p-4 overflow-hidden relative">
        <div className="absolute top-2 left-4 text-xs text-gray-500 mono">REAL-TIME DATA STREAM</div>
        <div className="mt-6 space-y-2 font-mono text-sm" id="data-stream">
          {dataStream.map((log, index) => (
            <div 
              key={index} 
              className={`text-gray-400 mono text-xs hover:text-white transition-colors cursor-default ${log.includes('[ALERT]') ? 'text-red-400' : log.includes('[WARN]') ? 'text-yellow-400' : ''}`}
            >
              {log}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default CenterPanel;
