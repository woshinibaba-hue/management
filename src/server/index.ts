import Request from './request'

const request = new Request({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
  interceptors: {
    requestInstance(config) {
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
