import type { ChartOption } from '../types';

/**
 * 创建折线图配置
 * @param data 图表数据
 * @param xAxisData X轴数据
 * @param color 图表颜色
 * @param title 图表标题
 * @returns 折线图配置
 */
export const createLineChartOption = (
  data: number[],
  xAxisData: string[],
  color: string = '#3B82F6',
  title: string = ''
): ChartOption => {
  return {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#E5E7EB' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      axisLabel: {
        color: '#9CA3AF'
      },
      axisLine: {
        lineStyle: {
          color: '#374151'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#9CA3AF'
      },
      axisLine: {
        lineStyle: {
          color: '#374151'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(55, 65, 81, 0.5)'
        }
      }
    },
    series: [
      {
        name: title,
        type: 'line',
        smooth: true,
        data: data,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{
              offset: 0, color: `${color}40`
            }, {
              offset: 1, color: `${color}10`
            }]
          }
        },
        lineStyle: {
          color: color,
          width: 2
        },
        itemStyle: {
          color: color
        }
      }
    ]
  };
};

/**
 * 创建饼图配置
 * @param data 饼图数据
 * @param title 图表标题
 * @returns 饼图配置
 */
export const createPieChartOption = (
  data: Array<{ value: number; name: string; itemStyle?: { color: string } }>,
  title: string = ''
): ChartOption => {
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#E5E7EB' }
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      textStyle: {
        color: '#9CA3AF'
      }
    },
    series: [
      {
        name: title,
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#111827',
          borderWidth: 2
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold',
            color: '#E5E7EB'
          }
        },
        labelLine: {
          show: false
        },
        data: data
      }
    ]
  };
};

/**
 * 创建柱状图配置
 * @param data 柱状图数据
 * @param yAxisData Y轴数据
 * @param title 图表标题
 * @returns 柱状图配置
 */
export const createBarChartOption = (
  data: number[],
  yAxisData: string[],
  title: string = ''
): ChartOption => {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(17, 24, 39, 0.9)',
      borderColor: '#374151',
      textStyle: { color: '#E5E7EB' }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: 'rgba(55, 65, 81, 0.5)'
        }
      },
      axisLabel: {
        color: '#6B7280'
      }
    },
    yAxis: {
      type: 'category',
      data: yAxisData,
      axisLine: {
        lineStyle: {
          color: '#374151'
        }
      },
      axisLabel: {
        color: '#6B7280',
        fontSize: 10
      }
    },
    series: [
      {
        name: title,
        type: 'bar',
        data: data,
        itemStyle: {
          color: function(params: any) {
            const colors = ['#EF4444', '#F87171', '#FB923C', '#FBBF24', '#FDE68A', '#A3E635', '#6EE7B7', '#38BDF8', '#818CF8', '#C084FC'];
            return colors[params.dataIndex % colors.length];
          },
          borderRadius: [0, 4, 4, 0]
        }
      }
    ]
  };
};

/**
 * 创建仪表盘配置
 * @param value 仪表盘值
 * @param name 仪表盘名称
 * @returns 仪表盘配置
 */
export const createGaugeChartOption = (
  value: number,
  name: string = '安全态势指数'
): ChartOption => {
  return {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        radius: '100%',
        pointer: {
          show: false
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 1, y2: 0,
              colorStops: [{
                offset: 0, color: '#F59E0B'
              }, {
                offset: 1, color: '#10B981'
              }]
            }
          }
        },
        axisLine: {
          lineStyle: {
            width: 60,
            color: [
              [1, '#F59E0B']
            ]
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false
        },
        title: {
          offsetCenter: [0, '30%'],
          fontSize: 20,
          color: '#E5E7EB',
          fontWeight: 'normal'
        },
        detail: {
          fontSize: 72,
          offsetCenter: [0, '0%'],
          valueAnimation: true,
          formatter: '{value}',
          color: '#F59E0B',
          fontWeight: 'bold'
        },
        data: [
          {
            value: value.toFixed(1),
            name: name
          }
        ]
      }
    ]
  };
};

/**
 * 创建实时流量图表配置
 * @param inboundData 入站流量数据
 * @param outboundData 出站流量数据
 * @param xAxisData X轴数据
 * @returns 实时流量图表配置
 */
export const createRealTimeTrafficOption = (
  inboundData: number[],
  outboundData: number[],
  xAxisData: string[]
): ChartOption => {
  return {
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
      data: xAxisData,
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
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(59, 130, 246, 0.3)'
            }, {
              offset: 1, color: 'rgba(59, 130, 246, 0.05)'
            }]
          }
        },
        data: inboundData
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
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(16, 185, 129, 0.3)'
            }, {
              offset: 1, color: 'rgba(16, 185, 129, 0.05)'
            }]
          }
        },
        data: outboundData
      }
    ]
  };
};
