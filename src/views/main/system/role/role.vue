<template>
  <div class="role">
    <PageSearch
      :search-config="searchConfig"
      v-model="formData"
      @search="search"
    />

    <PageContent
      :content-table-config="tableConfig"
      :data="loginStore.roles"
      @headerClick="handleNewData"
      @edit="handleEditData"
    />

    <PageDialog
      v-model="dialogFormVisible"
      :form-config="dialogConfig"
      :default-form-data="defaultFormData"
      :title="title"
      page-name="role"
    >
      <el-tree
        ref="treeRef"
        :data="treeData"
        node-key="id"
        :props="{
          children: 'children',
          label: 'name'
        }"
        show-checkbox
      />
    </PageDialog>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

import { useLoginStore } from '@/store'

import { usePageDialog } from '@/hooks'
import { mapMenusToChecked } from '@/utils/map_router'

import { ElTree } from 'element-plus'
import { PageSearch } from '@/components/page-search'
import { PageContent } from '@/components/page-content'
import { PageDialog } from '@/components/page-dialog'

import { searchConfig } from './config/search'
import { tableConfig } from './config/table'
import { dialogConfig } from './config/dialog'

import * as roleTypes from '@/server/role/type'
import * as menuTypes from '@/server/menu/type'

const loginStore = useLoginStore()

const title = ref('添加角色')

const formData = ref<roleTypes.IRoleParams>()
const treeRef = ref<InstanceType<typeof ElTree>>()

const dialogFormVisible = ref(false)

const createCb = () => {
  dialogFormVisible.value = true
  title.value = '添加角色'
}

const editCb = (row: roleTypes.IRole) => {
  dialogFormVisible.value = true
  title.value = '编辑角色'

  nextTick(() => {
    // 获取需要勾选的节点id
    const checkeds = mapMenusToChecked(row.menuList as menuTypes.IMenu[])
    // 设置需要勾选的节点(注意：必须设置node-key)
    treeRef.value?.setCheckedKeys(checkeds)
  })
}

const { defaultFormData, handleNewData, handleEditData } =
  usePageDialog<roleTypes.IRole>(createCb, editCb)

const treeData = ref<menuTypes.IMenu[]>(loginStore.menu)

// 搜索
const search = async () => {
  await loginStore.getRoleList(formData.value)
}
</script>

<style scoped></style>
