import React from 'react'
import ReactECharts from 'echarts-for-react'

const DataSecurity: React.FC = () => {
  // 数据安全指数仪表盘配置
  const dataSecurityGaugeOption = {
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
                color: '#10B981'
              }, {
                offset: 1,
                color: '#3B82F6'
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
          color: '#10B981'
        },
        data: [
          {
            value: 80,
            name: '数据安全指数'
          }
        ]
      }
    ]
  }

  // 数据传输流向桑基图配置
  const dataFlowSankeyOption = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
      textStyle: {
        color: '#FFFFFF'
      }
    },
    series: [
      {
        type: 'sankey',
        left: 50,
        top: 20,
        right: 150,
        bottom: 25,
        data: [
          { name: '内部网络' },
          { name: '外部网络' },
          { name: '服务器A' },
          { name: '服务器B' },
          { name: '数据库' },
          { name: '云存储' }
        ],
        links: [
          { source: '内部网络', target: '服务器A', value: 10 },
          { source: '内部网络', target: '服务器B', value: 15 },
          { source: '服务器A', target: '数据库', value: 8 },
          { source: '服务器A', target: '云存储', value: 2 },
          { source: '服务器B', target: '数据库', value: 12 },
          { source: '服务器B', target: '云存储', value: 3 },
          { source: '外部网络', target: '服务器A', value: 5 },
          { source: '外部网络', target: '服务器B', value: 3 }
        ],
        lineStyle: {
          color: 'gradient',
          curveness: 0.5
        },
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [{
              offset: 0,
              color: '#3B82F6'
            }, {
              offset: 1,
              color: '#10B981'
            }]
          },
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1
        },
        label: {
          color: '#9CA3AF'
        }
      }
    ]
  }

  // 加密传输率趋势配置
  const encryptionRateTrendOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
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
        name: '加密传输率',
        type: 'line',
        stack: 'Total',
        data: [75, 80, 85, 90, 88, 92],
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

  return (
    <div className="space-y-6">
      {/* 顶部：数据安全指数仪表盘 */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm h-80">
        <h3 className="text-lg font-medium text-white mb-4">数据安全指数仪表盘</h3>
        <ReactECharts option={dataSecurityGaugeOption} style={{ height: '85%', width: '100%' }} />
      </div>
      
      {/* 中间：数据传输流向桑基图 + 敏感数据外发检测列表 + 加密传输率趋势 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-white mb-4">数据传输流向桑基图</h3>
          <div className="h-64">
            <ReactECharts option={dataFlowSankeyOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-white mb-4">敏感数据外发检测列表</h3>
          <div className="space-y-4">
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:bg-gray-700/40 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div>
                  <p className="font-medium text-white">信用卡信息</p>
                  <p className="text-xs text-gray-400">10:30:45 - 尝试外发</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">已拦截</span>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:bg-gray-700/40 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <div>
                  <p className="font-medium text-white">个人身份证信息</p>
                  <p className="text-xs text-gray-400">09:15:22 - 尝试外发</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">已拦截</span>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30 hover:bg-gray-700/40 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div>
                  <p className="font-medium text-white">公司内部文档</p>
                  <p className="text-xs text-gray-400">08:45:10 - 正常外发</p>
                </div>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">已允许</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
          <h3 className="text-lg font-medium text-white mb-4">加密传输率趋势</h3>
          <div className="h-64">
            <ReactECharts option={encryptionRateTrendOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>
      
      {/* 下方：数据安全事件详情 */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
        <h3 className="text-lg font-medium text-white mb-4">数据安全事件详情</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th className="text-left py-3 px-4 text-gray-400">事件类型</th>
                <th className="text-left py-3 px-4 text-gray-400">发生时间</th>
                <th className="text-left py-3 px-4 text-gray-400">影响范围</th>
                <th className="text-left py-3 px-4 text-gray-400">严重程度</th>
                <th className="text-left py-3 px-4 text-gray-400">状态</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                <td className="py-3 px-4 text-white">敏感数据外发</td>
                <td className="py-3 px-4 text-gray-300">2024-01-25 10:30:45</td>
                <td className="py-3 px-4 text-gray-300">单台主机</td>
                <td className="py-3 px-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">高危</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">已处理</span>
                </td>
              </tr>
              <tr className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                <td className="py-3 px-4 text-white">未加密传输</td>
                <td className="py-3 px-4 text-gray-300">2024-01-25 09:15:22</td>
                <td className="py-3 px-4 text-gray-300">内部网络</td>
                <td className="py-3 px-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">中危</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">已处理</span>
                </td>
              </tr>
              <tr className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors">
                <td className="py-3 px-4 text-white">数据访问异常</td>
                <td className="py-3 px-4 text-gray-300">2024-01-25 08:45:10</td>
                <td className="py-3 px-4 text-gray-300">数据库</td>
                <td className="py-3 px-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">中危</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">处理中</span>
                </td>
              </tr>
              <tr className="hover:bg-gray-700/20 transition-colors">
                <td className="py-3 px-4 text-white">数据备份失败</td>
                <td className="py-3 px-4 text-gray-300">2024-01-25 07:20:33</td>
                <td className="py-3 px-4 text-gray-300">云存储</td>
                <td className="py-3 px-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">高危</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">处理中</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default DataSecurity