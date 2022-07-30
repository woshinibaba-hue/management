<template>
  <div class="create">
    <el-form :model="formData" :rules="rules" ref="formRef">
      <el-form-item label="文章标题" prop="title">
        <el-input placeholder="输入文章标题" v-model="formData.title" />
      </el-form-item>
      <el-form-item label="文章描述" prop="description">
        <el-input placeholder="输入文章描述" v-model="formData.description" />
      </el-form-item>
      <el-form-item label="文章标签" prop="tags">
        <el-transfer
          :data="tags"
          v-model="formData.tags"
          :titles="['全部标签', '已选择标签']"
        />
      </el-form-item>
      <el-form-item label="文章封面">
        <Upload :imgUrl="formData.cover" @handleSuccess="handleSuccess" />
      </el-form-item>
      <el-form-item label="文章内容" class="content" prop="content">
        <PageEditor
          v-model="formData.content"
          @uploadImage="handleUploadImage"
        />
      </el-form-item>
    </el-form>
    <div class="btns">
      <el-button type="primary" @click="release">发布</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { publishArticle } from '@/server/article'
import { uploadFileImg } from '@/server/upload'

import { FormRules } from 'element-plus'

import { getTags } from '@/server/tags'
import { PublishArticleParams } from '@/server/article/types'

import Upload from '@/components/Upload/upload.vue'

const tags = ref<{ key: number; label: string; disabled: boolean }[]>([])

let formData = reactive<PublishArticleParams>({
  title: '',
  content: '',
  description: '',
  cover: null,
  tags: []
})

// 表单校验
const rules = reactive<FormRules>({
  title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' }],
  content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
  description: [
    { required: true, message: '文章描述不能为空', trigger: 'blur' }
  ],
  tags: [{ required: true, message: '文章标签不能为空', trigger: 'blur' }]
})

const formRef = ref<InstanceType<typeof ElForm>>()

const release = () => {
  formRef.value?.validate(async (isValid) => {
    if (isValid) {
      const res = await publishArticle(formData)
      ElMessage.success(res.message)
      formData.cover = null
      formRef.value?.resetFields()
    }
  })
}

// md 上传图片
const handleUploadImage = async (insertImage: any, files: File[]) => {
  // 创建 FormData 对象
  const formData = new FormData()
  // 将文件添加到 formData 对象
  formData.append('image', files[0])
  // 上传图片
  const res = await uploadFileImg(formData)

  // 将图片插入到编辑器中
  insertImage({
    url: res.data[0].url
  })
}

const handleSuccess = (url: string) => {
  formData.cover = url
}

// 获取标签
getTags().then((res) => {
  res.data.forEach((item) => {
    tags.value.push({
      key: item.id,
      label: item.name,
      disabled: false
    })
  })
})
</script>

<style scoped lang="less">
.create {
  padding: 20px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #fff;
}

.content {
  :deep(.el-form-item__content) {
    display: unset;
  }
}
</style>
