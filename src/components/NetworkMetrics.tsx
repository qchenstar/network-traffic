import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

const NetworkMetrics: React.FC = () => {
  const [metrics] = useState({
    // 基础网络指标
    totalFlow: '1.239TB',
    totalPackets: '1,500,107,139',
    tcpFlow: '902.288GB',
    tcpPackets: '1,006,687,048',
    udpFlow: '366.256GB',
    udpPackets: '493,420,091',
    packetRetransmitRate: '2.38%',
    clientRetransmitRate: '0.54%',
    clientNetworkDelay: '12ms',
    serverNetworkDelay: '8ms',
    alertCount: '42',
    
    // 校园网络特有指标
    // 用户指标
    onlineUsers: '12,456',
    peakOnlineUsers: '15,892',
    activeUsers: '8,765',
    avgConcurrentUsers: '10,234',
    
    // 带宽指标
    peakBandwidthUtilization: '87.5%',
    avgBandwidthUtilization: '45.2%',
    bandwidthTrend: '↑ 12.3%',
    bandwidthAlertThreshold: '90%',
    
    // 应用指标
    videoTrafficRatio: '45.8%',
    educationalTrafficRatio: '28.3%',
    p2pTrafficRatio: '12.5%',
    httpTrafficRatio: '13.4%',
    
    // 网络质量指标
    networkDelayDistribution: '10-50ms',
    packetLossRate: '0.23%',
    jitterValue: '5ms',
    dnsSuccessRate: '99.9%',
    
    // 安全指标
    securityAlerts: '42',
    abnormalTrafficDetected: '15',
    maliciousIpAccess: '8',
    ddosAttackDetected: '0'
  });

  // 以太网帧长度统计图表配置
  const ethernetFrameLengthOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#E5E7EB' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      axisLabel: {
        color: '#9CA3AF',
        fontSize: 10
      },
      axisLine: {
        lineStyle: {
          color: '#374151'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '帧数量',
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
        name: '以太网帧长度',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: Array.from({ length: 24 }, () => 45000000),
        itemStyle: {
          color: function(params: any) {
            const colorList = ['#3B82F6', '#60A5FA', '#93C5FD'];
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: colorList[0] },
                { offset: 0.5, color: colorList[1] },
                { offset: 1, color: colorList[2] }
              ]
            };
          }
        }
      }
    ]
  };

  // 应用流量分布饼图配置
  const applicationTrafficOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#E5E7EB' }
    },
    legend: {
      orient: 'vertical',
      left: 10,
      top: 'center',
      textStyle: {
        color: '#9CA3AF',
        fontSize: 10
      }
    },
    series: [
      {
        name: '应用流量',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#111827',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'center',
          formatter: '{b}\n{c} TB ({d}%)',
          color: '#E5E7EB',
          fontSize: 14,
          fontWeight: 'bold'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold',
            color: '#E5E7EB'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 25.34, name: 'SSL/TLS', itemStyle: { color: '#3B82F6' } },
          { value: 12.04, name: 'HTTPS', itemStyle: { color: '#10B981' } },
          { value: 5.61, name: '迅雷', itemStyle: { color: '#F59E0B' } },
          { value: 4.01, name: '腾讯视频', itemStyle: { color: '#EC4899' } },
          { value: 3.04, name: 'Google QUIC', itemStyle: { color: '#8B5CF6' } },
          { value: 2.86, name: 'HTTP_Download', itemStyle: { color: '#F97316' } },
          { value: 2.3, name: 'Steam游戏平台', itemStyle: { color: '#6366F1' } },
          { value: 1.4, name: '苹果服务', itemStyle: { color: '#EC4899' } },
          { value: 1.12, name: '米哈游', itemStyle: { color: '#10B981' } },
          { value: 1.03, name: '腾讯服务', itemStyle: { color: '#F59E0B' } },
          { value: 0.92, name: '歪歪', itemStyle: { color: '#3B82F6' } },
          { value: 0.91, name: '小红书', itemStyle: { color: '#EC4899' } },
          { value: 0.9, name: '华为云空间', itemStyle: { color: '#10B981' } }
        ]
      }
    ]
  };

  // 带宽趋势图表配置
  const bandwidthTrendOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#E5E7EB' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      axisLabel: {
        color: '#9CA3AF',
        fontSize: 10
      },
      axisLine: {
        lineStyle: {
          color: '#374151'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '带宽使用率',
      nameTextStyle: {
        color: '#9CA3AF'
      },
      axisLabel: {
        color: '#9CA3AF',
        formatter: '{value}%'
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
        name: '带宽使用率',
        type: 'line',
        smooth: true,
        data: [25, 15, 35, 65, 85, 75],
        itemStyle: {
          color: '#3B82F6'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
            ]
          }
        }
      }
    ]
  };

  // 应用流量分布图表配置
  const applicationDistributionOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#E5E7EB' }
    },
    legend: {
      orient: 'vertical',
      left: 10,
      top: 'center',
      textStyle: {
        color: '#9CA3AF',
        fontSize: 10
      }
    },
    series: [
      {
        name: '应用流量分布',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#111827',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'center',
          formatter: '{b}\n{c}%',
          color: '#E5E7EB',
          fontSize: 14,
          fontWeight: 'bold'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold',
            color: '#E5E7EB'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 45.8, name: '视频流', itemStyle: { color: '#3B82F6' } },
          { value: 28.3, name: '教育应用', itemStyle: { color: '#10B981' } },
          { value: 12.5, name: 'P2P下载', itemStyle: { color: '#F59E0B' } },
          { value: 13.4, name: 'HTTP/HTTPS', itemStyle: { color: '#EC4899' } }
        ]
      }
    ]
  };

  // 协议过滤状态管理
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // 校园网络常见协议列表
  const protocols = [
    'HTTP',
    'HTTPS',
    'Google QUIC',
    'SSL/TLS',
    'STUN',
    'Steam游戏',
    'P2P下载',
    '视频流',
    '教育应用',
    'DNS',
    'FTP',
    'SSH',
    'SMTP',
    'IMAP',
    'POP3',
    'RDP',
    'VPN',
    'IPv6',
    'ICMP'
  ];

  // 全选/取消全选功能
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProtocols([]);
      setSelectAll(false);
    } else {
      setSelectedProtocols(protocols);
      setSelectAll(true);
    }
  };

  // 单个协议选择/取消选择
  const handleProtocolChange = (protocol: string) => {
    if (selectedProtocols.includes(protocol)) {
      setSelectedProtocols(selectedProtocols.filter(p => p !== protocol));
    } else {
      setSelectedProtocols([...selectedProtocols, protocol]);
    }
  };

  // 协议流量趋势图表配置
  const protocolTrafficTrendOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#E5E7EB' }
    },
    legend: {
      data: ['HTTP/HTTPS', '视频流', 'P2P下载', '教育应用'],
      textStyle: {
        color: '#9CA3AF',
        fontSize: 10
      },
      top: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      axisLabel: {
        color: '#9CA3AF',
        fontSize: 10
      },
      axisLine: {
        lineStyle: {
          color: '#374151'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '流量 (GB)',
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
        name: 'HTTP/HTTPS',
        type: 'line',
        smooth: true,
        data: [15, 10, 25, 45, 55, 40],
        itemStyle: {
          color: '#3B82F6'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
            ]
          }
        }
      },
      {
        name: '视频流',
        type: 'line',
        smooth: true,
        data: [25, 15, 30, 60, 80, 65],
        itemStyle: {
          color: '#10B981'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0.1)' }
            ]
          }
        }
      },
      {
        name: 'P2P下载',
        type: 'line',
        smooth: true,
        data: [10, 5, 15, 30, 25, 40],
        itemStyle: {
          color: '#F59E0B'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(245, 158, 11, 0.3)' },
              { offset: 1, color: 'rgba(245, 158, 11, 0.1)' }
            ]
          }
        }
      },
      {
        name: '教育应用',
        type: 'line',
        smooth: true,
        data: [20, 12, 35, 50, 40, 30],
        itemStyle: {
          color: '#EC4899'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(236, 72, 153, 0.3)' },
              { offset: 1, color: 'rgba(236, 72, 153, 0.1)' }
            ]
          }
        }
      }
    ]
  };

  // 异常检测配置
  const [anomalies, setAnomalies] = useState([
    { id: 1, type: '异常流量', protocol: 'P2P下载', value: '1.2GB/s', time: '14:32:45', severity: 'high' },
    { id: 2, type: '异常连接', protocol: 'HTTPS', value: '500+ 并发', time: '13:15:22', severity: 'medium' },
    { id: 3, type: '带宽异常', protocol: '视频流', value: '95% 使用率', time: '12:45:10', severity: 'high' },
    { id: 4, type: '延迟异常', protocol: '教育应用', value: '200ms', time: '11:30:05', severity: 'medium' },
    { id: 5, type: '丢包异常', protocol: 'HTTP', value: '5% 丢包率', time: '10:15:30', severity: 'low' }
  ]);

  // 协议流量走势图配置（简化版）
  const protocolTrafficMiniChartOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#E5E7EB' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: '协议流量',
        type: 'line',
        smooth: true,
        data: [15, 10, 25, 45, 55, 40],
        itemStyle: {
          color: '#3B82F6'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
            ]
          }
        },
        lineStyle: {
          width: 2
        },
        symbol: 'none'
      }
    ]
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen">
      {/* 流量指标面板 */}
      <div className="bg-gray-800 rounded-xl p-6 mb-8 shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-blue-300">流量指标监控</h2>
        
        {/* 网络选择器 */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <select className="bg-gray-700 border border-gray-600 text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
              <option>所有网络</option>
              <option>内网</option>
              <option>外网</option>
              <option>DMZ区</option>
            </select>
            <div className="text-sm text-gray-400">
              数据更新时间: {new Date().toLocaleString('zh-CN')}
            </div>
          </div>
        </div>

        {/* 主要指标卡片 - 第一行 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-700 rounded-lg p-5 shadow-lg border border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-300">总流量</h3>
                <div className="text-sm text-gray-400">当前值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400">📊</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.totalFlow}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-5 shadow-lg border border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-300">总包数</h3>
                <div className="text-sm text-gray-400">当前值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400">📦</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.totalPackets}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-5 shadow-lg border border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-300">TCP总流量</h3>
                <div className="text-sm text-gray-400">当前值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400">🔄</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.tcpFlow}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-5 shadow-lg border border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-300">TCP总包数</h3>
                <div className="text-sm text-gray-400">当前值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400">📋</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.tcpPackets}</div>
          </div>

        </div>

        {/* 主要指标卡片 - 第二行 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-700 rounded-lg p-5 shadow-lg border border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-300">UDP总流量</h3>
                <div className="text-sm text-gray-400">当前值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400">🔄</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.udpFlow}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-5 shadow-lg border border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-300">UDP总包数</h3>
                <div className="text-sm text-gray-400">当前值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400">📋</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.udpPackets}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-5 shadow-lg border border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-300">数据包重传率</h3>
                <div className="text-sm text-gray-400">当前值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <span className="text-yellow-400">🔄</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.packetRetransmitRate}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-5 shadow-lg border border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-300">客户端重传率</h3>
                <div className="text-sm text-gray-400">当前值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <span className="text-yellow-400">🔄</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.clientRetransmitRate}</div>
          </div>

        </div>

        {/* 主要指标卡片 - 第三行 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-700 rounded-lg p-5 shadow-lg border border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-300">客户端网络时延</h3>
                <div className="text-sm text-gray-400">均值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400">⏱️</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.clientNetworkDelay}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-300">服务端网络时延</h3>
                <div className="text-sm text-gray-400">均值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400">⏱️</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.serverNetworkDelay}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-medium text-gray-300">告警数量</h3>
                <div className="text-sm text-gray-400">当前值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400">⚠️</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.alertCount}</div>
          </div>
        </div>

        {/* 校园网络特有指标 - 用户指标 */}
        <h3 className="text-lg font-semibold mb-4 text-blue-300 mt-8">用户指标</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">当前在线用户</h4>
                <div className="text-sm text-gray-400">实时值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400">👥</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.onlineUsers}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">峰值在线用户</h4>
                <div className="text-sm text-gray-400">今日峰值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400">📈</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.peakOnlineUsers}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">活跃用户数</h4>
                <div className="text-sm text-gray-400">过去24小时</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400">⚡</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.activeUsers}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">平均并发用户</h4>
                <div className="text-sm text-gray-400">今日平均值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400">📊</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.avgConcurrentUsers}</div>
          </div>
        </div>

        {/* 校园网络特有指标 - 带宽指标 */}
        <h3 className="text-lg font-semibold mb-4 text-blue-300 mt-8">带宽指标</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">峰值带宽使用率</h4>
                <div className="text-sm text-gray-400">今日峰值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <span className="text-yellow-400">📈</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.peakBandwidthUtilization}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">平均带宽使用率</h4>
                <div className="text-sm text-gray-400">今日平均值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <span className="text-yellow-400">📊</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.avgBandwidthUtilization}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">带宽趋势</h4>
                <div className="text-sm text-gray-400">较昨日</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400">📈</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.bandwidthTrend}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">带宽告警阈值</h4>
                <div className="text-sm text-gray-400">当前设置</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400">⚠️</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.bandwidthAlertThreshold}</div>
          </div>
        </div>

        {/* 校园网络特有指标 - 应用指标 */}
        <h3 className="text-lg font-semibold mb-4 text-blue-300 mt-8">应用指标</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">视频流量占比</h4>
                <div className="text-sm text-gray-400">当前值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400">🎬</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.videoTrafficRatio}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">教育流量占比</h4>
                <div className="text-sm text-gray-400">当前值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400">🎓</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.educationalTrafficRatio}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">P2P流量占比</h4>
                <div className="text-sm text-gray-400">当前值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <span className="text-yellow-400">🔄</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.p2pTrafficRatio}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">HTTP流量占比</h4>
                <div className="text-sm text-gray-400">当前值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-400">🌐</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.httpTrafficRatio}</div>
          </div>
        </div>

        {/* 校园网络特有指标 - 网络质量指标 */}
        <h3 className="text-lg font-semibold mb-4 text-blue-300 mt-8">网络质量指标</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">网络延迟分布</h4>
                <div className="text-sm text-gray-400">当前值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400">⏱️</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.networkDelayDistribution}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">数据包丢失率</h4>
                <div className="text-sm text-gray-400">当前值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400">📊</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.packetLossRate}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">网络抖动值</h4>
                <div className="text-sm text-gray-400">当前值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <span className="text-yellow-400">📈</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.jitterValue}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">DNS解析成功率</h4>
                <div className="text-sm text-gray-400">当前值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400">✅</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.dnsSuccessRate}</div>
          </div>
        </div>

        {/* 校园网络特有指标 - 安全指标 */}
        <h3 className="text-lg font-semibold mb-4 text-blue-300 mt-8">安全指标</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">安全告警数</h4>
                <div className="text-sm text-gray-400">今日值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400">⚠️</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.securityAlerts}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">异常流量检测</h4>
                <div className="text-sm text-gray-400">今日值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                <span className="text-yellow-400">🔍</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.abnormalTrafficDetected}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">恶意IP访问</h4>
                <div className="text-sm text-gray-400">今日值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400">🚫</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.maliciousIpAccess}</div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 shadow-lg border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-300">DDoS攻击检测</h4>
                <div className="text-sm text-gray-400">今日值</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400">🛡️</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white">{metrics.ddosAttackDetected}</div>
          </div>
        </div>
      </div>

      {/* 应用TOP和以太网帧长度统计 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 应用TOP饼图 */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="font-semibold mb-4 text-blue-300">应用TOP</h3>
          <div className="h-80">
            <ReactECharts option={applicationTrafficOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        {/* 以太网帧长度统计 */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="font-semibold mb-4 text-blue-300">以太网帧长度统计</h3>
          <div className="h-80">
            <ReactECharts option={ethernetFrameLengthOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>

      {/* 带宽趋势和应用流量分布 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 带宽趋势图表 */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="font-semibold mb-4 text-blue-300">带宽趋势</h3>
          <div className="h-80">
            <ReactECharts option={bandwidthTrendOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        {/* 应用流量分布图表 */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="font-semibold mb-4 text-blue-300">应用流量分布</h3>
          <div className="h-80">
            <ReactECharts option={applicationDistributionOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>

      {/* 协议流量趋势和异常检测 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 协议流量趋势图表 */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="font-semibold mb-4 text-blue-300">协议流量趋势</h3>
          <div className="h-80">
            <ReactECharts option={protocolTrafficTrendOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        {/* 异常检测面板 */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h3 className="font-semibold mb-4 text-blue-300">异常检测</h3>
          <div className="space-y-4">
            {anomalies.map((anomaly) => (
              <div 
                key={anomaly.id} 
                className={`p-4 rounded-lg border ${anomaly.severity === 'high' ? 'border-red-500 bg-red-500/10' : anomaly.severity === 'medium' ? 'border-yellow-500 bg-yellow-500/10' : 'border-blue-500 bg-blue-500/10'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-white">{anomaly.type}</h4>
                    <div className="text-sm text-gray-400">{anomaly.protocol}</div>
                  </div>
                  <div className={`text-sm font-bold ${anomaly.severity === 'high' ? 'text-red-400' : anomaly.severity === 'medium' ? 'text-yellow-400' : 'text-blue-400'}`}>
                    {anomaly.severity === 'high' ? '高' : anomaly.severity === 'medium' ? '中' : '低'}风险
                  </div>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="text-xl font-bold text-white">{anomaly.value}</div>
                  <div className="text-sm text-gray-400">{anomaly.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 协议过滤 */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-300">协议过滤</h2>
        
        {/* 全选/取消全选 */}
        <div className="mb-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={selectAll} 
              onChange={handleSelectAll}
              className="text-blue-400"
            />
            <span className="text-gray-300 font-medium">全选/取消全选</span>
          </label>
        </div>
        
        {/* 协议流量走势图 */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-2">协议流量趋势</h3>
          <div className="h-32 bg-gray-700 rounded-lg p-2">
            <ReactECharts option={protocolTrafficMiniChartOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
        
        {/* 协议列表 - 多行多列布局 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {protocols.map((protocol) => (
            <label 
              key={protocol} 
              className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <input 
                type="checkbox" 
                checked={selectedProtocols.includes(protocol)} 
                onChange={() => handleProtocolChange(protocol)}
                className="text-blue-400"
              />
              <span className="text-gray-300">{protocol}</span>
            </label>
          ))}
        </div>
        
        {/* 选中的协议数量统计 */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="text-sm text-gray-400">
            已选择 {selectedProtocols.length} / {protocols.length} 个协议
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkMetrics;