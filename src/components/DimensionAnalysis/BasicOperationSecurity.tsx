import React from 'react'
import ReactECharts from 'echarts-for-react'

const BasicOperationSecurity: React.FC = () => {
  // 基础运行指数仪表盘配置
  const basicRunGaugeOption = {
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
                color: '#F59E0B'
              }, {
                offset: 1,
                color: '#10B981'
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
            value: 85,
            name: '基础运行指数'
          }
        ]
      }
    ]
  }

  // 基础运行指数趋势配置
  const basicRunTrendOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: 'rgba(59, 130, 246, 0.3)',
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
      data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
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
        name: '基础运行指数',
        type: 'line',
        stack: 'Total',
        data: [75, 78, 80, 82, 85, 83, 84, 85],
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(16, 185, 129, 0.3)'
            }, {
              offset: 1,
              color: 'rgba(16, 185, 129, 0.05)'
            }]
          }
        },
        lineStyle: {
          color: '#10B981',
          width: 3
        },
        itemStyle: {
          color: '#10B981'
        },
        symbol: 'circle',
        symbolSize: 6
      }
    ]
  }

  // 流量异常热力图配置
  const trafficHeatmapOption = {
    tooltip: {
      position: 'top',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: 'rgba(59, 130, 246, 0.3)',
      textStyle: {
        color: '#FFFFFF'
      }
    },
    grid: {
      height: '50%',
      top: '10%'
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255, 255, 255, 0.03)', 'rgba(255, 255, 255, 0.01)']
        }
      },
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
      type: 'category',
      data: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(255, 255, 255, 0.03)', 'rgba(255, 255, 255, 0.01)']
        }
      },
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
    visualMap: {
      min: 0,
      max: 100,
      calculable: true,
      orient: 'horizontal',
      left: 'center',
      bottom: '10%',
      inRange: {
        color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
      },
      textStyle: {
        color: '#9CA3AF'
      }
    },
    series: [
      {
        name: '流量异常',
        type: 'heatmap',
        data: [
          [0, 0, 10],
          [1, 0, 20],
          [2, 0, 15],
          [3, 0, 5],
          [4, 0, 8],
          [5, 0, 12],
          [6, 0, 18],
          [7, 0, 25],
          [0, 1, 30],
          [1, 1, 40],
          [2, 1, 25],
          [3, 1, 15],
          [4, 1, 20],
          [5, 1, 35],
          [6, 1, 45],
          [7, 1, 50],
          [0, 2, 25],
          [1, 2, 30],
          [2, 2, 20],
          [3, 2, 10],
          [4, 2, 15],
          [5, 2, 30],
          [6, 2, 40],
          [7, 2, 45],
          [0, 3, 35],
          [1, 3, 45],
          [2, 3, 30],
          [3, 3, 20],
          [4, 3, 25],
          [5, 3, 40],
          [6, 3, 50],
          [7, 3, 55],
          [0, 4, 40],
          [1, 4, 50],
          [2, 4, 35],
          [3, 4, 25],
          [4, 4, 30],
          [5, 4, 45],
          [6, 4, 55],
          [7, 4, 60],
          [0, 5, 30],
          [1, 5, 40],
          [2, 5, 25],
          [3, 5, 15],
          [4, 5, 20],
          [5, 5, 35],
          [6, 5, 45],
          [7, 5, 50],
          [0, 6, 15],
          [1, 6, 20],
          [2, 6, 10],
          [3, 6, 5],
          [4, 6, 10],
          [5, 6, 15],
          [6, 6, 20],
          [7, 6, 25]
        ],
        label: {
          show: true,
          color: '#FFFFFF',
          fontSize: 10
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 15,
            shadowColor: 'rgba(0, 0, 0, 0.6)'
          },
          label: {
            color: '#FFFFFF',
            fontSize: 12,
            fontWeight: 'bold'
          }
        }
      }
    ]
  }

  // 资源消耗柱状图配置
  const resourceConsumptionOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: 'rgba(59, 130, 246, 0.3)',
      textStyle: {
        color: '#FFFFFF'
      }
    },
    legend: {
      data: ['CPU', '带宽', '会话'],
      textStyle: {
        color: '#9CA3AF'
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
      },
      splitLine: {
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
        name: 'CPU',
        type: 'bar',
        data: [30, 40, 60, 80, 70, 50],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#3B82F6'
            }, {
              offset: 1,
              color: 'rgba(59, 130, 246, 0.3)'
            }]
          },
          borderRadius: [4, 4, 0, 0]
        }
      },
      {
        name: '带宽',
        type: 'bar',
        data: [20, 30, 50, 70, 60, 40],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#10B981'
            }, {
              offset: 1,
              color: 'rgba(16, 185, 129, 0.3)'
            }]
          },
          borderRadius: [4, 4, 0, 0]
        }
      },
      {
        name: '会话',
        type: 'bar',
        data: [40, 50, 70, 90, 80, 60],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: '#F59E0B'
            }, {
              offset: 1,
              color: 'rgba(245, 158, 11, 0.3)'
            }]
          },
          borderRadius: [4, 4, 0, 0]
        }
      }
    ]
  }

  return (
    <div className="space-y-6">
      {/* 左侧：基础运行指数仪表盘 + 变化趋势 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm h-80">
          <h3 className="text-lg font-medium text-white mb-4">基础运行指数仪表盘</h3>
          <ReactECharts option={basicRunGaugeOption} style={{ height: '85%', width: '100%' }} />
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm h-80">
          <h3 className="text-lg font-medium text-white mb-4">变化趋势</h3>
          <ReactECharts option={basicRunTrendOption} style={{ height: '85%', width: '100%' }} />
        </div>
      </div>
      
      {/* 中间：流量异常热力图（24小时×7天） */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
        <h3 className="text-lg font-medium text-white mb-4">流量异常热力图（24小时×7天）</h3>
        <div className="h-96">
          <ReactECharts option={trafficHeatmapOption} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
      
      {/* 右侧：资源消耗柱状图（CPU/带宽/会话） */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
        <h3 className="text-lg font-medium text-white mb-4">资源消耗柱状图（CPU/带宽/会话）</h3>
        <div className="h-80">
          <ReactECharts option={resourceConsumptionOption} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
      
      {/* 下方：详细指标表格 + 异常事件列表 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-white mb-4">详细指标表格</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left py-3 px-4 text-gray-400">指标名称</th>
                  <th className="text-left py-3 px-4 text-gray-400">当前值</th>
                  <th className="text-left py-3 px-4 text-gray-400">阈值</th>
                  <th className="text-left py-3 px-4 text-gray-400">状态</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                  <td className="py-3 px-4 text-white">CPU使用率</td>
                  <td className="py-3 px-4 text-gray-300">65%</td>
                  <td className="py-3 px-4 text-gray-400">80%</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">正常</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                  <td className="py-3 px-4 text-white">内存使用率</td>
                  <td className="py-3 px-4 text-gray-300">72%</td>
                  <td className="py-3 px-4 text-gray-400">85%</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">正常</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                  <td className="py-3 px-4 text-white">带宽使用率</td>
                  <td className="py-3 px-4 text-gray-300">58%</td>
                  <td className="py-3 px-4 text-gray-400">90%</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">正常</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-700/20 transition-colors">
                  <td className="py-3 px-4 text-white">会话数</td>
                  <td className="py-3 px-4 text-gray-300">1,245</td>
                  <td className="py-3 px-4 text-gray-400">2,000</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">正常</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-white mb-4">异常事件列表</h3>
          <div className="space-y-4">
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:bg-gray-700/40 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-white">CPU使用率异常</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">警告</span>
              </div>
              <p className="text-sm text-gray-300 mb-2">CPU使用率在10:30达到78%，接近阈值。</p>
              <p className="text-xs text-gray-400">发生时间: 2024-01-25 10:30:45</p>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:bg-gray-700/40 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-white">带宽突增</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">警告</span>
              </div>
              <p className="text-sm text-gray-300 mb-2">带宽使用率在09:15突然增加到85%。</p>
              <p className="text-xs text-gray-400">发生时间: 2024-01-25 09:15:22</p>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:bg-gray-700/40 transition-all">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-white">会话数异常</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">已恢复</span>
              </div>
              <p className="text-sm text-gray-300 mb-2">会话数在08:45达到1,800，现已恢复正常。</p>
              <p className="text-xs text-gray-400">发生时间: 2024-01-25 08:45:10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicOperationSecurity