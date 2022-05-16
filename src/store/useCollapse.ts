import { defineStore } from 'pinia'

export const useCollapse = defineStore('collapse', {
  state() {
    return {
      isCollapse: false
    }
  },
  actions: {
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  }
})
