import React, { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'

interface TrafficMonitoringProps {
  // 可以添加其他属性
}

const TrafficMonitoring: React.FC<TrafficMonitoringProps> = () => {
  // 模拟实时流量数据
  const [trafficData, setTrafficData] = useState({
    inbound: 2.4,
    outbound: 1.8,
    connections: 12450,
    bandwidth: 68
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTrafficData(prev => ({
        inbound: parseFloat((prev.inbound + (Math.random() * 0.4 - 0.2)).toFixed(1)),
        outbound: parseFloat((prev.outbound + (Math.random() * 0.3 - 0.15)).toFixed(1)),
        connections: Math.floor(prev.connections + (Math.random() * 20 - 10)),
        bandwidth: Math.floor(prev.bandwidth + (Math.random() * 4 - 2))
      }))
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  // 实时流量曲线图配置
  const realTimeTrafficOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#E5E7EB' }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: Array.from({ length: 30 }, (_, i) => `${i * 2}s`),
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { color: '#6B7280', fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(55, 65, 81, 0.5)' } },
      axisLabel: { color: '#6B7280' }
    },
    series: [
      {
        name: '入站流量',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#3B82F6', width: 2 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(59, 130, 246, 0.3)' 
            }, {
              offset: 1, color: 'rgba(59, 130, 246, 0.05)' 
            }]
          }
        },
        data: Array.from({ length: 30 }, () => Math.random() * 5 + 1)
      },
      {
        name: '出站流量',
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: { color: '#10B981', width: 2 },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(16, 185, 129, 0.3)' 
            }, {
              offset: 1, color: 'rgba(16, 185, 129, 0.05)' 
            }]
          }
        },
        data: Array.from({ length: 30 }, () => Math.random() * 8 + 6)
      }
    ]
  }

  // 连接状态监控配置
  const connectionStatusOption = {
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
      data: ['ESTABLISHED', 'SYN_SENT', 'SYN_RECV', 'FIN_WAIT1', 'FIN_WAIT2', 'TIME_WAIT', 'CLOSED'],
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { color: '#6B7280' }
    },
    series: [
      {
        name: '连接数',
        type: 'bar',
        data: [1200, 320, 280, 150, 120, 800, 50],
        itemStyle: {
          color: function(params: any) {
            const colors = ['#10B981', '#3B82F6', '#F59E0B', '#F97316', '#8B5CF6', '#EC4899', '#6366F1']
            return colors[params.dataIndex]
          },
          borderRadius: [0, 4, 4, 0]
        }
      }
    ]
  }

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-6">流量监控面板</h2>
      
      {/* 流量概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-gray-700/60 to-gray-800/60 rounded-lg p-4 border border-gray-600/50 shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-medium text-white">入站流量</h3>
              <div className="text-sm text-gray-400">当前速率</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <span className="text-blue-400">↓</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{trafficData.inbound}<span className="text-gray-400 text-lg">Gbps</span></div>
        </div>

        <div className="bg-gradient-to-br from-gray-700/60 to-gray-800/60 rounded-lg p-4 border border-gray-600/50 shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-medium text-white">出站流量</h3>
              <div className="text-sm text-gray-400">当前速率</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <span className="text-green-400">↑</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{trafficData.outbound}<span className="text-gray-400 text-lg">Gbps</span></div>
        </div>

        <div className="bg-gradient-to-br from-gray-700/60 to-gray-800/60 rounded-lg p-4 border border-gray-600/50 shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-medium text-white">并发连接</h3>
              <div className="text-sm text-gray-400">当前数量</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <span className="text-yellow-400">🔗</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{trafficData.connections}</div>
        </div>

        <div className="bg-gradient-to-br from-gray-700/60 to-gray-800/60 rounded-lg p-4 border border-gray-600/50 shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-medium text-white">带宽利用率</h3>
              <div className="text-sm text-gray-400">当前占比</div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <span className="text-orange-400">📊</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{trafficData.bandwidth}<span className="text-gray-400 text-lg">%</span></div>
        </div>
      </div>

      {/* 流量趋势和连接状态 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-lg p-4 border border-gray-600/50 shadow-lg">
          <h3 className="text-lg font-medium text-white mb-4">实时流量曲线图</h3>
          <div className="h-64">
            <ReactECharts option={realTimeTrafficOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-lg p-4 border border-gray-600/50 shadow-lg">
          <h3 className="text-lg font-medium text-white mb-4">连接状态监控</h3>
          <div className="h-64">
            <ReactECharts option={connectionStatusOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>

      {/* TOP应用和TOP主机 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-lg p-4 border border-gray-600/50 shadow-lg">
          <h3 className="text-lg font-medium text-white mb-4">TOP 10 应用流量</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600/50">
                  <th className="text-left py-3 px-4 text-gray-400">排名</th>
                  <th className="text-left py-3 px-4 text-gray-400">应用名称</th>
                  <th className="text-left py-3 px-4 text-gray-400">协议</th>
                  <th className="text-left py-3 px-4 text-gray-400">流量占比</th>
                  <th className="text-left py-3 px-4 text-gray-400">状态</th>
                </tr>
              </thead>
              <tbody>
                {
                  [
                    { name: 'HTTP Web', protocol: 'TCP/80', percentage: '25%', status: 'normal' },
                    { name: 'HTTPS Web', protocol: 'TCP/443', percentage: '20%', status: 'normal' },
                    { name: 'Email', protocol: 'TCP/25', percentage: '15%', status: 'normal' },
                    { name: 'File Transfer', protocol: 'TCP/21', percentage: '10%', status: 'warn' },
                    { name: 'Database', protocol: 'TCP/3306', percentage: '8%', status: 'normal' },
                    { name: 'Remote Access', protocol: 'TCP/22', percentage: '7%', status: 'normal' },
                    { name: 'Video Streaming', protocol: 'UDP/53', percentage: '5%', status: 'normal' },
                    { name: 'Voice Calls', protocol: 'UDP/5060', percentage: '4%', status: 'normal' },
                    { name: 'Gaming', protocol: 'UDP/3478', percentage: '3%', status: 'normal' },
                    { name: 'Other', protocol: 'Various', percentage: '3%', status: 'normal' }
                  ].map((app, index) => (
                    <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                      <td className="py-3 px-4 text-gray-300">{index + 1}</td>
                      <td className="py-3 px-4 text-white">{app.name}</td>
                      <td className="py-3 px-4 text-gray-400">{app.protocol}</td>
                      <td className="py-3 px-4 text-gray-300">{app.percentage}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${app.status === 'normal' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {app.status === 'normal' ? '正常' : '警告'}
                        </span>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-lg p-4 border border-gray-600/50 shadow-lg">
          <h3 className="text-lg font-medium text-white mb-4">TOP 10 主机流量</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600/50">
                  <th className="text-left py-3 px-4 text-gray-400">排名</th>
                  <th className="text-left py-3 px-4 text-gray-400">主机IP</th>
                  <th className="text-left py-3 px-4 text-gray-400">主机名</th>
                  <th className="text-left py-3 px-4 text-gray-400">流量占比</th>
                  <th className="text-left py-3 px-4 text-gray-400">状态</th>
                </tr>
              </thead>
              <tbody>
                {
                  [
                    { ip: '192.168.1.100', hostname: 'Web-Server-01', percentage: '18%', status: 'normal' },
                    { ip: '192.168.1.101', hostname: 'Web-Server-02', percentage: '15%', status: 'normal' },
                    { ip: '192.168.1.200', hostname: 'DB-Server-01', percentage: '12%', status: 'normal' },
                    { ip: '192.168.1.300', hostname: 'File-Server-01', percentage: '10%', status: 'warn' },
                    { ip: '192.168.1.10', hostname: 'Firewall', percentage: '8%', status: 'normal' },
                    { ip: '192.168.1.20', hostname: 'Load-Balancer', percentage: '7%', status: 'normal' },
                    { ip: '192.168.1.400', hostname: 'Backup-Server', percentage: '6%', status: 'normal' },
                    { ip: '192.168.1.500', hostname: 'Mail-Server', percentage: '5%', status: 'normal' },
                    { ip: '192.168.1.600', hostname: 'VPN-Server', percentage: '4%', status: 'normal' },
                    { ip: '192.168.1.700', hostname: 'Monitoring-Server', percentage: '3%', status: 'normal' }
                  ].map((host, index) => (
                    <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                      <td className="py-3 px-4 text-gray-300">{index + 1}</td>
                      <td className="py-3 px-4 text-white">{host.ip}</td>
                      <td className="py-3 px-4 text-gray-300">{host.hostname}</td>
                      <td className="py-3 px-4 text-gray-300">{host.percentage}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${host.status === 'normal' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {host.status === 'normal' ? '正常' : '警告'}
                        </span>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrafficMonitoring
