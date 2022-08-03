import { UploadRequestOptions, UploadRawFile, UploadFile } from 'element-plus'
import * as qiniu from 'qiniu-js'

import { uploadFileImg, getImgList, deleteImg } from '@/server/upload'

const cloudUrl = process.env.VUE_APP_CLOUD_URL

export function useUpload() {
  const url = ref('')
  const fileList = ref<{ name: string; url: string }[]>([])

  // 将图像上传至七牛云
  const upload = (options: UploadRequestOptions) => {
    return new Promise((resolve, reject) => {
      // 获取七牛云 token
      uploadFileImg().then((res) => {
        const token = res.data.uploadToken
        // 用户上传图片
        const file = options.file

        // compressImage 压缩图片
        // quality 压缩质量  noCompressIfLarger 为 true 时如果发现压缩后图片大小比原来还大，则返回源图片
        qiniu
          .compressImage(file, { quality: 0.92, noCompressIfLarger: true })
          .then((res) => {
            const observable = qiniu.upload(
              res.dist as File,
              null, // 文件名称,如果为null 则使用 hash 作为文件名称
              token
            )

            // 上传图片
            observable.subscribe({
              // 上传失败
              error(err) {
                ElMessage.error(err.message)
                reject(err.message)
              },
              // 上传成功
              complete(res) {
                url.value = cloudUrl + res.key
                ElMessage.success('上传成功')
                resolve('上传成功')
              }
            })
          })
      })
    })
  }

  // 图片上传前触发的钩子
  const beforeUpload = (uploadFile: UploadRawFile) => {
    const reg = /(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i

    if (reg.test(uploadFile.name)) {
      return true
    } else {
      ElMessage.error('仅支持图片格式')
      return false
    }
  }

  getImgList().then((res) => {
    res.data?.forEach((item) => {
      fileList.value.push({
        name: item.key,
        url: cloudUrl + item.key
      })
    })
  })

  const beforeRemove = () => {
    return new Promise<boolean>((resolve, reject) => {
      ElMessageBox.confirm('您将永久删除该图片吗?', '提示', {
        type: 'warning'
      })
        .then(() => {
          resolve(true)
        })
        .catch(() => {
          reject(false)
        })
    })
  }

  // 删除文件
  const handleRemove = async (uploadFile: UploadFile) => {
    await deleteImg(uploadFile.name)
    ElMessage.success('删除成功')
  }

  return {
    url,
    upload,
    beforeUpload,
    fileList,
    handleRemove,
    beforeRemove
  }
}
