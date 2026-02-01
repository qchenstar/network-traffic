import React, { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'

interface ThreatMonitoringProps {
  currentTime: Date
}

const ThreatMonitoring: React.FC<ThreatMonitoringProps> = ({ currentTime }) => {
  // 模拟实时告警数据
  const [alerts, setAlerts] = useState([
    { id: 1, level: 'high', type: 'DDoS攻击', source: '192.168.1.100', target: 'Web-Server-01', time: '10:30:45', status: '未处理' },
    { id: 2, level: 'high', type: 'SQL注入', source: '10.0.0.50', target: 'DB-Server-01', time: '10:25:12', status: '处理中' },
    { id: 3, level: 'medium', type: 'XSS攻击', source: '172.16.0.20', target: 'Web-Server-02', time: '10:20:33', status: '未处理' },
    { id: 4, level: 'medium', type: '暴力破解', source: '203.0.113.45', target: 'VPN-Server', time: '10:15:45', status: '已处理' },
    { id: 5, level: 'low', type: '端口扫描', source: '198.51.100.30', target: 'File-Server-01', time: '10:10:22', status: '未处理' }
  ])

  // 模拟告警更新
  useEffect(() => {
    const timer = setInterval(() => {
      setAlerts(prev => {
        const newAlert = {
          id: prev.length + 1,
          level: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
          type: ['DDoS攻击', 'SQL注入', 'XSS攻击', '暴力破解', '端口扫描', '恶意代码'][Math.floor(Math.random() * 6)],
          source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          target: ['Web-Server-01', 'DB-Server-01', 'File-Server-01', 'Mail-Server', 'App-Server-01', 'DNS-Server'][Math.floor(Math.random() * 6)],
          time: currentTime.toLocaleTimeString('zh-CN', { hour12: false }),
          status: '未处理'
        }
        return [newAlert, ...prev.slice(0, 4)]
      })
    }, 10000)

    return () => clearInterval(timer)
  }, [currentTime])

  // 告警等级分布配置
  const alertLevelDistributionOption = {
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
        name: '告警等级',
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
        data: [
          { value: 15, name: '高危', itemStyle: { color: '#EF4444' } },
          { value: 35, name: '中危', itemStyle: { color: '#F59E0B' } },
          { value: 50, name: '低危', itemStyle: { color: '#3B82F6' } }
        ]
      }
    ]
  }

  // 攻击源TOP10配置
  const attackSourceTop10Option = {
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
    grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(55, 65, 81, 0.5)' } },
      axisLabel: { color: '#6B7280' }
    },
    yAxis: {
      type: 'category',
      data: ['192.168.1.100', '10.0.0.50', '172.16.0.20', '203.0.113.45', '198.51.100.30', '169.254.1.1', '192.168.2.150', '10.0.1.75', '172.16.1.40', '203.0.113.60'],
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { color: '#6B7280', fontSize: 10 }
    },
    series: [
      {
        name: '攻击次数',
        type: 'bar',
        data: [120, 95, 80, 75, 65, 55, 50, 45, 40, 35],
        itemStyle: {
          color: function(params: any) {
            const colors = ['#EF4444', '#F87171', '#FB923C', '#FBBF24', '#FDE68A', '#A3E635', '#6EE7B7', '#38BDF8', '#818CF8', '#C084FC']
            return colors[params.dataIndex]
          },
          borderRadius: [0, 4, 4, 0]
        }
      }
    ]
  }

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-6">威胁监控面板</h2>
      
      {/* 实时告警列表 */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-4">实时告警列表</h3>
        <div className="bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-lg p-4 border border-gray-600/50 shadow-lg max-h-80 overflow-y-auto">
          <div className="space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className="flex items-start p-3 bg-gray-700/30 rounded-lg border border-gray-600/30 hover:bg-gray-700/40 transition-all">
                <div className={`w-3 h-3 rounded-full mt-1.5 mr-3 ${alert.level === 'high' ? 'bg-red-500' : alert.level === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-white">{alert.type}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${alert.level === 'high' ? 'bg-red-500/20 text-red-400' : alert.level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {alert.level === 'high' ? '高危' : alert.level === 'medium' ? '中危' : '低危'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">来源: {alert.source} → 目标: {alert.target}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-400">{alert.time}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${alert.status === '未处理' ? 'bg-red-500/20 text-red-400' : alert.status === '处理中' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                      {alert.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 告警等级分布和攻击源TOP10 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-lg p-4 border border-gray-600/50 shadow-lg">
          <h3 className="text-lg font-medium text-white mb-4">告警等级分布</h3>
          <div className="h-64">
            <ReactECharts option={alertLevelDistributionOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-lg p-4 border border-gray-600/50 shadow-lg">
          <h3 className="text-lg font-medium text-white mb-4">攻击源TOP10</h3>
          <div className="h-64">
            <ReactECharts option={attackSourceTop10Option} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThreatMonitoring
