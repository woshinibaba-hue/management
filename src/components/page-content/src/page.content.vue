<template>
  <div class="page-content">
    <Table v-bind="contentTableConfig" :tableData="data">
      <template #header>
        <el-button type="primary" plain>
          {{ contentTableConfig.addBtnText }}
        </el-button>
      </template>
      <!-- 处理时间格式 -->
      <template #createtime="{ scope }">
        {{ format.formDate(scope.createtime) }}
      </template>
      <template #status="{ scope }">
        <el-switch
          :active-value="1"
          :inactive-value="0"
          v-model="scope.status"
          inline-prompt
          width="50px"
          active-color="#13ce66"
          inactive-color="#f56c6c"
          active-text="启用"
          inactive-text="禁用"
          @change="changeStatus"
        />
      </template>
      <template #handler="{ scope }">
        <el-button
          v-if="isUpdate"
          size="small"
          type="primary"
          @click="$emit('edit', scope)"
        >
          编辑
        </el-button>

        <el-popconfirm title="确认永久删除该数据？" v-if="isDelete">
          <template #reference>
            <el-button
              size="small"
              type="danger"
              @click="$emit('delete', scope)"
            >
              删除
            </el-button>
          </template>
        </el-popconfirm>

        <el-alert
          title="暂无操作权限"
          type="warning"
          v-if="!isDelete && !isUpdate"
          :closable="false"
        />
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

import { Table } from '@/base_components/Table'

import { format } from '@/utils/format'
import { usePermission } from '@/hooks/usePermission'

import { ITableConfig } from '@/base_components/Table/types'
import * as userTypes from '@/server/users/types'

type IProps = {
  contentTableConfig: ITableConfig
  data: any[]
}

type IEmits = {
  (e: 'changeStatus', status: number): void
  (e: 'edit', data: userTypes.IUser): void
  (e: 'delete', data: userTypes.IUser): void
}

const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()

// 验证权限
// const isCreate = usePermission(props.contentTableConfig.pageName, 'create')
const isUpdate = usePermission(props.contentTableConfig.pageName, 'update')
// const isQuery = usePermission(props.contentTableConfig.pageName, 'query')
const isDelete = usePermission(props.contentTableConfig.pageName, 'delete')

const changeStatus = (status: number) => {
  emits('changeStatus', status)
}
</script>

<style scoped lang="less"></style>
