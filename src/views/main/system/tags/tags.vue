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
        class="cover"
        action="http://localhost:8888/api/upload/img"
        name="image"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
    </PageDialog>
  </div>
</template>

<script setup lang="ts">
import { searchConfig } from './config/search'
import { tableConfig } from './config/table'
import { dialogConfig } from './config/dialog'

import { storeToRefs } from 'pinia'
import { useTags } from '@/store/useTags'

import { usePageDialog } from '@/hooks/usePageDialog'

import { UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import { ITag } from '@/server/tags/type'

const searchParams = ref<{ name: string }>({ name: '' })

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

const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  imageUrl.value = response.data.filesPath[0].url
}

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

watchEffect(() => {
  if (!dialogFormVisible.value) {
    imageUrl.value = ''
  }
})
</script>

<style scoped lang="less">
.cover {
  width: 100px;
  height: 100px;
  border: 1px dashed #8c939d;
  border-radius: 5px;
  overflow: hidden;

  .avatar-uploader-icon,
  img {
    width: 100px;
    height: 100px;
    font-size: 26px;
    color: #8c939d;
  }
}
</style>
