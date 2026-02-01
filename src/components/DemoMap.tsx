import React from 'react'
import ReactECharts from 'echarts-for-react'

const DemoMap: React.FC = () => {
  // 攻击来源地理位置地图配置
  const attackSourceMapOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: 'rgba(239, 68, 68, 0.3)',
      textStyle: {
        color: '#FFFFFF'
      }
    },
    visualMap: {
      min: 0,
      max: 100,
      left: 'left',
      top: 'bottom',
      text: ['高', '低'],
      calculable: true,
      inRange: {
        color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444']
      },
      textStyle: {
        color: '#9CA3AF'
      }
    },
    series: [
      {
        name: '攻击来源',
        type: 'map',
        map: 'world',
        roam: true,
        emphasis: {
          label: {
            show: true,
            color: '#FFFFFF'
          },
          itemStyle: {
            areaColor: '#3B82F6'
          }
        },
        data: [
          { name: 'United States', value: 90 },
          { name: 'China', value: 60 },
          { name: 'Russia', value: 75 },
          { name: 'India', value: 45 },
          { name: 'Brazil', value: 30 },
          { name: 'Germany', value: 55 },
          { name: 'United Kingdom', value: 40 },
          { name: 'France', value: 35 },
          { name: 'Japan', value: 65 },
          { name: 'Australia', value: 25 }
        ],
        itemStyle: {
          areaColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 0.3)'
        }
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">攻击来源地理位置地图 Demo</h1>
          <p className="text-gray-400">实时展示全球网络攻击来源分布</p>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">攻击来源地理位置地图</h2>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all">
                实时更新
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-all">
                导出数据
              </button>
            </div>
          </div>

          <div className="h-[600px]">
            <ReactECharts option={attackSourceMapOption} style={{ height: '100%', width: '100%' }} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
              <p className="text-sm text-gray-400">总攻击次数</p>
              <p className="text-2xl font-bold text-white">1,247</p>
              <p className="text-xs text-red-400">↑ 12.5%</p>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
              <p className="text-sm text-gray-400">攻击来源国家</p>
              <p className="text-2xl font-bold text-white">23</p>
              <p className="text-xs text-green-400">↑ 2</p>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
              <p className="text-sm text-gray-400">最高攻击国</p>
              <p className="text-2xl font-bold text-white">美国</p>
              <p className="text-xs text-gray-400">32%</p>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
              <p className="text-sm text-gray-400">攻击类型</p>
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-xs text-gray-400">DDoS占比最高</p>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
              <p className="text-sm text-gray-400">平均攻击强度</p>
              <p className="text-2xl font-bold text-white">68.3</p>
              <p className="text-xs text-yellow-400">中度威胁</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm shadow-lg">
          <h3 className="text-lg font-medium mb-4">攻击趋势分析</h3>
          <div className="h-[300px]">
            <ReactECharts 
              option={{
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
                  data: ['1月20日', '1月21日', '1月22日', '1月23日', '1月24日', '1月25日', '1月26日'],
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
              }}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoMap