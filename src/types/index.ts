// 告警级别常量
export const AlertLevel = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low'
} as const;

export type AlertLevel = typeof AlertLevel[keyof typeof AlertLevel];

// 告警状态常量
export const AlertStatus = {
  PENDING: '未处理',
  PROCESSING: '处理中',
  RESOLVED: '已处理'
} as const;

export type AlertStatus = typeof AlertStatus[keyof typeof AlertStatus];

// 安全等级常量
export const SecurityLevel = {
  SAFE: '安全',
  WARNING: '警告',
  HIGH_RISK: '高危',
  CRITICAL: '严重'
} as const;

export type SecurityLevel = typeof SecurityLevel[keyof typeof SecurityLevel];

// 告警类型接口
export interface Alert {
  id: number;
  type: string;
  severity: string;
  source: string;
  time: string;
  status: string;
}

// 流量数据接口
export interface FlowData {
  labels: string[];
  values: number[];
}

// 维度数据接口
export interface DimensionData {
  name: string;
  value: number;
  change: number;
  color: string;
}

// 威胁统计数据接口
export interface ThreatStats {
  attacks: number;
  alerts: number;
  vulnerabilities: number;
}

// 图表配置接口
export interface ChartOption {
  series: any[];
  tooltip?: any;
  grid?: any;
  xAxis?: any;
  yAxis?: any;
  legend?: any;
}

// 组件Props类型

// TrafficMonitoring组件Props
export interface TrafficMonitoringProps {
  currentTime: Date;
}

// ThreatMonitoring组件Props
export interface ThreatMonitoringProps {
  currentTime: Date;
}

// 安全指标项接口
export interface SecurityIndicatorItem {
  name: string;
  value: string;
  status: string;
  baseline: string;
}

// 安全指标接口
export interface SecurityIndicator {
  name: string;
  weight: number;
  score: number;
  items: SecurityIndicatorItem[];
}

// 安全维度接口
export interface SecurityDimension {
  name: string;
  weight: number;
  score: number;
  grade: string;
  indicators: SecurityIndicator[];
}

// 指标系统接口
export interface IndicatorSystem {
  dimensions: SecurityDimension[];
}

// 趋势数据接口
export interface TrendData {
  days: string[];
  baseRun: number[];
  vulnerability: number[];
  threat: number[];
  dataSecurity: number[];
  overall: number[];
}

// 攻击类型数据接口
export interface AttackTypeData {
  value: number;
  name: string;
  itemStyle: {
    color: string;
  };
}
