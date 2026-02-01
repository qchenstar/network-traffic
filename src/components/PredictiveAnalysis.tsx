import React, { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'

const PredictiveAnalysis: React.FC = () => {
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
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { color: '#6B7280' }
    },
    yAxis: {
      type: 'value',
      name: '攻击次数',
      nameTextStyle: { color: '#9CA3AF', fontSize: 12 },
      splitLine: { lineStyle: { color: 'rgba(55, 65, 81, 0.5)' } },
      axisLabel: { color: '#6B7280' }
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

  return (
    <div className="space-y-6">
      {/* 预测分析概览 */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">预测性分析</h2>
          <div className="text-sm text-gray-400">
            最后更新: {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
          </div>
        </div>

        {/* 预测控制面板 */}
        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-400">预测天数:</label>
              <select 
                className="bg-gray-800 border border-gray-600 text-gray-100 py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
                className="bg-gray-800 border border-gray-600 text-gray-100 py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="arima">ARIMA</option>
                <option value="lstm">LSTM</option>
                <option value="prophet">Prophet</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-400">数据粒度:</label>
              <select 
                className="bg-gray-800 border border-gray-600 text-gray-100 py-1 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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
          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <h3 className="text-lg font-medium text-white mb-4">预测攻击趋势</h3>
            <div className="h-80">
              <ReactECharts option={predictiveTrendOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <h3 className="text-lg font-medium text-white mb-4">预测威胁类型分布</h3>
            <div className="h-80">
              <ReactECharts option={predictiveThreatTypeOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>
        </div>

        {/* 预测攻击源分布和置信度 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <h3 className="text-lg font-medium text-white mb-4">预测攻击源地理位置分布</h3>
            <div className="h-80">
              <ReactECharts option={predictiveGeoOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <h3 className="text-lg font-medium text-white mb-4">预测置信度</h3>
            <div className="h-80">
              <ReactECharts option={confidenceOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>
        </div>

        {/* 预测摘要和建议 */}
        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 mt-6">
          <h3 className="text-lg font-medium text-white mb-4">预测摘要与建议</h3>
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
  )
}

export default PredictiveAnalysis