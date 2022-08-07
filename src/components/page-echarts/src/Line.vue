<template>
  <ZEChart :option="option" />
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import ZEChart from '@/base_components/Echart'
import { ComputedRef } from 'vue'

const props = defineProps<{
  title?: string
  xAxis: string[]
  pv: { name: string; value: number }[]
  uv: { name: string; value: number }[]
  options?: echarts.EChartsCoreOption | echarts.EChartsOption
}>()

const option: ComputedRef<echarts.EChartsOption | echarts.EChartsCoreOption> =
  computed(() => ({
    title: {
      text: props.title
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: props.xAxis
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '浏览量 PV',
        type: 'line',
        data: props.pv
      },
      {
        name: '访客量 UV',
        type: 'line',
        data: props.uv
      }
    ]
  }))
</script>

<style scoped></style>
