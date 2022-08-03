<template>
  <div class="tags">
    <PageSearch
      :searchConfig="searchConfig"
      v-model="searchParams"
      @search="search"
    />

    <PageContent
      :content-table-config="tableConfig"
      @headerClick="handleNewData"
      :data="showTags"
      @edit="handleEditData"
      @delete="handleDeleteData"
    />

    <PageDialog
      v-model="dialogFormVisible"
      :form-config="dialogComputedConfig"
      page-name="tag"
      :title="title"
      :default-form-data="defaultFormData"
      @confirm="dialogConfirm"
    >
      <el-upload
        class="cover-uploader"
        :show-file-list="false"
        :httpRequest="upload"
        :on-success="handleSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </PageDialog>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { searchConfig } from './config/search'
import { tableConfig } from './config/table'
import { dialogConfig } from './config/dialog'

import { storeToRefs } from 'pinia'
import { useTags } from '@/store/useTags'

import { usePageDialog, useUpload } from '@/hooks'

import { ITag } from '@/server/tags/type'

const searchParams = ref<{ name: string }>({ name: '' })
const { upload, url } = useUpload()

const title = ref('新增标签')

const tagStore = useTags()
const { tags, showTags } = storeToRefs(tagStore)
// 初始化标签列表数据
tagStore.getTagList()

// 控制弹窗展示
const dialogFormVisible = ref(false)

// 给弹窗下拉框赋值
const dialogComputedConfig = computed(() => {
  dialogConfig.formItems.forEach((item) => {
    if (item.type === 'select') {
      item.options = tags.value.map((tag) => ({
        title: tag.name,
        value: tag.id!
      }))
    }
  })

  return dialogConfig
})

const imageUrl = ref('')

const createCb = () => {
  dialogFormVisible.value = true
  title.value = '新增标签'
}

const editCb = (row: ITag) => {
  dialogFormVisible.value = true
  title.value = '编辑标签'
  imageUrl.value = row.cover
}

const { handleEditData, defaultFormData, handleNewData } = usePageDialog<ITag>(
  createCb,
  editCb
)

// 点击搜索按钮
const search = () => {
  tagStore.getTagList(searchParams.value.name, false)
}

// 点击确定
const dialogConfirm = (formData: any) => {
  if (defaultFormData.value?.id) {
    tagStore.updateTag({
      id: defaultFormData.value.id,
      name: formData.name,
      color: formData.color,
      cover: imageUrl.value,
      parent_id: formData.parent_id
    })
  } else {
    tagStore.addTag({ ...formData, cover: imageUrl.value })
  }
}

// 点击删除按钮触发
const handleDeleteData = (row: ITag) => {
  tagStore.deleteTag(row.id!)
}

const handleSuccess = () => {
  imageUrl.value = url.value
}

watchEffect(() => {
  if (!dialogFormVisible.value) {
    imageUrl.value = ''
  }
})
</script>

<style scoped lang="less">
:deep(.el-upload) {
  width: 100px;
  height: 100px;
  border: 1px dashed #e9e9e9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
