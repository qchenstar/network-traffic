import React, { useState } from 'react'
import ReactECharts from 'echarts-for-react'

const AssetMonitoring: React.FC = () => {
  // 模拟在线资产数据
  const [assets] = useState([
    { id: 1, ip: '192.168.1.100', hostname: 'Web-Server-01', status: 'online', risk: 'low', traffic: '350 Mbps' },
    { id: 2, ip: '192.168.1.101', hostname: 'Web-Server-02', status: 'online', risk: 'medium', traffic: '280 Mbps' },
    { id: 3, ip: '192.168.1.200', hostname: 'DB-Server-01', status: 'online', risk: 'high', traffic: '150 Mbps' },
    { id: 4, ip: '192.168.1.300', hostname: 'File-Server-01', status: 'online', risk: 'low', traffic: '200 Mbps' },
    { id: 5, ip: '192.168.1.400', hostname: 'Mail-Server', status: 'online', risk: 'medium', traffic: '100 Mbps' },
    { id: 6, ip: '192.168.1.500', hostname: 'App-Server-01', status: 'online', risk: 'low', traffic: '250 Mbps' },
    { id: 7, ip: '192.168.1.600', hostname: 'DNS-Server', status: 'online', risk: 'low', traffic: '80 Mbps' },
    { id: 8, ip: '192.168.1.700', hostname: 'VPN-Server', status: 'offline', risk: 'medium', traffic: '0 Mbps' }
  ])

  // 资产风险等级配置
  const assetRiskLevelOption = {
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
        name: '资产风险',
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
          { value: 10, name: '高风险', itemStyle: { color: '#EF4444' } },
          { value: 25, name: '中风险', itemStyle: { color: '#F59E0B' } },
          { value: 65, name: '低风险', itemStyle: { color: '#10B981' } }
        ]
      }
    ]
  }

  // 资产流量统计配置
  const assetTrafficStatsOption = {
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
      data: ['Web服务器', '数据库服务器', '文件服务器', '邮件服务器', '应用服务器', 'DNS服务器'],
      axisLine: { lineStyle: { color: '#374151' } },
      axisLabel: { color: '#6B7280', rotate: 45, fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: 'rgba(55, 65, 81, 0.5)' } },
      axisLabel: { color: '#6B7280' }
    },
    series: [
      {
        name: '入站流量',
        type: 'bar',
        data: [350, 150, 200, 100, 250, 80],
        itemStyle: { color: '#3B82F6', borderRadius: [4, 4, 0, 0] }
      },
      {
        name: '出站流量',
        type: 'bar',
        data: [250, 100, 150, 80, 200, 60],
        itemStyle: { color: '#10B981', borderRadius: [4, 4, 0, 0] }
      }
    ]
  }

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-6">资产监控面板</h2>
      
      {/* 在线资产列表 */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-white mb-4">在线资产列表</h3>
        <div className="bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-lg p-4 border border-gray-600/50 shadow-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-600/50">
                <th className="text-left py-3 px-4 text-gray-400">资产ID</th>
                <th className="text-left py-3 px-4 text-gray-400">IP地址</th>
                <th className="text-left py-3 px-4 text-gray-400">主机名</th>
                <th className="text-left py-3 px-4 text-gray-400">状态</th>
                <th className="text-left py-3 px-4 text-gray-400">风险等级</th>
                <th className="text-left py-3 px-4 text-gray-400">流量</th>
              </tr>
            </thead>
            <tbody>
              {assets.map(asset => (
                <tr key={asset.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-3 px-4 text-gray-300">{asset.id}</td>
                  <td className="py-3 px-4 text-white">{asset.ip}</td>
                  <td className="py-3 px-4 text-gray-300">{asset.hostname}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${asset.status === 'online' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {asset.status === 'online' ? '在线' : '离线'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${asset.risk === 'high' ? 'bg-red-500/20 text-red-400' : asset.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                      {asset.risk === 'high' ? '高风险' : asset.risk === 'medium' ? '中风险' : '低风险'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{asset.traffic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 资产风险等级和资产流量统计 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-lg p-4 border border-gray-600/50 shadow-lg">
          <h3 className="text-lg font-medium text-white mb-4">资产风险等级</h3>
          <div className="h-64">
            <ReactECharts option={assetRiskLevelOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-700/40 to-gray-800/40 rounded-lg p-4 border border-gray-600/50 shadow-lg">
          <h3 className="text-lg font-medium text-white mb-4">资产流量统计</h3>
          <div className="h-64">
            <ReactECharts option={assetTrafficStatsOption} style={{ height: '100%', width: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetMonitoring
