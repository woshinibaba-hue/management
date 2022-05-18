<template>
  <div class="page-content">
    <Table v-bind="contentTableConfig" :tableData="users">
      <template #header>
        <el-button type="primary" plain>
          {{ contentTableConfig.addBtnText }}
        </el-button>
      </template>
      <!-- 处理时间格式 -->
      <template #createtime="{ scope }">
        {{ format.formDate(scope.createtime) }}
      </template>
      <template #handler>
        <el-button size="small" type="primary">编辑</el-button>
        <el-popconfirm title="确认永久删除该数据？">
          <template #reference>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import { Table } from '@/base_components/Table'

import { format } from '@/utils/format'

import { ITableConfig } from '@/base_components/Table/types'
import { IUser } from '@/server/users/types'

type IProps = {
  contentTableConfig: ITableConfig
  users: IUser[]
}

defineProps<IProps>()
</script>

<style scoped lang="less"></style>
