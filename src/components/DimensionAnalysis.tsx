import React, { useState } from 'react'
import BasicOperationSecurity from './DimensionAnalysis/BasicOperationSecurity'
import VulnerabilitySecurity from './DimensionAnalysis/VulnerabilitySecurity'
import ThreatSecurity from './DimensionAnalysis/ThreatSecurity'
import DataSecurity from './DimensionAnalysis/DataSecurity'

const DimensionAnalysis: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('basic')

  const subTabs = [
    { id: 'basic', name: '基础运行安全' },
    { id: 'vulnerability', name: '脆弱性安全' },
    { id: 'threat', name: '威胁安全' },
    { id: 'data', name: '数据安全' }
  ]

  return (
    <div className="space-y-6">
      {/* 子标签导航 */}
      <div className="bg-gray-800/50 rounded-xl p-1 border border-gray-700/50 backdrop-blur-sm inline-flex">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium rounded-lg transition-all ${activeSubTab === tab.id ? 'bg-gray-700/50 text-white shadow-sm' : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/30'}`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* 基础运行安全分析页 */}
      {activeSubTab === 'basic' && <BasicOperationSecurity />}

      {/* 脆弱性安全分析页 */}
      {activeSubTab === 'vulnerability' && <VulnerabilitySecurity />}

      {/* 威胁安全分析页 */}
      {activeSubTab === 'threat' && <ThreatSecurity />}

      {/* 数据安全分析页 */}
      {activeSubTab === 'data' && <DataSecurity />}
    </div>
  )
}

export default DimensionAnalysis