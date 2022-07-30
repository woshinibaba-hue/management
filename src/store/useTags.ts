import {
  getTags,
  createTag,
  updateTag as update,
  deleteTag as del
} from '@/server/tags'

import { BaseTag, ITag } from '@/server/tags/type'

export const useTags = defineStore('tags', () => {
  // 所有的标签列表
  const tags = ref<ITag[]>([])
  // 需要展示的标签列表
  const showTags = ref<ITag[]>([])

  // 获取标签列表
  const getTagList = async (name?: string, isAll = true) => {
    const res = await getTags(name)
    if (isAll) tags.value = res.data
    showTags.value = res.data
  }

  // 添加标签
  const addTag = async (data: BaseTag) => {
    await createTag(data)
    getTagList()
    ElMessage.success('添加成功')
  }

  // 编辑标签
  const updateTag = async (data: ITag) => {
    await update(data)
    getTagList()
    ElMessage.success('修改成功')
  }

  // 删除标签
  const deleteTag = async (id: number) => {
    await del(id)
    getTagList()
    ElMessage.success('删除成功')
  }

  return {
    tags,
    getTagList,
    addTag,
    showTags,
    updateTag,
    deleteTag
  }
})
