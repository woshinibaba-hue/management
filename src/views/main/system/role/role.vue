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
      @delete="handleDeleteData"
    />

    <PageDialog
      v-model="dialogFormVisible"
      :form-config="dialogConfig"
      :default-form-data="defaultFormData"
      :title="title"
      page-name="role"
      @confirm="confirm"
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
        @check="handleCheck"
      />
    </PageDialog>
  </div>
</template>

<script setup lang="ts">
import { useLoginStore } from '@/store'

import { usePageDialog } from '@/hooks'
import { mapMenusToChecked } from '@/utils/map_router'

import { searchConfig } from './config/search'
import { tableConfig } from './config/table'
import { dialogConfig } from './config/dialog'

import * as roleTypes from '@/server/role/type'
import * as menuTypes from '@/server/menu/type'

const loginStore = useLoginStore()

const title = ref('添加角色')

const formData = ref<roleTypes.IRoleParams>()
const treeRef = ref<InstanceType<typeof ElTree>>()

// 重新加载角色列表
loginStore.getRoleList()

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
    const checkeds = mapMenusToChecked(row.menuList)
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

// 当树形控件勾选时触发
const checkList = ref<number[]>([])
const handleCheck = (_: any, checkedKeys: any) => {
  checkList.value = [...checkedKeys.checkedKeys, ...checkedKeys.halfCheckedKeys]
}

// 点击确认按钮
const confirm = (data: any) => {
  if (defaultFormData.value?.id) {
    loginStore.updateRole(defaultFormData.value.id, {
      ...data,
      menuList: checkList.value
    })
  } else {
    loginStore.addRole({ ...data, menuList: checkList.value })
  }
}

// 删除角色
const handleDeleteData = (data: any) => {
  loginStore.deleteRole(data.id)
}
</script>
