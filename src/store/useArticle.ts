import { PublishArticleParams } from '@/server/article/types'

interface IArticle extends PublishArticleParams {
  id: number
}

export const useArticle = defineStore('article', () => {
  const articleDetail = ref<IArticle | null>(null)

  const setArticleDetail = (params: IArticle | null) => {
    articleDetail.value = params
  }

  return {
    articleDetail,
    setArticleDetail
  }
})
