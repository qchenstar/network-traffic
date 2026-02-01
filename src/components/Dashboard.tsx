import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useTimer, useCurrentTime } from '../hooks/useTimer';
import type { FlowData, DimensionData, ThreatStats, Alert } from '../types';
import { SecurityLevel } from '../types';
import { createGaugeChartOption, createLineChartOption, createPieChartOption } from '../utils/chartUtils';
import AlertItem from './ui/AlertItem';

const Dashboard: React.FC = () => {
  const currentTime = useCurrentTime();
  const [timeRange, setTimeRange] = useState('day');
  
  // 模拟安全指数的微小变化
  const securityIndex = useTimer(1000, 74.8, (prev: number) => {
    const change = (Math.random() * 0.4 - 0.2);
    const newValue = prev + change;
    return parseFloat(Math.max(0, Math.min(100, newValue)).toFixed(1));
  });
  
  // 模拟流量数据变化
  const flowData = useTimer<FlowData>(1000, {
    labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
    values: Array.from({ length: 24 }, () => Math.floor(Math.random() * 1000) + 100)
  }, (prev) => ({
    ...prev,
    values: prev.values.map((val, i) => {
      if (i === new Date().getHours()) {
        return Math.floor(Math.random() * 1000) + 100;
      }
      return val;
    })
  }));

  // 获取安全等级颜色
  const getSecurityLevelColor = (index: number): string => {
    if (index >= 80) return '#10B981'; // 绿色 - 安全
    if (index >= 60) return '#F59E0B'; // 黄色 - 警告
    if (index >= 40) return '#F97316'; // 橙色 - 高危
    return '#EF4444'; // 红色 - 严重
  };

  // 获取安全等级
  const getSecurityLevel = (index: number): string => {
    if (index >= 80) return SecurityLevel.SAFE;
    if (index >= 60) return SecurityLevel.WARNING;
    if (index >= 40) return SecurityLevel.HIGH_RISK;
    return SecurityLevel.CRITICAL;
  };

  // 总体态势仪表盘配置
  const overallSituationOption = createGaugeChartOption(securityIndex);

  // 四大维度指数数据
  const dimensionData: DimensionData[] = [
    {
      name: '网络安全',
      value: 82,
      change: 2.5,
      color: '#3B82F6'
    },
    {
      name: '系统安全',
      value: 75,
      change: -1.2,
      color: '#8B5CF6'
    },
    {
      name: '应用安全',
      value: 68,
      change: 3.8,
      color: '#EC4899'
    },
    {
      name: '数据安全',
      value: 85,
      change: 0.5,
      color: '#10B981'
    }
  ];

  // 趋势分析图数据
  const trendData = {
    day: {
      labels: Array.from({ length: 7 }, (_, i) => `${i+1}日`),
      values: [72, 75, 73, 78, 76, 74, 75]
    },
    week: {
      labels: Array.from({ length: 4 }, (_, i) => `第${i+1}周`),
      values: [72, 75, 73, 75]
    },
    month: {
      labels: Array.from({ length: 6 }, (_, i) => `${i+1}月`),
      values: [70, 72, 75, 73, 74, 75]
    }
  };

  // 趋势分析图配置
  const getTrendOption = () => {
    const data = trendData[timeRange as keyof typeof trendData];
    const option = createLineChartOption(data.values, data.labels, '#3B82F6', '安全态势指数');
    
    // 添加额外的配置
    option.yAxis = {
      ...option.yAxis,
      min: 60,
      max: 90
    };
    
    // 添加标记点
    if (option.series && option.series.length > 0) {
      option.series[0] = {
        ...option.series[0],
        lineStyle: {
          ...option.series[0].lineStyle,
          width: 3
        },
        markPoint: {
          data: [
            { type: 'max', name: '最大值' },
            { type: 'min', name: '最小值' }
          ],
          label: {
            color: '#E5E7EB'
          },
          itemStyle: {
            color: '#F59E0B'
          }
        }
      };
    }
    
    return option;
  };

  // 今日威胁统计数据
  const threatStats: ThreatStats = {
    attacks: 128,
    alerts: 56,
    vulnerabilities: 8
  };

  // 最新告警列表
  const latestAlerts: Alert[] = [
    {
      id: 1,
      type: 'DDoS攻击',
      severity: '高',
      source: '192.168.1.100',
      time: '10:30:45',
      status: '未处理'
    },
    {
      id: 2,
      type: 'SQL注入',
      severity: '中',
      source: '10.0.0.50',
      time: '09:15:22',
      status: '处理中'
    },
    {
      id: 3,
      type: 'XSS攻击',
      severity: '中',
      source: '172.16.0.25',
      time: '08:45:10',
      status: '已处理'
    },
    {
      id: 4,
      type: '恶意软件',
      severity: '高',
      source: '192.168.2.75',
      time: '07:20:33',
      status: '未处理'
    },
    {
      id: 5,
      type: '暴力破解',
      severity: '低',
      source: '10.0.0.125',
      time: '06:55:47',
      status: '已处理'
    }
  ];

  // 流量概览配置
  const flowOverviewOption = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: flowData.labels,
      axisLabel: {
        color: '#9CA3AF',
        rotate: 45
      },
      axisLine: {
        lineStyle: {
          color: '#374151'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '流量 (Mbps)',
      nameTextStyle: {
        color: '#9CA3AF'
      },
      axisLabel: {
        color: '#9CA3AF'
      },
      axisLine: {
        lineStyle: {
          color: '#374151'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(55, 65, 81, 0.5)'
        }
      }
    },
    series: [
      {
        name: '实时流量',
        type: 'line',
        smooth: true,
        data: flowData.values,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(139, 92, 246, 0.3)'
            }, {
              offset: 1, color: 'rgba(139, 92, 246, 0.1)'
            }]
          }
        },
        lineStyle: {
          color: '#8B5CF6',
          width: 2
        },
        itemStyle: {
          color: '#8B5CF6'
        }
      }
    ]
  };

  // 协议分布饼图配置
  const protocolDistributionOption = createPieChartOption(
    [
      { value: 45, name: 'HTTP', itemStyle: { color: '#3B82F6' } },
      { value: 25, name: 'HTTPS', itemStyle: { color: '#10B981' } },
      { value: 15, name: 'TCP', itemStyle: { color: '#F59E0B' } },
      { value: 10, name: 'UDP', itemStyle: { color: '#F97316' } },
      { value: 5, name: '其他', itemStyle: { color: '#8B5CF6' } }
    ],
    '协议分布'
  );

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen">
      
      {/* 总体态势仪表盘 */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-300">总体态势</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-1/2 h-80">
            <ReactECharts option={overallSituationOption} style={{ height: '100%', width: '100%' }} />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-400">安全等级</p>
              <p className="text-2xl font-bold" style={{ color: getSecurityLevelColor(securityIndex) }}>
                {getSecurityLevel(securityIndex)}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-400">更新时间</p>
                <p className="text-lg font-medium text-white">{currentTime.toLocaleTimeString('zh-CN', { hour12: false })}</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-sm text-gray-400">评估周期</p>
                <p className="text-lg font-medium text-white">实时</p>
              </div>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-400">态势摘要</p>
              <p className="text-gray-300">
                当前网络安全态势整体{securityIndex >= 60 ? '良好' : '严峻'}，
                {securityIndex >= 80 ? '未发现重大安全威胁' : 
                 securityIndex >= 60 ? '存在部分安全隐患，需要关注' : 
                 securityIndex >= 40 ? '存在严重安全威胁，需要立即处理' : 
                 '网络安全面临严重威胁，需要紧急响应'}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 四大维度指数卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dimensionData.map((dimension, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-300">{dimension.name}</h3>
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dimension.color }}></div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold" style={{ color: dimension.color }}>{dimension.value}</p>
                <p className={`text-sm mt-1 ${dimension.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {dimension.change >= 0 ? '↑' : '↓'} {Math.abs(dimension.change)}%
                </p>
              </div>
              <div className="w-24 h-16">
                <ReactECharts 
                  option={{
                    grid: {
                      left: '0%',
                      right: '0%',
                      bottom: '0%',
                      top: '0%',
                      containLabel: true
                    },
                    xAxis: {
                      show: false
                    },
                    yAxis: {
                      show: false
                    },
                    series: [
                      {
                        type: 'line',
                        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 30) + 60),
                        smooth: true,
                        lineStyle: {
                          color: dimension.color,
                          width: 2
                        },
                        areaStyle: {
                          color: {
                            type: 'linear',
                            x: 0, y: 0, x2: 0, y2: 1,
                            colorStops: [{
                              offset: 0, color: `${dimension.color}40`
                            }, {
                              offset: 1, color: `${dimension.color}10`
                            }]
                          }
                        },
                        symbol: 'none'
                      }
                    ]
                  }}
                  style={{ height: '100%', width: '100%' }}
                />
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors">
              查看详情
            </button>
          </div>
        ))}
      </div>
      
      {/* 趋势分析图 */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-300">趋势分析</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 rounded-lg text-sm ${timeRange === 'day' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              onClick={() => setTimeRange('day')}
            >
              日
            </button>
            <button 
              className={`px-3 py-1 rounded-lg text-sm ${timeRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              onClick={() => setTimeRange('week')}
            >
              周
            </button>
            <button 
              className={`px-3 py-1 rounded-lg text-sm ${timeRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              onClick={() => setTimeRange('month')}
            >
              月
            </button>
          </div>
        </div>
        <div className="h-80">
          <ReactECharts option={getTrendOption()} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 威胁速览 */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">威胁速览</h2>
          
          {/* 今日威胁统计 */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-400">攻击次数</p>
              <p className="text-2xl font-bold text-white">{threatStats.attacks}</p>
              <p className="text-xs text-red-400">↑ 12%</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-400">告警数量</p>
              <p className="text-2xl font-bold text-white">{threatStats.alerts}</p>
              <p className="text-xs text-yellow-400">↑ 5%</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-400">新增漏洞</p>
              <p className="text-2xl font-bold text-white">{threatStats.vulnerabilities}</p>
              <p className="text-xs text-green-400">↓ 3%</p>
            </div>
          </div>
          
          {/* 最新告警列表 */}
          <h3 className="font-medium text-gray-300 mb-3">最新告警 (Top 5)</h3>
          <div className="space-y-3">
            {latestAlerts.map((alert) => (
              <AlertItem
                key={alert.id}
                id={alert.id}
                type={alert.type}
                severity={alert.severity}
                source={alert.source}
                time={alert.time}
                status={alert.status}
              />
            ))}
          </div>
          <button className="w-full mt-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-gray-300 transition-colors">
            查看全部告警
          </button>
        </div>
        
        {/* 流量概览 */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">流量概览</h2>
          
          {/* 流量统计 */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-400">流量峰值</p>
              <p className="text-2xl font-bold text-white">987 Mbps</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-400">流量均值</p>
              <p className="text-2xl font-bold text-white">456 Mbps</p>
            </div>
            <div className="bg-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-400">当前流量</p>
              <p className="text-2xl font-bold text-white">{flowData.values[new Date().getHours()]} Mbps</p>
            </div>
          </div>
          
          {/* 实时流量曲线 */}
          <div className="h-60 mb-6">
            <ReactECharts option={flowOverviewOption} style={{ height: '100%', width: '100%' }} />
          </div>
          
          {/* 协议分布饼图 */}
          <div className="h-60">
            <ReactECharts option={protocolDistributionOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;