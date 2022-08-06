<template>
  <div class="odometer">
    <el-row :gutter="24">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header> 总注册用户 </template>
          111
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header> 今日新增注册 </template>
          222
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header> 总留言数量 </template>
          333
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header> 今日新增留言 </template>
          555
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :span="12">
        <el-card shadow="always">
          <template #header> 网站流量统计 </template>
          <Line v-bind="echartPvConfig" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always">
          <template #header> 网站数据统计 </template>
          <Line v-bind="echartDataConfig" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { echartPvConfig, echartDataConfig } from './config/echart.config'
</script>

<style scoped lang="less">
:deep(.el-row) {
  margin-bottom: 20px;
}
</style>
