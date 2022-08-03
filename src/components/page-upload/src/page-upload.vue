<template>
  <!--  http-request 自定义 图像上传方法 -->
  <el-upload
    v-model:file-list="fileList"
    class="avatar-uploader"
    :http-request="upload"
    :before-upload="beforeUpload"
    :before-remove="beforeRemove"
    list-type="picture"
    :on-remove="handleRemove"
  >
    <el-button type="primary">上传图片</el-button>
  </el-upload>
</template>

<script setup lang="ts">
import { useUpload } from '@/hooks'

const { upload, beforeUpload, fileList, handleRemove, beforeRemove } =
  useUpload()
</script>

<style scoped></style>
