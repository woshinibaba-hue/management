<template>
  <!--  http-request 自定义 图像上传方法 -->
  <el-upload
    :show-file-list="false"
    class="avatar-uploader"
    :http-request="upload"
    :before-upload="beforeUpload"
    :before-remove="beforeRemove"
    :on-remove="handleRemove"
    :on-preview="handlePreview"
  >
    <el-button type="primary" v-if="isUpload">上传图片</el-button>
  </el-upload>

  <div class="img-list">
    <img src="" alt="" />
  </div>
</template>

<script setup lang="ts">
import { useUpload, usePermission } from '@/hooks'

const isUpload = usePermission('img', 'create')
const isDelete = usePermission('img', 'delete')

const { upload, beforeUpload, fileList, handleRemove, beforeRemove } =
  useUpload(isDelete)

console.log(fileList.value)

const handlePreview = () => {
  console.log()
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
