import { useState } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import DimensionAnalysis from './components/DimensionAnalysis'
import RealTimeMonitoring from './components/RealTimeMonitoring'
import HistoricalAnalysis from './components/HistoricalAnalysis'
import ReportCenter from './components/ReportCenter'
import NetworkMetrics from './components/NetworkMetrics'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true)
  const [isAside] = useState(false)

  const menuItems = [
    { id: 'dashboard', name: '态势总览', icon: '📊' },
    { id: 'dimension', name: '多维度分析', icon: '🔍' },
    { id: 'monitoring', name: '实时监控', icon: '⚡' },
    { id: 'security', name: '流量指标', icon: '📊' },
    { id: 'historical', name: '历史分析', icon: '📈' },
    { id: 'report', name: '报告中心', icon: '📋' }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'dimension':
        return <DimensionAnalysis />
      case 'monitoring':
        return <RealTimeMonitoring />
      case 'security':
        return <NetworkMetrics />
      case 'historical':
        return <HistoricalAnalysis />
      case 'report':
        return <ReportCenter />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden p-4">
      {/* 左侧导航栏 */}
      {isAside && (
        <aside className={`transition-all duration-300 ease-in-out bg-gray-800 rounded-xl p-4 mr-4 flex flex-col ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
          {/* 导航栏标题 */}
          {/*{!sidebarCollapsed && (*/}
          {/*  <div className="mb-8 pb-4 border-b border-gray-700">*/}
          {/*    <h2 className="text-xl font-bold text-blue-400 mb-2">导航菜单</h2>*/}
          {/*    <p className="text-xs text-gray-400">Network Security Navigation</p>*/}
          {/*  </div>*/}
          {/*)}*/}

          {/* 导航菜单项 */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === item.id ? 'bg-blue-500/30 border border-blue-400/70 text-blue-300 shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-gray-700 hover:border hover:border-gray-600'}`}
                style={{ 
                  boxShadow: activeTab === item.id ? '0 0 15px rgba(59, 130, 246, 0.4)' : 'none',
                  textShadow: activeTab === item.id ? '0 0 10px rgba(59, 130, 246, 0.7)' : 'none'
                }}
              >
                <span className={`text-xl ${activeTab === item.id ? 'text-blue-400' : 'text-gray-400'}`}>
                  {item.icon}
                </span>
                {!sidebarCollapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
                {activeTab === item.id && !sidebarCollapsed && (
                  <span className="ml-auto w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                )}
              </button>
            ))}
          </nav>

          {/* 导航栏控制按钮 */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="flex items-center justify-center w-full px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <svg 
                className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
              {!sidebarCollapsed && (
                <span className="ml-2 text-sm text-gray-400">收起</span>
              )}
            </button>
          </div>
        </aside>
      )}

      {/* 右侧主内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部标题栏 */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* 主要内容区域 */}
        <main className="flex-1 overflow-y-auto bg-gray-900 mt-4">
          <div className="max-w-7xl mx-auto">
            <div className="transition-all duration-500 ease-in-out transform opacity-100">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
