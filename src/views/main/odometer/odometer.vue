<template>
  <div class="odometer">
    <el-row :gutter="24">
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header> 总注册用户 </template>
          {{ userNum?.usersNum }}
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header> 今日新增注册 </template>
          {{ userNum?.todayusersNum }}
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header> 总留言数量 </template>
          {{ commentNum?.guestbookNum }}
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <template #header> 今日新增留言 </template>
          {{ commentNum?.todayguestbookNum }}
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card shadow="always">
          <template #header> 网站流量统计 </template>
          <Line v-bind="data" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="always">
          <template #header> 网站数据统计 </template>
          <Pie :seriesData="totalNum" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {
  getCommentNum,
  getUserNum,
  getTotalNum,
  getSevenDays
} from '@/server/odometer'

const userNum = ref()
const commentNum = ref()
let data: any = reactive({
  xAxis: [],
  pv: [],
  uv: []
})

const totalNum = ref<{ name: string; value: number }[]>([])

getSevenDays().then((res) => {
  data.xAxis = res.data.xData
  data.pv = res.data.pv
  data.uv = res.data.uv
})

getTotalNum().then(({ data }) => {
  totalNum.value = [
    { name: '友链数量', value: data.LinkNum },
    { name: '文章数量', value: data.articleNum },
    { name: '留言数量', value: data.guestbookNum },
    { name: '标签数量', value: data.tagNum },
    { name: '用户数量', value: data.userNum }
  ]
})

getUserNum().then((res) => {
  userNum.value = res.data
})
getCommentNum().then((res) => {
  commentNum.value = res.data
})
</script>

<style scoped lang="less">
:deep(.el-row) {
  margin-bottom: 20px;
}
</style>
