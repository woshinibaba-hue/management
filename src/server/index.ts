import Request from './request'

import storage from '@/utils/storage'

const request = new Request({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
  interceptors: {
    requestInstance(config) {
      const user = storage.get('userResult')

      if (user) {
        config.headers &&
          (config.headers.Authorization = `Bearer ${user.token}`)
      }

      return config
    },
    requestInstanceCatch(err) {
      return Promise.reject(err)
    },
    responseInstance(config) {
      return config
    },
    responseInstanceCatch(err) {
      return Promise.reject(err)
    }
  }
})

export default request
