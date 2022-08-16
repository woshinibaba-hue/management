<template>
  <!--  http-request 自定义 图像上传方法 -->
  <el-upload
    v-model:file-list="fileList"
    list-type="picture"
    :show-file-list="showList"
    class="avatar-uploader"
    :http-request="upload"
    :before-upload="beforeUpload"
    :before-remove="beforeRemove"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
  >
    <el-button type="primary" v-if="isUpload">上传图片</el-button>
  </el-upload>

  <div class="img-list">
    <img src="" alt="" />
  </div>
</template>

<script setup lang="ts">
import { useUpload, usePermission } from '@/hooks'

type IProps = {
  showList?: boolean
}

const isUpload = usePermission('img', 'create')
const isDelete = usePermission('img', 'delete')

const { upload, beforeUpload, fileList, handleRemove, beforeRemove, url } =
  useUpload(isDelete)

const emits = defineEmits<{
  (e: 'success', url: string): void
}>()

withDefaults(defineProps<IProps>(), {
  showList: true
})

const handleSuccess = () => {
  emits('success', url.value)
}
</script>

<style scoped lang="less">
:deep(.el-upload-list__item) {
  &:hover {
    .el-icon--close {
      display: v-bind("isDelete ? 'unset' : 'none'");
    }
  }
}
</style>
