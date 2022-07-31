// import { defineStore } from 'pinia'
import { ElNotification, ElMessage } from 'element-plus'

import { getLink, deleteLink, editLink as edit } from '@/server/link'
import { LinkType, BaseLinkType } from '@/server/link/type'

export const useLink = defineStore('link', () => {
  const link = ref<LinkType[]>()
  const passLink = ref<LinkType[]>()

  // 获取需要审核的链接
  const getVerify = (isNotify = true) => {
    getLink(0).then((res) => {
      link.value = res.data.data

      if (res.data.total && isNotify)
        ElNotification.warning({
          title: '审核通知',
          message: `博主您还有 ${res.data.total} 条友链需要审核`
        })
    })
  }

  // 获取需要审核通过的所有链接
  const getAll = () => {
    getLink(1).then((res) => {
      passLink.value = res.data.data
    })
  }

  // 删除友链
  const removerLink = async (id: number) => {
    await deleteLink(id)
    ElMessage.success('删除成功')
    getAll()
  }

  // 编辑友链
  const editLink = (link: BaseLinkType, id: number) => {
    edit(id, link).then(() => {
      ElMessage.success('编辑成功')
      getAll()
    })
  }

  return {
    link,
    getVerify,
    getAll,
    passLink,
    removerLink,
    editLink
  }
})
