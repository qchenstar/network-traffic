import React, { useState, useEffect } from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const menuItems = [
    { id: 'dashboard', name: '态势总览' },
    { id: 'dimension', name: '维度分析' },
    { id: 'monitoring', name: '实时监控' },
    { id: 'security', name: '流量指标' },
    { id: 'historical', name: '历史分析' },
    { id: 'report', name: '报告中心' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="tech-panel header-area rounded-xl flex items-center justify-between px-8 relative overflow-hidden">
      <div className="corner corner-tl text-blue-500"></div>
      <div className="corner corner-tr text-blue-500"></div>
      <div className="corner corner-bl text-blue-500"></div>
      <div className="corner corner-br text-blue-500"></div>
      
      <div className="flex items-center w-full">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-lg bg-blue-500/20 border-2 border-blue-500/50 flex items-center justify-center animate-pulse">
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
        </div>
        <div className="ml-3">
          <h1 className="text-xl font-bold tracking-wide text-white" style={{ fontFamily: 'Orbitron, sans-serif', textShadow: '0 0 20px rgba(59,130,246,0.5)' }}>
            网络安全态势感知平台
          </h1>
          <p className="text-xs text-blue-400/70 tracking-[0.1em] uppercase mt-1">Network Security Platform</p>
        </div>
      </div>
      
      <nav className="flex space-x-1 mx-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === item.id ? 'bg-blue-500/30 border border-blue-400/70 text-blue-300 shadow-lg shadow-blue-500/20 font-semibold' : 'text-gray-400 hover:text-white hover:bg-gray-800 hover:border hover:border-gray-600'}`}
              style={{ 
                boxShadow: activeTab === item.id ? '0 0 15px rgba(59, 130, 246, 0.4)' : 'none',
                textShadow: activeTab === item.id ? '0 0 10px rgba(59, 130, 246, 0.7)' : 'none'
              }}
            >
              {item.name}
            </button>
          ))}
        </nav>
      
      <div className="flex items-center space-x-8">
        <div className="text-right">
          <div id="clock" className="text-3xl digit font-bold text-white">
            {currentTime.toLocaleTimeString('zh-CN', { hour12: false })}
          </div>
          <div id="date" className="text-sm text-gray-500 mono mt-1">
            {currentTime.toLocaleDateString('zh-CN')} {currentTime.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
          </div>
        </div>
        <div className="h-10 w-px bg-gray-700"></div>
        <div className="flex items-center space-x-3 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div>
            <div className="text-xs text-gray-400">系统状态</div>
            <div className="text-sm font-bold text-green-400 mono">MONITORING</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">安全运营时长</div>
          <div className="text-lg digit font-bold text-white">892<span className="text-sm text-gray-500 ml-1">天</span></div>
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;
