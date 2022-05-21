import { ref } from 'vue'

export function usePageContent() {
  // 记录当前页码以及每页显示条数
  const paginationInfo = ref({
    currentPage: 1,
    currentSize: 10
  })

  // 切换分页
  const changePage = (page: number) => {
    paginationInfo.value.currentPage = page
  }
  const changeSize = (size: number) => {
    paginationInfo.value.currentSize = size
  }

  return {
    paginationInfo,
    changePage,
    changeSize
  }
}
