<template>
  <el-upload
    class="cover"
    name="image"
    :action="url"
    :show-file-list="false"
    :before-upload="beforeAvatarUpload"
    :on-success="handleSuccess"
  >
    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const url = process.env.VUE_APP_BASE_URL + '/upload/img'

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('请选择 jpg 格式的封面!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('封面大小不能超过 2Mb!')
    return false
  }
  return true
}

withDefaults(
  defineProps<{
    imgUrl: string | null
  }>(),
  {
    imgUrl: null
  }
)

const emits = defineEmits<{
  (e: 'handleSuccess', url: string): void
}>()

const handleSuccess: UploadProps['onSuccess'] = (response) => {
  emits('handleSuccess', response.data.filesPath[0].url)
}
</script>

<style scoped lang="less">
.cover {
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }

  :deep(.el-upload) {
    border: 1px dashed #d9d9d9;
  }
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  text-align: center;
}
</style>
