<template>
  <div class="showreel">
    <PageContent
      :content-table-config="tableConfig"
      :data="data"
      @headerClick="handleNewData"
      @edit="handleEditData"
      @delete="handleDeleteData"
    />

    <PageDialog
      v-model="dialogFormVisible"
      :form-config="dialogConfig"
      page-name="showreel"
      :title="title"
      :default-form-data="defaultFormData"
      @confirm="dialogConfirm"
    >
      <template #default>
        <PageUpload :show-list="false" @success="success" />
        <img
          v-if="cover || defaultFormData.cover"
          :src="cover || defaultFormData.cover"
        />
      </template>
    </PageDialog>
  </div>
</template>

<script setup lang="ts">
import { tableConfig } from './config/table'
import { dialogConfig } from './config/dialog'

import { usePageDialog } from '@/hooks'

import {
  getShowreelList,
  addShowreel,
  updateShowreel,
  deleteShowreel
} from '@/server/showreel'
import { IShowreel } from '@/server/showreel/types.d'

const data = ref<IShowreel[]>([])
const dialogFormVisible = ref(false)

function getList() {
  getShowreelList().then((res) => {
    data.value = res.data
  })
}

// 获取作品集列表
getList()

const title = ref('上传作品集')
const createCb = () => {
  dialogFormVisible.value = true
  title.value = '上传作品集'
}

const editCb = () => {
  dialogFormVisible.value = true
  title.value = '编辑作品集'
}

const { handleNewData, handleEditData, defaultFormData } = usePageDialog(
  createCb,
  editCb
)

// 点击确定按钮
const dialogConfirm = (formData: any) => {
  if (defaultFormData.value.id) {
    // 编辑
    updateShowreel({
      ...formData,
      cover: cover.value || defaultFormData.value.cover,
      id: defaultFormData.value.id
    }).then(() => {
      getList()
    })
  } else {
    // 新增
    addShowreel({ ...formData, cover: cover.value }).then(() => {
      getList()
    })
  }
  ElMessage.success('操作成功')
}

const cover = ref('')

// 上传封面成功
const success = (url: string) => {
  defaultFormData.value.cover = url
  cover.value = url
}

// 删除作品集
const handleDeleteData = (data: any) => {
  deleteShowreel(data.id).then(() => {
    getList()
    ElMessage.success('删除成功')
  })
}
</script>

<style scoped lang="less">
.showreel {
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
}
</style>
