import { ref } from 'vue'

export function usePageDialog<T>(createCb: () => void, editCb: () => void) {
  const defaultFormData = ref<T>()

  const handleNewData = () => {
    ;(defaultFormData.value as any) = {}
    createCb && createCb()
  }

  const handleEditData = (row: any) => {
    defaultFormData.value = { ...row }
    editCb && editCb()
  }

  return {
    handleNewData,
    handleEditData,
    defaultFormData
  }
}
