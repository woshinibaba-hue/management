import Request from './request'

const request = new Request({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 5000,
  interceptors: {
    requestInstance(config) {
      console.log('单独的axios请求拦截器被执行')
      return config
    },
    requestInstanceCatch(err) {
      console.log('单独的axios请求失败拦截器被执行')
      return err
    },
    responseInstance(config) {
      console.log('单独的axios响应拦截器被执行')
      return config
    },
    responseInstanceCatch(err) {
      console.log('单独的axios响应失败拦截器被执行')
      return err
    }
  }
})

export default request
