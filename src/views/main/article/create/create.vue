<template>
  <div class="create">
    <div class="title">
      <input type="text" v-model="title" placeholder="输入文章标题..." />
      <div class="btns">
        <el-button @click="reset">清空</el-button>
        <el-button type="primary" @click="release">发布</el-button>
      </div>
    </div>
    <PageEditor v-model="content" @uploadImage="handleUploadImage" />
  </div>
</template>

<script setup lang="ts">
import { publishArticle } from '@/server/article'
import { uploadFileImg } from '@/server/upload'

const content = ref('')
const title = ref('')

const reset = () => {
  content.value = ''
  title.value = ''
}

const release = async () => {
  if (content.value.trim() && title.value.trim()) {
    // const formData = new FormData()
    // formData.append('title', title.value)
    // formData.append('content', content.value)
    await publishArticle({
      title: title.value,
      content: content.value
    })
    ElMessage.success('发布成功')
    reset()
  } else {
    ElMessage.warning('文章标题或内容不能为空！')
  }
}

// 上传图片
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
</script>

<style scoped lang="less">
.create {
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.1);

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 60px;
    padding: 10px 20px;

    background-color: #fff;

    input {
      width: 80%;
      font-size: 24px;
      border: 0;
      outline: none;
    }
  }
}

:deep(.v-md-editor) {
  border-radius: 0;
  box-shadow: none;
}
</style>
