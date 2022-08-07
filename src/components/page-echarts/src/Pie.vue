<template>
  <ZEChart :option="option" />
</template>

<script setup lang="ts">
import { ComputedRef } from 'vue'
import * as echarts from 'echarts'
import ZEChart from '@/base_components/Echart'

const props = defineProps<{
  seriesData: { name: string; value: number }[]
}>()

console.log(props.seriesData)

const option: ComputedRef<echarts.EChartsOption | echarts.EChartsCoreOption> =
  computed(() => ({
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: '网站数据统计',
        type: 'pie',
        radius: [50, 110],
        center: ['50%', '38%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: props.seriesData
      }
    ]
  }))
</script>

<style scoped></style>
