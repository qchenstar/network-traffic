import React, { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import { alerts, attackTypeData } from '../data/mockData'

const ThreatIntelligence: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [alertCount] = useState({
    today: 23,
    unhandled: 5,
    critical: 2,
    high: 3,
    medium: 8,
    low: 10
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 攻击源地理位置分布配置
  const attackSourceOption = {
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
      name: '攻击次数',
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
        name: '攻击源分布',
        type: 'bar',
        barWidth: '40%',
        data: [50, 55, 60, 70, 65, 76, 80, 87, 95, 128],
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

  // 告警趋势配置
  const alertTrendOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#E5E7EB' }
    },
    legend: {
      data: ['危急', '高危', '中危', '低危'],
      textStyle: { color: '#9CA3AF' },
      top: 0
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '15%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1日', '2日', '3日', '4日', '5日', '6日', '7日'],
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { color: '#6B7280' }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(55, 65, 81, 0.5)' } },
      axisLabel: { color: '#6B7280' }
    },
    series: [
      {
        name: '危急',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#EF4444', width: 2 },
        data: [2, 1, 3, 2, 1, 2, 2]
      },
      {
        name: '高危',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#F97316', width: 2 },
        data: [3, 2, 4, 3, 2, 3, 3]
      },
      {
        name: '中危',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#F59E0B', width: 2 },
        data: [8, 7, 9, 8, 7, 8, 8]
      },
      {
        name: '低危',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#3B82F6', width: 2 },
        data: [10, 9, 11, 10, 9, 10, 10]
      }
    ]
  }

  // 攻击类型分布配置
  const attackTypeOption = {
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
        name: '攻击类型',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: '#111827',
          borderWidth: 2
        },
        label: { show: false },
        emphasis: {
          label: { show: true, fontSize: 14, fontWeight: 'bold', color: '#fff' }
        },
        data: attackTypeData
      }
    ]
  }

  const getAlertLevelClass = (level: string) => {
    switch (level) {
      case 'critical': return { cls: 'bg-red-500/10 border-red-500/30 text-red-400', label: '危急' };
      case 'high': return { cls: 'bg-orange-500/10 border-orange-500/30 text-orange-400', label: '高危' };
      case 'medium': return { cls: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400', label: '中危' };
      default: return { cls: 'bg-gray-500/10 border-gray-500/30 text-gray-400', label: '低危' };
    }
  };

  return (
    <div className="space-y-6">
      {/* 实时告警概览 */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">威胁情报与告警</h2>
          <div className="text-sm text-gray-400">
            最后更新: {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-white">今日告警</h3>
                <div className="text-sm text-gray-400">总数量</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400">⚠️</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white digit">{alertCount.today}</div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-white">未处理告警</h3>
                <div className="text-sm text-gray-400">待处置</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                <span className="text-orange-400">⏰</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white digit">{alertCount.unhandled}</div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-white">危急告警</h3>
                <div className="text-sm text-gray-400">高优先级</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400">🚨</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white digit">{alertCount.critical}</div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-white">安全运营时长</h3>
                <div className="text-sm text-gray-400">持续天数</div>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400">🛡️</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white digit">892<span className="text-gray-400 text-lg">天</span></div>
          </div>
        </div>

        {/* 告警趋势和攻击类型分布 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <h3 className="text-lg font-medium text-white mb-4">7天告警趋势</h3>
            <div className="h-64">
              <ReactECharts option={alertTrendOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <h3 className="text-lg font-medium text-white mb-4">攻击类型分布</h3>
            <div className="h-64">
              <ReactECharts option={attackTypeOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>
        </div>

        {/* 实时告警列表 */}
        <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600 mb-6">
          <h3 className="text-lg font-medium text-white mb-4">实时告警列表</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-3 px-4 text-gray-400">时间</th>
                  <th className="text-left py-3 px-4 text-gray-400">告警级别</th>
                  <th className="text-left py-3 px-4 text-gray-400">告警标题</th>
                  <th className="text-left py-3 px-4 text-gray-400">攻击源</th>
                  <th className="text-left py-3 px-4 text-gray-400">目标</th>
                  <th className="text-left py-3 px-4 text-gray-400">置信度</th>
                  <th className="text-left py-3 px-4 text-gray-400">状态</th>
                  <th className="text-left py-3 px-4 text-gray-400">操作</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert, index) => {
                  const level = getAlertLevelClass(alert.level);
                  return (
                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
                      <td className="py-3 px-4 text-gray-300">{alert.time}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${level.cls}`}>
                          {level.label}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-white">{alert.title}</td>
                      <td className="py-3 px-4 text-gray-300">{alert.src}</td>
                      <td className="py-3 px-4 text-gray-300">{alert.target}</td>
                      <td className="py-3 px-4 text-gray-300">{alert.confidence}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-500/20 text-yellow-400">
                          未处理
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="px-3 py-1 bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded text-xs font-medium hover:bg-blue-500/30 transition-all">
                          处理
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 攻击源分析 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <h3 className="text-lg font-medium text-white mb-4">攻击源地理位置分布</h3>
            <div className="h-full flex items-center justify-center">
              <ReactECharts option={attackSourceOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>

          <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <h3 className="text-lg font-medium text-white mb-4">攻击源TOP 10</h3>
            <div className="space-y-2">
              {
                [
                  { ip: '45.142.214.89', country: 'Russia', attacks: 128, confidence: '98%' },
                  { ip: '192.168.5.100', country: 'Internal', attacks: 95, confidence: '95%' },
                  { ip: '203.114.10.12', country: 'North Korea', attacks: 87, confidence: '90%' },
                  { ip: '185.244.25.14', country: 'Iran', attacks: 76, confidence: '88%' },
                  { ip: '104.244.42.129', country: 'United States', attacks: 65, confidence: '85%' },
                  { ip: '91.243.7.18', country: 'Unknown', attacks: 58, confidence: '80%' },
                  { ip: '176.31.117.198', country: 'France', attacks: 45, confidence: '75%' },
                  { ip: '146.185.222.100', country: 'Netherlands', attacks: 38, confidence: '70%' },
                  { ip: '103.235.46.133', country: 'Vietnam', attacks: 32, confidence: '65%' },
                  { ip: '219.78.248.102', country: 'China', attacks: 28, confidence: '60%' }
                ].map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-700/50 rounded-lg border border-gray-600 hover:bg-gray-700/80 transition-colors">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="text-md font-bold text-gray-400 w-8">{index + 1}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium text-sm truncate">{source.ip}</div>
                        <div className="text-xs text-gray-400 truncate">{source.country}</div>
                      </div>
                    </div>
                    <div className="text-right ml-4 whitespace-nowrap">
                      <div className="text-white font-medium text-sm">{source.attacks} 次</div>
                      <div className="text-xs text-gray-400">{source.confidence}</div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>

      {/* 告警处置流程 */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
        <h3 className="text-lg font-bold text-white mb-4">告警处置流程</h3>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-bold">1</span>
              </div>
              <h4 className="text-lg font-medium text-white">告警接收</h4>
            </div>
            <p className="text-gray-400 text-sm">
              系统自动接收来自各种安全设备和监控系统的告警信息，包括入侵检测系统、防火墙、防病毒软件等。
            </p>
          </div>

          <div className="flex-1 bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-bold">2</span>
              </div>
              <h4 className="text-lg font-medium text-white">告警分类</h4>
            </div>
            <p className="text-gray-400 text-sm">
              系统根据告警的严重程度、攻击类型和影响范围进行分类，确定告警级别和优先级。
            </p>
          </div>

          <div className="flex-1 bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-bold">3</span>
              </div>
              <h4 className="text-lg font-medium text-white">告警分析</h4>
            </div>
            <p className="text-gray-400 text-sm">
              安全分析师对告警进行深入分析，验证告警的真实性，评估影响范围和严重程度。
            </p>
          </div>

          <div className="flex-1 bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-bold">4</span>
              </div>
              <h4 className="text-lg font-medium text-white">告警处置</h4>
            </div>
            <p className="text-gray-400 text-sm">
              根据分析结果，采取相应的处置措施，包括隔离受感染系统、阻断攻击源、修复漏洞等。
            </p>
          </div>

          <div className="flex-1 bg-gray-700/50 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-bold">5</span>
              </div>
              <h4 className="text-lg font-medium text-white">告警闭环</h4>
            </div>
            <p className="text-gray-400 text-sm">
              记录告警处置过程和结果，进行事后分析和总结，完善安全防护措施。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreatIntelligence
