<template>
  <div class="list">
    <el-upload
      action="http://localhost:8888/api/upload/img"
      name="image"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :file-list="fileList"
      class="upload"
      :before-remove="handleRemove"
      :class="[{ 'is-delete': !isDelete }, { 'is-upload': !isCreate }]"
      :on-error="handleError"
      :on-success="handleSuccess"
      drag
    >
      <el-icon><Plus /></el-icon>
      <div class="el-upload__text">支持手动拖拽上传图片</div>
    </el-upload>

    <el-dialog v-model="dialogVisible" draggable destroy-on-close>
      <el-image :src="dialogImageUrl" fit="cover" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'

import * as imgServer from '@/server/upload'
import * as imgTypes from '@/server/upload/types'

import { usePermission } from '@/hooks/usePermission'

import { UploadProps, ElMessageBox } from 'element-plus'

const fileList = ref<imgTypes.ImageType[]>([])

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const isDelete = usePermission('img', 'delete')
const isCreate = usePermission('img', 'create')

// 获取图片列表
const getImageList = async () => {
  const { data } = await imgServer.getImgList()
  fileList.value = data
}
getImageList()

// 删除图片
const handleRemove = async (uploadFile: any) => {
  // 弹出确认框
  ElMessageBox.confirm(`确定删除 ${uploadFile.name} 图片吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    // 删除图片
    await imgServer.deleteImg(uploadFile.id)
    ElMessage.success(`${uploadFile.name} 图片删除成功`)
    // 删除后重新获取图片列表
    getImageList()
    return true
  })

  return false
}

// 查看图片
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  uploadFile.url && (dialogImageUrl.value = uploadFile.url)
  dialogVisible.value = true
}

// 图片上传失败
const handleError = (error: any) => {
  ElMessage.error(`${JSON.parse(error.message).msg}`)
}

// 图片上传成功
const handleSuccess = () => {
  ElMessage.success(`图片上传成功`)
}
</script>

<style scoped lang="less">
:deep(.el-dialog) {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-image {
  width: 300px;
}

:deep(.el-upload--picture-card) {
  background-color: unset;
}

.is-delete {
  :deep(.el-upload-list__item-delete) {
    display: none !important;
  }
}
.is-upload {
  :deep(.el-upload) {
    display: none !important;
  }
}
:deep(.el-upload) {
  text-align: center;
}

:deep(.el-upload--picture-card) {
  border: 0;
}

:deep(.el-upload-list__item) {
  margin: 0 20px 20px 0;
}
</style>
