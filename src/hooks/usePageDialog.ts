import { ref } from 'vue'

export function usePageDialog<T>(
  createCb: () => void,
  editCb: (row: any) => void
) {
  const defaultFormData = ref<T>()

  const handleNewData = () => {
    ;(defaultFormData.value as any) = {}
    createCb && createCb()
  }

  const handleEditData = (row: any) => {
    editCb && editCb(row)

    defaultFormData.value = { ...row }
  }

  return {
    handleNewData,
    handleEditData,
    defaultFormData
  }
}
