// 四级指标体系数据（严格基于文档）
export const indicatorSystem = {
  // 二级维度定义
  dimensions: [
    {
      name: '基础运行安全',
      weight: 0.25,
      score: 92,
      grade: 'best',
      indicators: [
        {
          name: '流量异常',
          weight: 0.40,
          score: 95,
          items: [
            { name: '峰值流量', value: '2.4Gbps', status: 'normal', baseline: '2.0Gbps' },
            { name: '流量波动率', value: '3.2%', status: 'normal', baseline: '<5%' },
            { name: '协议异常', value: '0', status: 'best', baseline: '0' }
          ]
        },
        {
          name: '资源消耗',
          weight: 0.35,
          score: 88,
          items: [
            { name: '带宽利用率', value: '68%', status: 'normal', baseline: '<70%' },
            { name: '会话数异常', value: '12,450', status: 'warn', baseline: '10,000' }
          ]
        },
        {
          name: '服务可用性',
          weight: 0.25,
          score: 96,
          items: [
            { name: 'DNS响应率', value: '99.9%', status: 'best', baseline: '99%' },
            { name: '关键服务连通性', value: '100%', status: 'best', baseline: '100%' }
          ]
        }
      ]
    },
    {
      name: '脆弱性安全',
      weight: 0.25,
      score: 76,
      grade: 'warn',
      indicators: [
        {
          name: '漏洞状态',
          weight: 0.45,
          score: 72,
          items: [
            { name: '高危漏洞数量', value: '12', status: 'critical', baseline: '0' },
            { name: '中危漏洞数量', value: '47', status: 'warn', baseline: '<30' },
            { name: '漏洞修复率', value: '68%', status: 'normal', baseline: '>80%' }
          ]
        },
        {
          name: '配置合规',
          weight: 0.30,
          score: 78,
          items: [
            { name: '弱口令检测', value: '3', status: 'warn', baseline: '0' },
            { name: '不安全协议', value: 'Telnet(2)', status: 'warn', baseline: '0' },
            { name: '权限配置', value: '95%', status: 'good', baseline: '90%' }
          ]
        },
        {
          name: '资产风险',
          weight: 0.25,
          score: 82,
          items: [
            { name: '资产价值暴露', value: '中', status: 'normal', baseline: '低' },
            { name: '暴露面', value: '443,80', status: 'normal', baseline: '监控中' }
          ]
        }
      ]
    },
    {
      name: '威胁安全',
      weight: 0.30,
      score: 58,
      grade: 'danger',
      indicators: [
        {
          name: '攻击检测',
          weight: 0.40,
          score: 45,
          items: [
            { name: '攻击事件数量', value: '1,284/天', status: 'critical', baseline: '<500' },
            { name: '攻击类型分布', value: 'DDoS(40%)', status: 'danger', baseline: '-' },
            { name: '攻击严重程度', value: '高', status: 'critical', baseline: '中' }
          ]
        },
        {
          name: '恶意程序',
          weight: 0.35,
          score: 67,
          items: [
            { name: '木马检测', value: '2', status: 'critical', baseline: '0' },
            { name: '挖矿程序', value: '1', status: 'danger', baseline: '0' },
            { name: '僵尸网络', value: '0', status: 'best', baseline: '0' }
          ]
        },
        {
          name: '异常行为',
          weight: 0.25,
          score: 52,
          items: [
            { name: '内网横向移动', value: '检测到', status: 'critical', baseline: '无' },
            { name: '数据外泄', value: '可疑', status: 'danger', baseline: '无' }
          ]
        }
      ]
    },
    {
      name: '数据安全',
      weight: 0.20,
      score: 88,
      grade: 'good',
      indicators: [
        {
          name: '数据泄露',
          weight: 0.50,
          score: 85,
          items: [
            { name: '敏感数据外发', value: '120MB', status: 'warn', baseline: '<100MB' },
            { name: '异常上传量', value: '警报', status: 'danger', baseline: '正常' }
          ]
        },
        {
          name: '数据传输',
          weight: 0.30,
          score: 92,
          items: [
            { name: '加密传输率', value: '94%', status: 'good', baseline: '>90%' },
            { name: '跨境传输', value: '0', status: 'best', baseline: '0' }
          ]
        },
        {
          name: '数据存储',
          weight: 0.20,
          score: 86,
          items: [
            { name: '数据分类分级', value: '完成', status: 'good', baseline: '完成' },
            { name: '存储安全', value: '合规', status: 'good', baseline: '合规' }
          ]
        }
      ]
    }
  ]
};

// 告警数据
export const alerts = [
  { level: 'critical', title: 'APT组织疑似入侵检测', time: '10:23:45', src: '45.142.214.89 [RU]', target: '核心数据库', ioc: 'Cobalt Strike', confidence: '98%' },
  { level: 'critical', title: '内网横向移动检测', time: '10:21:33', src: '192.168.5.100 [内网]', target: '域控服务器', ioc: 'PsExec', confidence: '95%' },
  { level: 'high', title: '大规模DDoS攻击', time: '10:18:12', src: '多源 [Botnet]', target: 'Web前端', ioc: 'UDP Flood', confidence: '100%' },
  { level: 'high', title: '敏感数据外发告警', time: '10:15:22', src: '192.168.5.100', target: '外网FTP', ioc: '数据打包', confidence: '87%' },
  { level: 'medium', title: '异常登录行为', time: '10:12:09', src: '北京IP', target: '管理员账户', ioc: '暴力破解', confidence: '76%' },
  { level: 'high', title: '挖矿程序活动', time: '10:08:56', src: 'Server-03', target: '内网', ioc: 'XMRig', confidence: '99%' }
];

// 攻击类型分布数据
export const attackTypeData = [
  { value: 335, name: 'Web攻击', itemStyle: { color: '#3B82F6' } },
  { value: 310, name: 'DDoS', itemStyle: { color: '#F97316' } },
  { value: 234, name: '漏洞利用', itemStyle: { color: '#EF4444' } },
  { value: 135, name: '暴力破解', itemStyle: { color: '#F59E0B' } },
  { value: 148, name: '恶意程序', itemStyle: { color: '#8B5CF6' } }
];

// 30天趋势数据
export const trendData = {
  days: Array.from({length: 30}, (_, i) => `${i+1}日`),
  baseRun: Array.from({length: 30}, () => Math.floor(Math.random() * 10) + 85),
  vulnerability: Array.from({length: 30}, () => Math.floor(Math.random() * 20) + 65),
  threat: Array.from({length: 30}, () => Math.floor(Math.random() * 40) + 40),
  dataSecurity: Array.from({length: 30}, () => Math.floor(Math.random() * 15) + 80),
  overall: Array.from({length: 30}, () => Math.floor(Math.random() * 20) + 70)
};

// 数据流模拟数据
export const dataStreamLogs = [
  '[10:24:12] [INFO] 流量采集节点-01 数据包: 1,204,532 pps',
  '[10:24:11] [WARN] 检测到TCP半连接异常增长: +234%',
  '[10:24:10] [INFO] 漏洞扫描任务完成: 发现高危漏洞 0 个',
  '[10:24:09] [ALERT] 威胁情报匹配: IP 45.142.214.89 命中恶意IOC',
  '[10:24:08] [INFO] 资产配置变更检测: Server-08 新增端口 8443',
  '[10:24:07] [WARN] 数据外发检测: 192.168.5.100 上传量异常 234MB',
  '[10:24:06] [INFO] 基线自学习完成: 更新流量特征库 v2.4.1'
];

// 关键指标速览数据
export const keyMetrics = [
  { name: '拦截攻击', value: '12.5K', unit: '', color: '#10B981' },
  { name: '活跃资产', value: '1,286', unit: '', color: '#3B82F6' },
  { name: '高危漏洞', value: '12', unit: '', color: '#EF4444' },
  { name: '加密传输率', value: '94', unit: '%', color: '#3B82F6' }
];
