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
      <el-form-item label="是否置顶 (默认为不置顶)" prop="isTop">
        <el-switch
          inline-prompt
          active-text="是"
          inactive-text="否"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </el-form-item>
      <el-form-item label="是否可评论 (默认为可评论)" prop="isComment">
        <el-switch
          inline-prompt
          active-text="是"
          inactive-text="否"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
        />
      </el-form-item>
      <el-form-item label="文章封面" class="cover-uploader">
        <el-upload
          :show-file-list="false"
          :httpRequest="upload"
          :on-success="handleSuccess"
        >
          <img v-if="formData.cover" :src="formData.cover" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
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
import { storeToRefs } from 'pinia'
import { Plus } from '@element-plus/icons-vue'
import { FormRules } from 'element-plus'

import { useArticle } from '@/store'

import { publishArticle, updateArticle } from '@/server/article'

import { getTags } from '@/server/tags'
import { PublishArticleParams } from '@/server/article/types'

import { useUpload } from '@/hooks'

const { upload, url } = useUpload()

const tags = ref<{ key: number; label: string; disabled: boolean }[]>([])

const store = useArticle()
const { articleDetail } = storeToRefs(store)

const formData = ref<PublishArticleParams>({
  title: '',
  content: '',
  description: '',
  cover: null,
  tags: []
})

// 当存在详情时，设置表单数据
if (articleDetail.value) {
  formData.value = articleDetail.value
}

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
      let res
      if (articleDetail.value) {
        res = await updateArticle(formData.value)
      } else {
        res = await publishArticle(formData.value)
      }
      ElMessage.success(res?.message)
      formData.value = {
        title: '',
        content: '',
        description: '',
        cover: null,
        tags: []
      }
    }
  })
}

// md 上传图片
const handleUploadImage = async (insertImage: any, files: File[]) => {
  // 上传至本地服务器
  // 创建 FormData 对象
  // const formData = new FormData()
  // // 将文件添加到 formData 对象
  // formData.append('image', files[0])
  // // 上传图片
  // const res = await uploadFileImg(formData)
  // // 将图片插入到编辑器中
  // insertImage({
  //   url: res.data[0].url
  // })
  // 上传至七牛云
  try {
    await upload(files[0])
    console.log(url.value)
    insertImage({
      url: url.value
    })
  } catch (e) {
    console.log(e)
  }
}

const handleSuccess = () => {
  formData.value.cover = url.value
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

onUnmounted(() => {
  store.setArticleDetail(null)
})
</script>

<style scoped lang="less">
.create {
  padding: 20px;
  border-radius: 6px;
  overflow: hidden;
  background-color: #fff;
}

:deep(.el-upload) {
  width: 150px;
  height: 150px;
  border: 1px dashed #e9e9e9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
