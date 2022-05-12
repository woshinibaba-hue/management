import { AxiosRequestConfig, AxiosResponse } from 'axios'

interface ZRequestInterceptors {
  // 请求拦截器
  requestInstance?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // 请求失败拦截器
  requestInstanceCatch?: (err: any) => any
  // 响应拦截器
  responseInstance?: (config: AxiosResponse) => AxiosResponse
  // 响应失败拦截器
  responseInstanceCatch?: (err: any) => any
}

// 扩展 axios 的config类型，使得实例化axios时，能够传入更多的属性
interface ZRequestConfig extends AxiosRequestConfig {
  interceptors?: ZRequestInterceptors
  showLoading?: boolean // 是否需要展示loading
}

interface IDataResult<T = any> {
  code: number
  data: T
  message?: string
}

interface IErrorResult<T = any> {
  code: number
  message: string
  data?: T
}

export { ZRequestInterceptors, ZRequestConfig, IDataResult, IErrorResult }
