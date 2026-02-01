import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const HistoricalAnalysis: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [predictionDays, setPredictionDays] = useState(7)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 预测攻击趋势配置
  const predictiveTrendOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#E5E7EB' }
    },
    legend: {
      data: ['实际攻击', '预测攻击'],
      textStyle: { color: '#9CA3AF' },
      top: 0
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日'],
      axisLabel: { color: '#6B7280' },
      axisLine: { lineStyle: { color: '#333' } }
    },
    yAxis: {
      type: 'value',
      name: '攻击次数',
      nameTextStyle: { color: '#9CA3AF', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(55, 65, 81, 0.5)' } },
      axisLabel: { color: '#6B7280' },
      axisLine: { lineStyle: { color: '#333' } }
    },
    series: [
      {
        name: '实际攻击',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#3B82F6', width: 2 },
        itemStyle: { color: '#3B82F6' },
        areaStyle: { 
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(59, 130, 246, 0.3)'
            }, {
              offset: 1, color: 'rgba(59, 130, 246, 0.1)'
            }]
          }
        },
        data: [128, 135, 120, 142, 138, 155, 148, null, null, null, null, null, null, null]
      },
      {
        name: '预测攻击',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { 
          color: '#EF4444', 
          width: 2,
          type: 'dashed'
        },
        itemStyle: { color: '#EF4444' },
        areaStyle: { 
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(239, 68, 68, 0.3)'
            }, {
              offset: 1, color: 'rgba(239, 68, 68, 0.1)'
            }]
          }
        },
        data: [null, null, null, null, null, null, 148, 152, 160, 158, 165, 172, 168, 175]
      }
    ]
  }

  // 预测威胁类型分布配置
  const predictiveThreatTypeOption = {
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
        name: '威胁类型',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: '#111827',
          borderWidth: 2,
          color: function(params: any) {
            const colors = ['#EF4444', '#F97316', '#F59E0B', '#3B82F6', '#8B5CF6']
            return colors[params.dataIndex]
          }
        },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold', color: '#fff' }
        },
        data: [
          { value: 35, name: 'DDoS攻击' },
          { value: 25, name: 'SQL注入' },
          { value: 20, name: 'XSS攻击' },
          { value: 15, name: '恶意软件' },
          { value: 5, name: '其他' }
        ]
      }
    ]
  }

  // 预测攻击源地理位置分布配置
  const predictiveGeoOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#E5E7EB', fontSize: 12 }
    },
    grid: {
      left: '20%',
      right: '8%',
      top: '8%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      name: '预测攻击次数',
      nameTextStyle: { color: '#9CA3AF', fontSize: 12, align: 'center' },
      splitLine: { lineStyle: { color: 'rgba(55, 65, 81, 0.5)' } },
      axisLabel: { color: '#6B7280', fontSize: 12 }
    },
    yAxis: {
      type: 'category',
      data: ['加拿大', '巴西', '印度', '英国', '德国', '伊朗', '朝鲜', '中国', '美国', '俄罗斯'],
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { 
        color: '#E5E7EB', 
        fontSize: 12, 
        align: 'right', 
        padding: [0, 10, 0, 0],
        interval: 0
      },
      axisTick: {
        show: true
      }
    },
    series: [
      {
        name: '预测攻击源分布',
        type: 'bar',
        barWidth: '40%',
        data: [55, 60, 65, 75, 70, 82, 88, 95, 105, 140],
        itemStyle: {
          color: function(params: any) {
            const colors = ['#9CA3AF', '#6B7280', '#EC4899', '#6366F1', '#10B981', '#8B5CF6', '#3B82F6', '#F59E0B', '#F97316', '#EF4444']
            return colors[params.dataIndex]
          },
          borderRadius: [0, 6, 6, 0]
        },
        emphasis: {
          itemStyle: {
            color: '#EF4444'
          }
        },
        label: {
          show: true,
          position: 'right',
          color: '#E5E7EB',
          fontSize: 11,
          distance: 5
        }
      }
    ]
  }

  // 预测置信度配置
  const confidenceOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
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
      data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日'],
      axisLabel: {
        color: '#6B7280',
        rotate: 45
      },
      axisLine: {
        lineStyle: {
          color: '#333'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '置信度 (%)',
      nameTextStyle: {
        color: '#9CA3AF'
      },
      max: 100,
      axisLabel: {
        color: '#6B7280'
      },
      axisLine: {
        lineStyle: {
          color: '#333'
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
        name: '预测置信度',
        type: 'bar',
        data: [95, 92, 94, 90, 93, 91, 96],
        itemStyle: {
          color: function(params: any) {
            const value = params.value
            if (value >= 90) return '#10B981' // 绿色
            if (value >= 75) return '#F59E0B' // 黄色
            return '#EF4444' // 红色
          },
          borderRadius: [4, 4, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          color: '#E5E7EB',
          fontSize: 11
        }
      }
    ]
  }
  const [comparisonType, setComparisonType] = useState('week');
  const [customDateRange, setCustomDateRange] = useState({
    start: '',
    end: ''
  });
  const [trendData] = useState({
    week: {
      labels: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      current: [120, 132, 101, 134, 90, 230, 210],
      previous: [100, 110, 90, 120, 80, 200, 180]
    },
    month: {
      labels: ['1日', '5日', '10日', '15日', '20日', '25日', '30日'],
      current: [120, 132, 101, 134, 90, 230, 210],
      previous: [100, 110, 90, 120, 80, 200, 180]
    },
    custom: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      current: [120, 132, 101, 134, 90, 230],
      previous: [100, 110, 90, 120, 80, 200]
    }
  });

  // 趋势对比分析图表配置
  const getTrendComparisonOption = () => {
    const data = trendData[comparisonType as keyof typeof trendData];
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: comparisonType === 'week' ? ['本周', '上周'] : comparisonType === 'month' ? ['本月', '上月'] : ['当前', '对比'],
        textStyle: {
          color: '#e0e0e0'
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
        boundaryGap: false,
        data: data.labels,
        axisLabel: {
          color: '#e0e0e0'
        },
        axisLine: {
          lineStyle: {
            color: '#333'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: '安全事件数量',
        nameTextStyle: {
          color: '#e0e0e0'
        },
        axisLabel: {
          color: '#e0e0e0'
        },
        axisLine: {
          lineStyle: {
            color: '#333'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#222'
          }
        }
      },
      series: [
        {
          name: comparisonType === 'week' ? '本周' : comparisonType === 'month' ? '本月' : '当前',
          type: 'line',
          stack: 'Total',
          areaStyle: {
            color: 'rgba(54, 162, 235, 0.2)'
          },
          emphasis: {
            focus: 'series'
          },
          data: data.current,
          lineStyle: {
            color: '#36a2eb'
          },
          itemStyle: {
            color: '#36a2eb'
          }
        },
        {
          name: comparisonType === 'week' ? '上周' : comparisonType === 'month' ? '上月' : '对比',
          type: 'line',
          stack: 'Total',
          areaStyle: {
            color: 'rgba(255, 99, 132, 0.2)'
          },
          emphasis: {
            focus: 'series'
          },
          data: data.previous,
          lineStyle: {
            color: '#ff6384'
          },
          itemStyle: {
            color: '#ff6384'
          }
        }
      ]
    };
  };

  const [eventTab, setEventTab] = useState('timeline');

  // 安全事件时间轴数据
  const securityEvents = [
    { id: 1, time: '2024-01-15 08:30:00', type: 'DDoS攻击', severity: '高', status: '已处理', details: '针对主站的大规模DDoS攻击，流量峰值达到1.2Tbps' },
    { id: 2, time: '2024-01-16 14:45:00', type: 'SQL注入', severity: '中', status: '已处理', details: '尝试通过登录页面进行SQL注入攻击' },
    { id: 3, time: '2024-01-17 10:15:00', type: 'XSS攻击', severity: '中', status: '已处理', details: '在评论区发现XSS攻击脚本' },
    { id: 4, time: '2024-01-18 16:20:00', type: '恶意软件', severity: '高', status: '已处理', details: '服务器检测到恶意软件样本' },
    { id: 5, time: '2024-01-19 09:10:00', type: '暴力破解', severity: '中', status: '已处理', details: '针对管理员账户的暴力破解尝试' }
  ];

  // 攻击路径重构数据
  const attackPathData = {
    nodes: [
      { id: '1', name: '攻击者IP', symbolSize: 40, itemStyle: { color: '#ff6384' } },
      { id: '2', name: 'CDN', symbolSize: 30, itemStyle: { color: '#36a2eb' } },
      { id: '3', name: 'WAF', symbolSize: 30, itemStyle: { color: '#4bc0c0' } },
      { id: '4', name: '负载均衡', symbolSize: 30, itemStyle: { color: '#ffce56' } },
      { id: '5', name: 'Web服务器', symbolSize: 35, itemStyle: { color: '#9966ff' } },
      { id: '6', name: '数据库', symbolSize: 35, itemStyle: { color: '#ff9f40' } }
    ],
    links: [
      { source: '1', target: '2', lineStyle: { color: '#ff6384', width: 2 } },
      { source: '2', target: '3', lineStyle: { color: '#ff6384', width: 2 } },
      { source: '3', target: '4', lineStyle: { color: '#36a2eb', width: 2, type: 'dashed' } },
      { source: '4', target: '5', lineStyle: { color: '#36a2eb', width: 2, type: 'dashed' } },
      { source: '5', target: '6', lineStyle: { color: '#36a2eb', width: 2, type: 'dashed' } }
    ]
  };

  // 影响范围分析数据
  const impactRangeOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: '#e0e0e0'
      }
    },
    series: [
      {
        name: '影响范围',
        type: 'pie',
        radius: '60%',
        center: ['50%', '50%'],
        data: [
          { value: 30, name: '核心系统', itemStyle: { color: '#ff6384' } },
          { value: 25, name: '业务系统', itemStyle: { color: '#36a2eb' } },
          { value: 20, name: '用户数据', itemStyle: { color: '#ffce56' } },
          { value: 15, name: '网络设备', itemStyle: { color: '#4bc0c0' } },
          { value: 10, name: '其他', itemStyle: { color: '#9966ff' } }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  // 攻击路径图表配置
  const attackPathOption = {
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        type: 'graph',
        layout: 'force',
        force: {
          repulsion: 1000,
          edgeLength: [80, 120]
        },
        roam: true,
        label: {
          show: true,
          color: '#e0e0e0',
          fontSize: 12
        },
        data: attackPathData.nodes,
        links: attackPathData.links,
        lineStyle: {
          opacity: 0.9,
          width: 2,
          curveness: 0.1
        }
      }
    ]
  };

  const [periodicTab, setPeriodicTab] = useState('traffic');

  // 流量周期性规律数据
  const trafficPeriodicOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['工作日', '周末'],
      textStyle: {
        color: '#e0e0e0'
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
      type: 'value',
      axisLabel: {
        color: '#e0e0e0'
      },
      axisLine: {
        lineStyle: {
          color: '#333'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#222'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLabel: {
        color: '#e0e0e0'
      },
      axisLine: {
        lineStyle: {
          color: '#333'
        }
      }
    },
    series: [
      {
        name: '工作日',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 0, 0],
        itemStyle: {
          color: '#36a2eb'
        }
      },
      {
        name: '周末',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: [0, 0, 0, 0, 0, 230, 210],
        itemStyle: {
          color: '#ff6384'
        }
      }
    ]
  };

  // 攻击时间模式数据
  const attackTimePatternOption = {
    tooltip: {
      trigger: 'axis'
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
      boundaryGap: false,
      data: ['0时', '3时', '6时', '9时', '12时', '15时', '18时', '21时'],
      axisLabel: {
        color: '#e0e0e0'
      },
      axisLine: {
        lineStyle: {
          color: '#333'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '攻击次数',
      nameTextStyle: {
        color: '#e0e0e0'
      },
      axisLabel: {
        color: '#e0e0e0'
      },
      axisLine: {
        lineStyle: {
          color: '#333'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#222'
        }
      }
    },
    series: [
      {
        name: '攻击次数',
        type: 'line',
        smooth: true,
        data: [60, 40, 30, 80, 120, 150, 130, 90],
        areaStyle: {
          color: 'rgba(255, 99, 132, 0.2)'
        },
        lineStyle: {
          color: '#ff6384',
          width: 2
        },
        itemStyle: {
          color: '#ff6384'
        }
      }
    ]
  };

  // 异常行为周期数据
  const abnormalBehaviorOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['正常', '异常'],
      textStyle: {
        color: '#e0e0e0'
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
      data: ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周'],
      axisLabel: {
        color: '#e0e0e0'
      },
      axisLine: {
        lineStyle: {
          color: '#333'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '事件数量',
      nameTextStyle: {
        color: '#e0e0e0'
      },
      axisLabel: {
        color: '#e0e0e0'
      },
      axisLine: {
        lineStyle: {
          color: '#333'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#222'
        }
      }
    },
    series: [
      {
        name: '正常',
        type: 'bar',
        stack: 'total',
        data: [120, 132, 101, 134, 90, 230],
        itemStyle: {
          color: '#36a2eb'
        }
      },
      {
        name: '异常',
        type: 'bar',
        stack: 'total',
        data: [10, 15, 8, 20, 12, 25],
        itemStyle: {
          color: '#ff6384'
        }
      }
    ]
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen">
      
      {/* 趋势对比分析 */}
      <div className="bg-gray-800 rounded-xl p-4 mb-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-300">趋势对比分析</h2>
        
        {/* 对比选项控制 */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-400">对比类型:</label>
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 rounded-lg text-sm ${comparisonType === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                onClick={() => setComparisonType('week')}
              >
                本周vs上周
              </button>
              <button 
                className={`px-3 py-1 rounded-lg text-sm ${comparisonType === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                onClick={() => setComparisonType('month')}
              >
                本月vs上月
              </button>
              <button 
                className={`px-3 py-1 rounded-lg text-sm ${comparisonType === 'custom' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                onClick={() => setComparisonType('custom')}
              >
                自定义
              </button>
            </div>
          </div>
          
          {/* 自定义时间范围选择 */}
          {comparisonType === 'custom' && (
            <div className="flex items-center space-x-2">
              <input 
                type="date" 
                className="bg-gray-700 border border-gray-600 text-gray-100 py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={customDateRange.start}
                onChange={(e) => setCustomDateRange({...customDateRange, start: e.target.value})}
              />
              <span className="text-gray-400">至</span>
              <input 
                type="date" 
                className="bg-gray-700 border border-gray-600 text-gray-100 py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={customDateRange.end}
                onChange={(e) => setCustomDateRange({...customDateRange, end: e.target.value})}
              />
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500">
                应用
              </button>
            </div>
          )}
        </div>
        
        <div className="h-80">
          <ReactECharts option={getTrendComparisonOption()} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 安全事件溯源 */}
        <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">安全事件溯源</h2>
          
          {/* 事件溯源标签页 */}
          <div className="flex space-x-2 mb-4 border-b border-gray-700">
            <button 
              className={`px-4 py-2 rounded-t-lg text-sm ${eventTab === 'timeline' ? 'bg-gray-700 text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setEventTab('timeline')}
            >
              安全事件时间轴
            </button>
            <button 
              className={`px-4 py-2 rounded-t-lg text-sm ${eventTab === 'path' ? 'bg-gray-700 text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setEventTab('path')}
            >
              攻击路径重构
            </button>
            <button 
              className={`px-4 py-2 rounded-t-lg text-sm ${eventTab === 'impact' ? 'bg-gray-700 text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setEventTab('impact')}
            >
              影响范围分析
            </button>
          </div>
          
          {/* 标签页内容 */}
          <div className="h-80">
            {eventTab === 'timeline' && (
              <div className="overflow-y-auto h-full pr-2">
                {securityEvents.map((event, index) => (
                  <div key={event.id} className="flex mb-4">
                    <div className="mr-4 relative">
                      <div className="w-4 h-4 rounded-full bg-blue-500 mt-1.5"></div>
                      {index < securityEvents.length - 1 && (
                        <div className="absolute top-5 bottom-0 left-2 w-0.5 bg-gray-700"></div>
                      )}
                    </div>
                    <div className="flex-1 bg-gray-700 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-white">{event.type}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded ${event.severity === '高' ? 'bg-red-500' : 'bg-yellow-500'} text-white`}>
                          {event.severity}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{event.details}</p>
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{event.time}</span>
                        <span className={`${event.status === '已处理' ? 'text-green-400' : 'text-yellow-400'}`}>
                          {event.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {eventTab === 'path' && (
              <ReactECharts option={attackPathOption} style={{ height: '100%', width: '100%' }} />
            )}
            
            {eventTab === 'impact' && (
              <ReactECharts option={impactRangeOption} style={{ height: '100%', width: '100%' }} />
            )}
          </div>
        </div>
        
        {/* 周期性规律发现 */}
        <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">周期性规律发现</h2>
          
          {/* 周期性分析标签页 */}
          <div className="flex space-x-2 mb-4 border-b border-gray-700">
            <button 
              className={`px-4 py-2 rounded-t-lg text-sm ${periodicTab === 'traffic' ? 'bg-gray-700 text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setPeriodicTab('traffic')}
            >
              流量周期性规律
            </button>
            <button 
              className={`px-4 py-2 rounded-t-lg text-sm ${periodicTab === 'attack' ? 'bg-gray-700 text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setPeriodicTab('attack')}
            >
              攻击时间模式
            </button>
            <button 
              className={`px-4 py-2 rounded-t-lg text-sm ${periodicTab === 'abnormal' ? 'bg-gray-700 text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
              onClick={() => setPeriodicTab('abnormal')}
            >
              异常行为周期
            </button>
          </div>
          
          {/* 标签页内容 */}
          <div className="h-80">
            {periodicTab === 'traffic' && (
              <ReactECharts option={trafficPeriodicOption} style={{ height: '100%', width: '100%' }} />
            )}
            {periodicTab === 'attack' && (
              <ReactECharts option={attackTimePatternOption} style={{ height: '100%', width: '100%' }} />
            )}
            {periodicTab === 'abnormal' && (
              <ReactECharts option={abnormalBehaviorOption} style={{ height: '100%', width: '100%' }} />
            )}
          </div>
        </div>
      </div>
      
      {/* 历史数据表格 */}
      <div className="bg-gray-800 rounded-xl p-4 mt-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-300">历史事件记录</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3">事件ID</th>
                <th scope="col" className="px-6 py-3">事件类型</th>
                <th scope="col" className="px-6 py-3">发生时间</th>
                <th scope="col" className="px-6 py-3">严重程度</th>
                <th scope="col" className="px-6 py-3">状态</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-700 border-b">
                <td className="px-6 py-4">EV-2024-001</td>
                <td className="px-6 py-4">DDoS攻击</td>
                <td className="px-6 py-4">2024-01-15 08:30:00</td>
                <td className="px-6 py-4"><span className="bg-red-500 text-white px-2 py-1 rounded">高</span></td>
                <td className="px-6 py-4"><span className="bg-green-500 text-white px-2 py-1 rounded">已处理</span></td>
              </tr>
              <tr className="bg-gray-700 border-b">
                <td className="px-6 py-4">EV-2024-002</td>
                <td className="px-6 py-4">SQL注入</td>
                <td className="px-6 py-4">2024-01-18 14:45:00</td>
                <td className="px-6 py-4"><span className="bg-yellow-500 text-white px-2 py-1 rounded">中</span></td>
                <td className="px-6 py-4"><span className="bg-green-500 text-white px-2 py-1 rounded">已处理</span></td>
              </tr>
              <tr className="bg-gray-700 border-b">
                <td className="px-6 py-4">EV-2024-003</td>
                <td className="px-6 py-4">XSS攻击</td>
                <td className="px-6 py-4">2024-01-22 10:15:00</td>
                <td className="px-6 py-4"><span className="bg-yellow-500 text-white px-2 py-1 rounded">中</span></td>
                <td className="px-6 py-4"><span className="bg-green-500 text-white px-2 py-1 rounded">已处理</span></td>
              </tr>
              <tr className="bg-gray-700">
                <td className="px-6 py-4">EV-2024-004</td>
                <td className="px-6 py-4">恶意软件</td>
                <td className="px-6 py-4">2024-01-25 16:20:00</td>
                <td className="px-6 py-4"><span className="bg-red-500 text-white px-2 py-1 rounded">高</span></td>
                <td className="px-6 py-4"><span className="bg-green-500 text-white px-2 py-1 rounded">已处理</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* 预测性分析 */}
      <div className="mt-8 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-400">预测性分析</h2>
          <div className="text-sm text-gray-400">
            最后更新: {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
          </div>
        </div>

        {/* 预测控制面板 */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-400">预测天数:</label>
              <select 
                className="bg-gray-700 border border-gray-600 text-gray-100 py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={predictionDays}
                onChange={(e) => setPredictionDays(parseInt(e.target.value))}
              >
                <option value={3}>3天</option>
                <option value={7}>7天</option>
                <option value={14}>14天</option>
                <option value={30}>30天</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-400">预测模型:</label>
              <select 
                className="bg-gray-700 border border-gray-600 text-gray-100 py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="arima">ARIMA</option>
                <option value="lstm">LSTM</option>
                <option value="prophet">Prophet</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-400">数据粒度:</label>
              <select 
                className="bg-gray-700 border border-gray-600 text-gray-100 py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="hourly">小时</option>
                <option value="daily">日</option>
                <option value="weekly">周</option>
              </select>
            </div>
            <button className="ml-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors">
              重新生成预测
            </button>
          </div>
        </div>

        {/* 预测攻击趋势和威胁类型 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-300">预测攻击趋势</h3>
            <div className="h-80">
              <ReactECharts option={predictiveTrendOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-300">预测威胁类型分布</h3>
            <div className="h-80">
              <ReactECharts option={predictiveThreatTypeOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>
        </div>

        {/* 预测攻击源分布和置信度 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-300">预测攻击源地理位置分布</h3>
            <div className="h-80">
              <ReactECharts option={predictiveGeoOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-300">预测置信度</h3>
            <div className="h-80">
              <ReactECharts option={confidenceOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>
        </div>

        {/* 预测摘要和建议 */}
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-blue-300">预测摘要与建议</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-semibold text-blue-300 mb-3">预测摘要</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>预计未来7天攻击次数将呈上升趋势，峰值可能达到175次/日</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>DDoS攻击仍将是主要威胁类型，占比约35%</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>俄罗斯和美国仍将是主要攻击来源国</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>预测模型平均置信度为93%，预测结果可靠性较高</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold text-blue-300 mb-3">安全建议</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>加强DDoS防护能力，特别是针对大流量攻击</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>对来自俄罗斯和美国的流量进行重点监控</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>优化入侵检测系统规则，提高对SQL注入和XSS攻击的检测能力</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>增加安全运营人员配置，应对可能增加的安全事件</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricalAnalysis;