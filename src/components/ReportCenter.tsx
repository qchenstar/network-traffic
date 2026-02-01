import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

const ReportCenter: React.FC = () => {
  const [reportType, setReportType] = useState('daily');
  const [reportDate, setReportDate] = useState('2024-01-31');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');
  const [templates, setTemplates] = useState([
    { id: '1', name: '安全事件分析模板', description: '包含详细的安全事件分析和趋势图表', sections: ['安全事件统计', '系统运行状态', '安全措施执行', '建议措施'] },
    { id: '2', name: '合规审计模板', description: '专注于合规性检查和审计要求', sections: ['合规状态概览', '发现的问题', '整改建议', '合规评分'] },
    { id: '3', name: '威胁情报模板', description: '聚焦于威胁情报分析和预警', sections: ['威胁态势概览', '重点威胁分析', '攻击源分析', '防护建议'] }
  ]);
  const [newTemplate, setNewTemplate] = useState({ name: '', description: '', sections: [''] });
  const [editingTemplate, setEditingTemplate] = useState<{ id: string; name: string; description: string; sections: string[] } | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [emailSettings] = useState({
    enabled: false,
    recipients: '',
    schedule: 'daily',
    time: '08:00'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [customReportConfig, setCustomReportConfig] = useState({
    components: [
      { id: '1', name: '安全态势概览', type: 'dashboard', enabled: true },
      { id: '2', name: '安全事件统计', type: 'chart', enabled: true },
      { id: '3', name: '系统运行状态', type: 'table', enabled: true },
      { id: '4', name: '威胁分析', type: 'chart', enabled: false },
      { id: '5', name: '漏洞统计', type: 'chart', enabled: false }
    ],
    dataSources: ['security_events', 'system_metrics', 'network_traffic'],
    style: {
      theme: 'default',
      colorScheme: 'blue',
      fontSize: '12px'
    }
  });
  const [exportFormat, setExportFormat] = useState('pdf');

  // 模拟历史报告数据
  const historicalReports = [
    { id: '1', name: '2024年1月31日安全日报', type: 'daily', generatedAt: '2024-01-31 08:00:00', status: 'generated' },
    { id: '2', name: '2024年第4周安全周报', type: 'weekly', generatedAt: '2024-01-28 09:00:00', status: 'generated' },
    { id: '3', name: '2024年1月安全月报', type: 'monthly', generatedAt: '2024-01-31 10:00:00', status: 'generated' },
    { id: '4', name: '2024年1月30日安全日报', type: 'daily', generatedAt: '2024-01-30 08:00:00', status: 'generated' }
  ];

  // 报告生成统计图表配置
  const reportStatsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['1月25日', '1月26日', '1月27日', '1月28日', '1月29日', '1月30日', '1月31日'],
      axisLabel: {
        color: '#e0e0e0',
        rotate: 45
      },
      axisLine: {
        lineStyle: {
          color: '#333'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '报告数量',
      nameTextStyle: {
        color: '#e0e0e0'
      },
      axisLabel: {
        color: '#e0e0e0'
      },
      axisLine: {
        lineStyle: {
          color: '#333'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#222'
        }
      }
    },
    series: [
      {
        name: '日报',
        type: 'bar',
        data: [12, 19, 15, 17, 20, 18, 22],
        itemStyle: {
          color: '#36a2eb'
        }
      },
      {
        name: '周报',
        type: 'bar',
        data: [2, 0, 0, 3, 0, 0, 2],
        itemStyle: {
          color: '#ff6384'
        }
      },
      {
        name: '月报',
        type: 'bar',
        data: [0, 0, 0, 0, 0, 0, 1],
        itemStyle: {
          color: '#ffce56'
        }
      }
    ]
  };

  // 模拟报告数据
  const reportData = {
    daily: {
      title: '2024年1月31日安全日报',
      summary: '今日系统运行稳定，共检测到12起安全事件，其中高风险事件2起，中风险事件5起，低风险事件5起。所有高风险事件已及时处理，系统安全态势良好。',
      sections: [
        {
          title: '安全事件统计',
          content: '今日共检测到12起安全事件，较昨日减少2起。其中DDoS攻击3起，SQL注入2起，XSS攻击3起，恶意软件2起，其他2起。'
        },
        {
          title: '系统运行状态',
          content: '所有服务器运行正常，CPU利用率平均为35%，内存使用率平均为45%，网络带宽使用率平均为30%。'
        },
        {
          title: '安全措施执行',
          content: '今日更新了3个安全补丁，优化了防火墙规则，加强了对敏感数据的访问控制。'
        }
      ],
      recommendations: [
        '继续监控DDoS攻击趋势，考虑升级防护措施',
        '定期进行漏洞扫描，及时修复发现的安全问题',
        '加强员工安全意识培训，防止社会工程学攻击'
      ]
    },
    weekly: {
      title: '2024年第4周安全周报',
      summary: '本周共检测到85起安全事件，其中高风险事件15起，中风险事件35起，低风险事件35起。安全态势总体稳定，未发生重大安全事故。',
      sections: [
        {
          title: '安全事件趋势',
          content: '本周安全事件数量较上周减少10%，主要是由于加强了DDoS攻击防护措施。SQL注入和XSS攻击数量有所增加，需要加强Web应用安全。'
        },
        {
          title: '系统运行状态',
          content: '所有服务器运行正常，平均可用性达到99.99%。网络延迟稳定，服务响应时间良好。'
        },
        {
          title: '安全措施执行',
          content: '本周更新了12个安全补丁，部署了新的入侵检测系统，优化了安全策略。'
        }
      ],
      recommendations: [
        '加强Web应用安全防护，防止SQL注入和XSS攻击',
        '定期进行安全渗透测试，发现并修复潜在安全漏洞',
        '优化安全监控系统，提高事件检测和响应速度'
      ]
    },
    monthly: {
      title: '2024年1月安全月报',
      summary: '本月共检测到380起安全事件，其中高风险事件65起，中风险事件160起，低风险事件155起。安全态势总体良好，重大安全事件处理及时。',
      sections: [
        {
          title: '安全事件分析',
          content: '本月安全事件主要集中在DDoS攻击(40%)、SQL注入(25%)、XSS攻击(20%)和恶意软件(15%)。攻击源主要来自境外IP地址，需要加强边界防护。'
        },
        {
          title: '系统运行状态',
          content: '所有服务器运行稳定，平均可用性达到99.98%。网络设备运行正常，未发生重大故障。'
        },
        {
          title: '安全措施执行',
          content: '本月更新了45个安全补丁，进行了2次全面安全评估，优化了安全架构。'
        }
      ],
      recommendations: [
        '加强网络边界防护，防止境外攻击',
        '建立安全事件响应预案，提高应急处理能力',
        '定期进行安全培训，提高全员安全意识',
        '优化安全监控系统，实现智能化分析和预警'
      ]
    }
  };

  // 生成报告功能
  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    // 模拟报告生成过程
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 生成报告内容
      const reportContent = reportData[reportType as keyof typeof reportData];
      
      // 模拟保存到系统
      console.log('报告生成成功:', {
        type: reportType,
        date: reportDate,
        content: reportContent
      });
      
      alert(`报告生成成功！\n报告类型：${reportType === 'daily' ? '日报' : reportType === 'weekly' ? '周报' : '月报'}\n报告日期：${reportDate}\n报告标题：${reportContent.title}`);
    } catch (error) {
      alert('报告生成失败，请重试');
      console.error('报告生成失败:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // 导出报告功能
  const handleExportReport = async () => {
    setIsExporting(true);
    
    // 模拟报告导出过程
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 生成报告内容
      const reportContent = reportData[reportType as keyof typeof reportData];
      
      // 模拟导出过程
      console.log('报告导出成功:', {
        type: reportType,
        date: reportDate,
        format: exportFormat.toUpperCase(),
        content: reportContent
      });
      
      // 模拟文件下载
      let fileName, blob, mimeType;
      
      if (exportFormat === 'pdf') {
        // 生成HTML格式的报告，可被浏览器打开
        fileName = `${reportContent.title}.html`;
        mimeType = 'text/html';
        const htmlContent = `
          <!DOCTYPE html>
          <html lang="zh-CN">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${reportContent.title}</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
              h1, h2 { color: #333; }
              h1 { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; }
              .section { margin-bottom: 20px; }
              .summary { background-color: #f5f5f5; padding: 15px; border-radius: 5px; }
              ul { padding-left: 20px; }
              li { margin-bottom: 5px; }
              .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc; text-align: right; color: #666; }
            </style>
          </head>
          <body>
            <h1>${reportContent.title}</h1>
            <div class="section summary">
              <h2>摘要</h2>
              <p>${reportContent.summary}</p>
            </div>
            ${reportContent.sections.map(section => `
              <div class="section">
                <h2>${section.title}</h2>
                <p>${section.content}</p>
              </div>
            `).join('')}
            <div class="section">
              <h2>建议措施</h2>
              <ul>
                ${reportContent.recommendations.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div class="footer">
              <p>生成时间: ${new Date().toLocaleString()}</p>
              <p>生成系统: 网络安全监控平台</p>
            </div>
          </body>
          </html>
        `;
        blob = new Blob([htmlContent], { type: mimeType });
      } else {
        // 生成CSV格式的报告，可被Excel打开
        fileName = `${reportContent.title}.csv`;
        mimeType = 'text/csv';
        const csvContent = `"${reportContent.title}",,\n"摘要","${reportContent.summary}",\n,,\n${reportContent.sections.map(section => `"${section.title}","${section.content}",`).join('\n')}\n,,\n"建议措施","${reportContent.recommendations.join('; ')}",`;
        blob = new Blob([csvContent], { type: mimeType });
      }
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert(`报告导出成功！\n文件已下载为: ${fileName}`);
    } catch (error) {
      alert('报告导出失败，请重试');
      console.error('报告导出失败:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // 保存邮件设置
  const handleSaveEmailSettings = () => {
    console.log('邮件设置保存成功:', emailSettings);
    alert('邮件设置保存成功！');
  };

  // 处理组件启用/禁用
  const handleComponentToggle = (componentId: string) => {
    setCustomReportConfig({
      ...customReportConfig,
      components: customReportConfig.components.map(component => 
        component.id === componentId ? { ...component, enabled: !component.enabled } : component
      )
    });
  };

  // 处理数据源选择
  const handleDataSourceToggle = (dataSource: string) => {
    setCustomReportConfig({
      ...customReportConfig,
      dataSources: customReportConfig.dataSources.includes(dataSource)
        ? customReportConfig.dataSources.filter(ds => ds !== dataSource)
        : [...customReportConfig.dataSources, dataSource]
    });
  };

  // 处理样式设置更改
  const handleStyleChange = (property: string, value: string) => {
    setCustomReportConfig({
      ...customReportConfig,
      style: {
        ...customReportConfig.style,
        [property]: value
      }
    });
  };

  // 查看历史报告
  const handleViewReport = (reportName: string) => {
    alert(`正在查看报告: ${reportName}`);
    // 这里可以添加打开报告详情的逻辑
  };

  // 导出历史报告
  const handleExportHistoricalReport = async (reportName: string) => {
    setIsExporting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      console.log('历史报告导出成功:', reportName);
      
      // 模拟文件下载
      let fileName, blob, mimeType;
      
      if (exportFormat === 'pdf') {
        // 生成HTML格式的报告，可被浏览器打开
        fileName = `${reportName}.html`;
        mimeType = 'text/html';
        const htmlContent = `
          <!DOCTYPE html>
          <html lang="zh-CN">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${reportName}</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
              h1, h2 { color: #333; }
              h1 { text-align: center; border-bottom: 2px solid #333; padding-bottom: 10px; }
              .section { margin-bottom: 20px; }
              ul { padding-left: 20px; }
              li { margin-bottom: 5px; }
              .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ccc; text-align: right; color: #666; }
            </style>
          </head>
          <body>
            <h1>${reportName}</h1>
            <div class="section">
              <p>这是一份历史安全报告，包含详细的安全事件分析和建议措施。</p>
            </div>
            <div class="section">
              <h2>报告内容</h2>
              <ul>
                <li>安全事件统计</li>
                <li>系统运行状态</li>
                <li>安全措施执行</li>
                <li>建议措施</li>
              </ul>
            </div>
            <div class="footer">
              <p>生成时间: ${new Date().toLocaleString()}</p>
              <p>生成系统: 网络安全监控平台</p>
            </div>
          </body>
          </html>
        `;
        blob = new Blob([htmlContent], { type: mimeType });
      } else {
        // 生成CSV格式的报告，可被Excel打开
        fileName = `${reportName}.csv`;
        mimeType = 'text/csv';
        const csvContent = `"${reportName}",,\n"报告内容","安全事件统计, 系统运行状态, 安全措施执行, 建议措施",`;
        blob = new Blob([csvContent], { type: mimeType });
      }
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert(`历史报告导出成功！\n文件已下载为: ${fileName}`);
    } catch (error) {
      alert('历史报告导出失败，请重试');
      console.error('历史报告导出失败:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // 模板管理功能
  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.description || newTemplate.sections.some(section => !section.trim())) {
      alert('请填写模板名称、描述和所有章节名称');
      return;
    }

    const template = {
      id: (templates.length + 1).toString(),
      name: newTemplate.name,
      description: newTemplate.description,
      sections: newTemplate.sections.filter(section => section.trim())
    };

    setTemplates([...templates, template]);
    setNewTemplate({ name: '', description: '', sections: [''] });
    alert('模板创建成功！');
  };

  const handleUpdateTemplate = () => {
    if (!editingTemplate || !editingTemplate.name || !editingTemplate.description || editingTemplate.sections.some(section => !section.trim())) {
      alert('请填写模板名称、描述和所有章节名称');
      return;
    }

    setTemplates(templates.map(template => 
      template.id === editingTemplate.id ? {
        ...template,
        name: editingTemplate.name,
        description: editingTemplate.description,
        sections: editingTemplate.sections.filter(section => section.trim())
      } : template
    ));
    setEditingTemplate(null);
    alert('模板更新成功！');
  };

  const handleDeleteTemplate = (id: string) => {
    if (window.confirm('确定要删除这个模板吗？')) {
      setTemplates(templates.filter(template => template.id !== id));
      alert('模板删除成功！');
    }
  };

  const handleAddSection = (isNew: boolean) => {
    if (isNew) {
      setNewTemplate({
        ...newTemplate,
        sections: [...newTemplate.sections, '']
      });
    } else if (editingTemplate) {
      setEditingTemplate({
        ...editingTemplate,
        sections: [...editingTemplate.sections, '']
      });
    }
  };

  const handleRemoveSection = (isNew: boolean, index: number) => {
    if (isNew) {
      setNewTemplate({
        ...newTemplate,
        sections: newTemplate.sections.filter((_, i) => i !== index)
      });
    } else if (editingTemplate) {
      setEditingTemplate({
        ...editingTemplate,
        sections: editingTemplate.sections.filter((_, i) => i !== index)
      });
    }
  };

  const handleSectionChange = (isNew: boolean, index: number, value: string) => {
    if (isNew) {
      setNewTemplate({
        ...newTemplate,
        sections: newTemplate.sections.map((section, i) => i === index ? value : section)
      });
    } else if (editingTemplate) {
      setEditingTemplate({
        ...editingTemplate,
        sections: editingTemplate.sections.map((section, i) => i === index ? value : section)
      });
    }
  };

  const handleUseTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    setActiveTab('generate');
    alert('已选择模板，您可以在报告生成面板中使用此模板。');
  };

  return (
    <div className="p-6 bg-gray-900 text-gray-100 min-h-screen">
      
      {/* 标签页导航 */}
      <div className="flex space-x-4 mb-6">
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'generate' ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('generate')}
        >
          自动报告
        </button>
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'custom' ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('custom')}
        >
          自定义报告
        </button>
        <button 
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'templates' ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400' : 'text-gray-400 hover:text-white'}`}
          onClick={() => setActiveTab('templates')}
        >
          报告列表
        </button>
      </div>
      
      {/* 报告生成标签页 */}
      {activeTab === 'generate' && (
        <>
          {/* 报告生成控制面板 */}
          <div className="bg-gray-800 rounded-xl p-4 mb-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-300">自动报告</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">报告类型</label>
                <select 
                  className="w-full bg-gray-700 border border-gray-600 text-gray-100 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                >
                  <option value="daily">日报</option>
                  <option value="weekly">周报</option>
                  <option value="monthly">月报</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">报告日期</label>
                <input 
                  type="date" 
                  className="w-full bg-gray-700 border border-gray-600 text-gray-100 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">导出格式</label>
                <select 
                  className="w-full bg-gray-700 border border-gray-600 text-gray-100 py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                >
                  <option value="pdf">HTML (浏览器打开)</option>
                  <option value="excel">CSV (Excel打开)</option>
                </select>
              </div>
              <div className="flex items-end">
                <div className="flex space-x-2 w-full">
                  <button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    onClick={handleGenerateReport}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        生成中...
                      </>
                    ) : (
                      '生成报告'
                    )}
                  </button>
                  <button 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                    onClick={handleExportReport}
                    disabled={isExporting}
                  >
                    {isExporting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        导出中...
                      </>
                    ) : (
                      '导出报告'
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* 模板选择 */}
            {selectedTemplate && (
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-blue-300">已选择模板</div>
                    <div className="text-xs text-gray-400">{templates.find(t => t.id === selectedTemplate)?.name}</div>
                  </div>
                  <button 
                    className="text-xs text-blue-400 hover:text-blue-300"
                    onClick={() => setSelectedTemplate(null)}
                  >
                    取消选择
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* 报告统计分析 */}
          <div className="bg-gray-800 rounded-xl p-4 mb-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-300">报告统计分析</h2>
            <div className="h-80">
              <ReactECharts option={reportStatsOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </div>
          
          {/* 报告预览 */}
          <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-300">报告预览</h2>
            <div className="bg-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center text-white">{reportData[reportType as keyof typeof reportData].title}</h3>
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2 text-blue-300">摘要</h4>
                <p className="text-gray-300">{reportData[reportType as keyof typeof reportData].summary}</p>
              </div>
              {reportData[reportType as keyof typeof reportData].sections.map((section, index) => (
                <div key={index} className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 text-blue-300">{section.title}</h4>
                  <p className="text-gray-300">{section.content}</p>
                </div>
              ))}
              <div>
                <h4 className="text-lg font-semibold mb-2 text-blue-300">建议措施</h4>
                <ul className="list-disc pl-5 text-gray-300 space-y-1">
                  {reportData[reportType as keyof typeof reportData].recommendations.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-600 text-right">
                <p className="text-gray-400">生成时间: {new Date().toLocaleString()}</p>
                <p className="text-gray-400">生成系统: 网络安全监控平台</p>
              </div>
            </div>
          </div>
          
        </>
      )}
      
      {/* 自定义报告标签页 */}
      {activeTab === 'custom' && (
        <>
          {/* 自定义报告配置 */}
          <div className="bg-gray-800 rounded-xl p-4 mb-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-300">自定义报告配置</h2>
            
            {/* 组件拖拽配置 */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-blue-300">组件配置</h3>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {customReportConfig.components.map(component => (
                    <div key={component.id} className="flex items-center justify-between p-3 bg-gray-600 rounded-lg">
                      <div>
                        <div className="font-medium text-white">{component.name}</div>
                        <div className="text-xs text-gray-400">类型: {component.type}</div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={component.enabled}
                        onChange={() => handleComponentToggle(component.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 数据源选择 */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-blue-300">数据源选择</h3>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2" 
                      checked={customReportConfig.dataSources.includes('security_events')}
                      onChange={() => handleDataSourceToggle('security_events')}
                    />
                    <label className="text-sm text-gray-300">安全事件数据</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2" 
                      checked={customReportConfig.dataSources.includes('system_metrics')}
                      onChange={() => handleDataSourceToggle('system_metrics')}
                    />
                    <label className="text-sm text-gray-300">系统指标数据</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2" 
                      checked={customReportConfig.dataSources.includes('network_traffic')}
                      onChange={() => handleDataSourceToggle('network_traffic')}
                    />
                    <label className="text-sm text-gray-300">网络流量数据</label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 样式自定义 */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 text-blue-300">样式自定义</h3>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">主题</label>
                    <select 
                      className="w-full bg-gray-600 border border-gray-500 text-gray-100 py-1 px-2 rounded-lg text-sm"
                      value={customReportConfig.style.theme}
                      onChange={(e) => handleStyleChange('theme', e.target.value)}
                    >
                      <option value="default">默认</option>
                      <option value="dark">深色</option>
                      <option value="light">浅色</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">配色方案</label>
                    <select 
                      className="w-full bg-gray-600 border border-gray-500 text-gray-100 py-1 px-2 rounded-lg text-sm"
                      value={customReportConfig.style.colorScheme}
                      onChange={(e) => handleStyleChange('colorScheme', e.target.value)}
                    >
                      <option value="blue">蓝色系</option>
                      <option value="red">红色系</option>
                      <option value="green">绿色系</option>
                      <option value="purple">紫色系</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">字体大小</label>
                    <select 
                      className="w-full bg-gray-600 border border-gray-500 text-gray-100 py-1 px-2 rounded-lg text-sm"
                      value={customReportConfig.style.fontSize}
                      onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                    >
                      <option value="10px">小</option>
                      <option value="12px">默认</option>
                      <option value="14px">大</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 生成自定义报告按钮 */}
            <div className="text-center">
              <button 
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                onClick={() => {
                  alert('自定义报告生成功能已触发！\n配置已保存并开始生成报告。');
                  console.log('生成自定义报告:', customReportConfig);
                }}
              >
                生成自定义报告
              </button>
            </div>
          </div>
        </>
      )}
      
      {/* 报告列表标签页 */}
      {activeTab === 'templates' && (
        <>
          {/* 报告列表 */}
          <div className="bg-gray-800 rounded-xl p-4 mb-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-300">报告列表</h2>
              <div className="flex items-center">
                <input 
                  type="text" 
                  className="bg-gray-700 border border-gray-600 text-gray-100 py-1 px-3 rounded-lg text-sm mr-2"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索报告..."
                />
                <select 
                  className="bg-gray-700 border border-gray-600 text-gray-100 py-1 px-2 rounded-lg text-sm"
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                >
                  <option value="pdf">HTML导出</option>
                  <option value="excel">CSV导出</option>
                </select>
              </div>
            </div>
            
            {/* 历史报告列表 */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">报告名称</th>
                    <th scope="col" className="px-6 py-3">报告类型</th>
                    <th scope="col" className="px-6 py-3">生成时间</th>
                    <th scope="col" className="px-6 py-3">状态</th>
                    <th scope="col" className="px-6 py-3">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {historicalReports
                    .filter(report => report.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(report => (
                      <tr key={report.id} className="bg-gray-700 border-b">
                        <td className="px-6 py-4">{report.name}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            report.type === 'daily' ? 'bg-blue-500 text-white' :
                            report.type === 'weekly' ? 'bg-red-500 text-white' :
                            'bg-yellow-500 text-white'
                          }`}>
                            {report.type === 'daily' ? '日报' :
                             report.type === 'weekly' ? '周报' :
                             '月报'}
                          </span>
                        </td>
                        <td className="px-6 py-4">{report.generatedAt}</td>
                        <td className="px-6 py-4">
                          <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                            已生成
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button 
                            className="text-blue-400 hover:text-blue-300 mr-3 transition-colors"
                            onClick={() => handleViewReport(report.name)}
                          >
                            查看
                          </button>
                          <button 
                            className="text-green-400 hover:text-green-300 transition-colors"
                            onClick={() => handleExportHistoricalReport(report.name)}
                          >
                            导出
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportCenter;