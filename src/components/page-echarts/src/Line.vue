<template>
  <div class="line" ref="echartRef"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
type EChartsOption = echarts.EChartsOption

const echartRef = ref<HTMLDivElement>()

type IProps = {
  title?: string // 图表标题
  legendData?: { name: string }[] // 图例数据
  series: echarts.SeriesOption | echarts.SeriesOption[] // 系列数据
  otherOpthion?: EChartsOption
  xAxisData?: string[] // x轴数据
  isShowXAxis?: boolean // 是否显示x轴
  tooltipTrigger?: 'item' | 'axis' | 'none'
}

const props = withDefaults(defineProps<IProps>(), {
  title: '',
  isShowXAxis: true,
  tooltipTrigger: 'axis'
})

onMounted(() => {
  if (!echartRef.value) return
  const myChart = echarts.init(echartRef.value)
  const option: EChartsOption = {
    title: {
      text: props.title
    },
    tooltip: {
      trigger: props.tooltipTrigger
    },
    legend: {
      data: props.legendData
    },
    xAxis: {
      show: props.isShowXAxis,
      type: 'category',
      boundaryGap: false,
      data: props.xAxisData
    },
    yAxis: {
      type: 'value'
    },
    series: props.series
  }

  myChart.setOption(option)
})
</script>

<style scoped>
.line {
  width: 100%;
  height: 300px;
}
</style>
