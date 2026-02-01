import React, { useState, useEffect } from 'react'
import TrafficMonitoring from './RealTimeMonitoring/TrafficMonitoring'
import ThreatMonitoring from './RealTimeMonitoring/ThreatMonitoring'
import AssetMonitoring from './RealTimeMonitoring/AssetMonitoring'

const RealTimeMonitoring: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-8">

      {/* 流量监控面板 */}
      <TrafficMonitoring />

      {/* 威胁监控面板 */}
      <ThreatMonitoring currentTime={currentTime} />

      {/* 资产监控面板 */}
      <AssetMonitoring />
    </div>
  )
}

export default RealTimeMonitoring