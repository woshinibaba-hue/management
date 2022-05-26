<template>
  <div class="page-content">
    <Table
      v-if="data"
      v-bind="contentTableConfig"
      :tableData="data"
      :isHandler="isDelete || isUpdate"
      :isQuery="isQuery"
      :total="total"
      @change-page="changePage"
      @change-size="changeSize"
    >
      <template #header v-if="isCreate">
        <el-button type="primary" plain @click="handlerHeaderClick">
          {{ contentTableConfig?.addBtnText }}
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
          @change="changeStatus($event, scope.id)"
          :disabled="scope.auto === '超级管理员'"
        />
      </template>
      <template #cover="{ scope }">
        <el-image
          v-if="scope.cover"
          style="width: 100px; height: 100px"
          :src="scope.cover"
          fit="cover"
        />
        <span v-else>暂无封面</span>
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

        <el-popconfirm
          title="确认永久删除该数据？"
          v-if="isDelete"
          @confirm="$emit('delete', scope)"
        >
          <template #reference>
            <el-button size="small" type="danger"> 删除 </el-button>
          </template>
        </el-popconfirm>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, defineExpose, withDefaults } from 'vue'

import { Table } from '@/base_components/Table'

import { format } from '@/utils/format'
import { usePermission } from '@/hooks'

import { ITableConfig } from '@/base_components/Table/types'

type IProps = {
  contentTableConfig: ITableConfig
  data: any[]
  total?: number
  showFooter?: boolean
}

type IEmits = {
  (e: 'changeStatus', status: number, userId: number): void
  (e: 'edit', data: any): void
  (e: 'delete', data: any): void
  (e: 'headerClick'): void
  (e: 'changeSize', currentSize: number): void
  (e: 'changePage', currentPage: number): void
}

const props = withDefaults(defineProps<IProps>(), {
  data: () => [],
  total: 0,
  showFooter: true
})
const emits = defineEmits<IEmits>()

// 验证权限
const isCreate = usePermission(props.contentTableConfig.pageName, 'create')
const isUpdate = usePermission(props.contentTableConfig.pageName, 'update')
const isQuery = usePermission(props.contentTableConfig.pageName, 'query')
const isDelete = usePermission(props.contentTableConfig.pageName, 'delete')
const changeStatus = (status: number, id: number) => {
  if (id) {
    emits('changeStatus', status, id)
  }
}

// 头部按钮点击
const handlerHeaderClick = () => {
  emits('headerClick')
}

// 分页
const changePage = (page: number) => {
  emits('changePage', page)
}
const changeSize = (size: number) => {
  emits('changeSize', size)
}

defineExpose({
  isQuery
})
</script>

<style scoped lang="less">
.page-content {
  box-sizing: border-box;
  margin-top: 20px;
  padding: 20px;
  border-radius: 20px;
  background-color: #fff;
}
</style>
