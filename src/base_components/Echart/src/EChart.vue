<template>
  <div class="echart" ref="echartRef" :style="{ width, height }"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'

const echartRef = ref<HTMLDivElement>()

const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    option: echarts.EChartsCoreOption | echarts.EChartsOption
  }>(),
  {
    width: '100%',
    height: '300px'
  }
)

onMounted(() => {
  // 当 options 发生变化时，重新渲染图表
  watchEffect(() => {
    echarts.init(echartRef.value!).setOption(props.option)
  })
})
</script>

<style scoped></style>
