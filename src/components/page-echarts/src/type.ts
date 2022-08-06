import * as echarts from 'echarts'

type EChartsOption = echarts.EChartsOption

export type IProps = {
  title?: string // 图表标题
  legendData?: { name: string }[] // 图例数据
  series: echarts.SeriesOption | echarts.SeriesOption[] // 系列数据
  otherOpthion?: EChartsOption
  xAxisData?: string[] // x轴数据
  isShowXAxis?: boolean // 是否显示x轴
  tooltipTrigger?: 'item' | 'axis' | 'none'
}
