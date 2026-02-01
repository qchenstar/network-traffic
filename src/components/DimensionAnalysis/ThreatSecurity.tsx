import React from 'react'
import ReactECharts from 'echarts-for-react';

const ThreatSecurity: React.FC = () => {
  // 威胁指数仪表盘配置
  const threatGaugeOption = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        radius: '100%',
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [{
                offset: 0,
                color: '#EF4444'
              }, {
                offset: 1,
                color: '#F59E0B'
              }]
            }
          }
        },
        axisLine: {
          lineStyle: {
            width: 60,
            color: [[1, 'rgba(255, 255, 255, 0.1)']]
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        title: {
          offsetCenter: [0, '30%'],
          fontSize: 16,
          color: '#FFFFFF'
        },
        detail: {
          fontSize: 48,
          offsetCenter: [0, '0%'],
          valueAnimation: true,
          formatter: '{value}',
          color: '#F59E0B'
        },
        data: [
          {
            value: 75,
            name: '威胁指数'
          }
        ]
      }
    ]
  }

  // 攻击趋势配置
  const attackTrendOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: 'rgba(239, 68, 68, 0.3)',
      textStyle: {
        color: '#FFFFFF'
      }
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
      data: ['1月19日', '1月20日', '1月21日', '1月22日', '1月23日', '1月24日', '1月25日'],
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      axisLabel: {
        color: '#9CA3AF'
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#9CA3AF'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.05)'
        }
      }
    },
    series: [
      {
        name: '攻击次数',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210],
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(239, 68, 68, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(239, 68, 68, 0.05)'
            }]
          }
        },
        lineStyle: {
          color: '#EF4444',
          width: 3
        },
        itemStyle: {
          color: '#EF4444'
        },
        symbol: 'circle',
        symbolSize: 6
      }
    ]
  }

  // 攻击类型柱状图配置
  const attackTypeOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: 'rgba(239, 68, 68, 0.3)',
      textStyle: {
        color: '#FFFFFF'
      }
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
      axisLine: {
        show: false
      },
      axisLabel: {
        color: '#9CA3AF'
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.05)'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: ['DDoS', 'SQL注入', 'XSS', '暴力破解', '木马'],
      axisLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      axisLabel: {
        color: '#9CA3AF'
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: '攻击次数',
        type: 'bar',
        data: [320, 280, 240, 200, 180],
        itemStyle: {
          color: {
            type: 'linear',
            x: 1,
            y: 0,
            x2: 0,
            y2: 0,
            colorStops: [{
              offset: 0,
              color: '#EF4444'
            }, {
              offset: 1,
              color: 'rgba(239, 68, 68, 0.3)'
            }]
          },
          borderRadius: [0, 4, 4, 0]
        }
      }
    ]
  }

  // 攻击来源分布饼图配置（替代地图）
  const attackSourceMapOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: 'rgba(239, 68, 68, 0.3)',
      textStyle: {
        color: '#FFFFFF'
      }
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: {
        color: '#9CA3AF'
      }
    },
    series: [
      {
        name: '攻击来源',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 12,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold',
            color: '#FFFFFF'
          },
          itemStyle: {
            shadowBlur: 15,
            shadowColor: 'rgba(0, 0, 0, 0.6)'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 90, name: '美国', itemStyle: { color: '#EF4444' } },
          { value: 75, name: '俄罗斯', itemStyle: { color: '#F59E0B' } },
          { value: 65, name: '日本', itemStyle: { color: '#F97316' } },
          { value: 60, name: '中国', itemStyle: { color: '#3B82F6' } },
          { value: 55, name: '德国', itemStyle: { color: '#10B981' } },
          { value: 45, name: '印度', itemStyle: { color: '#8B5CF6' } },
          { value: 40, name: '英国', itemStyle: { color: '#EC4899' } },
          { value: 35, name: '法国', itemStyle: { color: '#6366F1' } },
          { value: 30, name: '巴西', itemStyle: { color: '#14B8A6' } },
          { value: 25, name: '澳大利亚', itemStyle: { color: '#F472B6' } }
        ]
      }
    ]
  }

  return (
    <div className="space-y-6">
      {/* 顶部：威胁指数仪表盘 + 攻击趋势 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm h-80">
          <h3 className="text-lg font-medium text-white mb-4">威胁指数仪表盘</h3>
          <ReactECharts option={threatGaugeOption} style={{ height: '85%', width: '100%' }} />
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm h-80">
          <h3 className="text-lg font-medium text-white mb-4">攻击趋势</h3>
          <ReactECharts option={attackTrendOption} style={{ height: '85%', width: '100%' }} />
        </div>
      </div>
      
      {/* 中间：攻击类型柱状图 + 攻击来源地理位置地图 + 恶意程序检测列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-white mb-4">攻击类型柱状图</h3>
          <div className="h-64">
            <ReactECharts option={attackTypeOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-white mb-4">攻击来源地理位置地图</h3>
          <div className="h-64">
            <ReactECharts option={attackSourceMapOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-white mb-4">恶意程序检测列表</h3>
          <div className="space-y-4">
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:bg-gray-700/40 transition-all">
              <p className="font-medium text-white">Trojan.Emotet</p>
              <p className="text-xs text-gray-400 mt-1">检测时间: 10:30:45</p>
              <p className="text-xs text-gray-400">位置: /var/www/html</p>
              <div className="mt-2 flex justify-between">
                <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">高危</span>
                <button className="text-xs px-3 py-1 rounded-full bg-gray-600 hover:bg-gray-500 text-white transition-all">隔离</button>
              </div>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:bg-gray-700/40 transition-all">
              <p className="font-medium text-white">Ransomware.WannaCry</p>
              <p className="text-xs text-gray-400 mt-1">检测时间: 09:15:22</p>
              <p className="text-xs text-gray-400">位置: /home/user</p>
              <div className="mt-2 flex justify-between">
                <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">高危</span>
                <button className="text-xs px-3 py-1 rounded-full bg-gray-600 hover:bg-gray-500 text-white transition-all">隔离</button>
              </div>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:bg-gray-700/40 transition-all">
              <p className="font-medium text-white">Adware.PopUp</p>
              <p className="text-xs text-gray-400 mt-1">检测时间: 08:45:10</p>
              <p className="text-xs text-gray-400">位置: /tmp</p>
              <div className="mt-2 flex justify-between">
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">中危</span>
                <button className="text-xs px-3 py-1 rounded-full bg-gray-600 hover:bg-gray-500 text-white transition-all">隔离</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 下方：攻击时间线 + 事件详情 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-white mb-6">攻击时间线</h3>
          <div className="relative pl-10">
            {/* 时间线垂直线 */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-red-500/60 via-yellow-500/60 to-gray-700/60"></div>
            
            {/* 时间线事件 */}
            <div className="space-y-6 relative">
              {/* DDoS攻击 */}
              <div className="relative">
                <div className="absolute -left-10 top-2 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center border-2 border-gray-800 shadow-lg shadow-red-500/40">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>
                </div>
                <div className="ml-2 bg-gradient-to-r from-gray-700/40 to-gray-800/40 rounded-xl p-4 border border-gray-600/50 hover:bg-gradient-to-r from-gray-700/50 to-gray-800/50 transition-all shadow-lg shadow-red-500/5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">DDoS攻击</h4>
                    <span className="text-xs px-3 py-1 rounded-full bg-red-500/30 text-red-300 font-medium">高危</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">流量峰值达到1.2Tbps</p>
                  <p className="text-xs text-gray-400 font-mono">10:30:45</p>
                </div>
              </div>
              
              {/* SQL注入攻击 */}
              <div className="relative">
                <div className="absolute -left-10 top-2 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center border-2 border-gray-800 shadow-lg shadow-red-500/40">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>
                </div>
                <div className="ml-2 bg-gradient-to-r from-gray-700/40 to-gray-800/40 rounded-xl p-4 border border-gray-600/50 hover:bg-gradient-to-r from-gray-700/50 to-gray-800/50 transition-all shadow-lg shadow-red-500/5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">SQL注入攻击</h4>
                    <span className="text-xs px-3 py-1 rounded-full bg-red-500/30 text-red-300 font-medium">高危</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">尝试通过登录页面注入</p>
                  <p className="text-xs text-gray-400 font-mono">09:15:22</p>
                </div>
              </div>
              
              {/* XSS攻击 */}
              <div className="relative">
                <div className="absolute -left-10 top-2 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center border-2 border-gray-800 shadow-lg shadow-yellow-500/40">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>
                </div>
                <div className="ml-2 bg-gradient-to-r from-gray-700/40 to-gray-800/40 rounded-xl p-4 border border-gray-600/50 hover:bg-gradient-to-r from-gray-700/50 to-gray-800/50 transition-all shadow-lg shadow-yellow-500/5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">XSS攻击</h4>
                    <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/30 text-yellow-300 font-medium">中危</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">在评论区发现恶意脚本</p>
                  <p className="text-xs text-gray-400 font-mono">08:45:10</p>
                </div>
              </div>
              
              {/* 暴力破解 */}
              <div className="relative">
                <div className="absolute -left-10 top-2 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center border-2 border-gray-800 shadow-lg shadow-yellow-500/40">
                    <div className="w-3 h-3 rounded-full bg-white"></div>
                  </div>
                </div>
                <div className="ml-2 bg-gradient-to-r from-gray-700/40 to-gray-800/40 rounded-xl p-4 border border-gray-600/50 hover:bg-gradient-to-r from-gray-700/50 to-gray-800/50 transition-all shadow-lg shadow-yellow-500/5">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-white">暴力破解</h4>
                    <span className="text-xs px-3 py-1 rounded-full bg-yellow-500/30 text-yellow-300 font-medium">中危</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">针对管理员账户的尝试</p>
                  <p className="text-xs text-gray-400 font-mono">07:20:33</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-white mb-4">事件详情</h3>
          <div className="space-y-4">
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:bg-gray-700/40 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-white">DDoS攻击事件</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">高危</span>
              </div>
              <p className="text-sm text-gray-300 mb-2">攻击者通过多个僵尸网络节点对目标服务器发起大规模DDoS攻击，流量峰值达到1.2Tbps。</p>
              <div className="flex justify-between text-xs text-gray-400">
                <span>开始时间: 2024-01-25 10:30:45</span>
                <span>持续时间: 45分钟</span>
              </div>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:bg-gray-700/40 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-white">SQL注入攻击事件</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">中危</span>
              </div>
              <p className="text-sm text-gray-300 mb-2">攻击者尝试通过登录页面的参数进行SQL注入，试图获取数据库中的敏感信息。</p>
              <div className="flex justify-between text-xs text-gray-400">
                <span>开始时间: 2024-01-25 09:15:22</span>
                <span>持续时间: 15分钟</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreatSecurity