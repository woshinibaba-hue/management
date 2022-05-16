import axios, { AxiosInstance, AxiosError } from 'axios'

import { ElLoading, ElMessage } from 'element-plus'

import {
  ZRequestInterceptors,
  ZRequestConfig,
  IErrorResult,
  IDataResult
} from './types'

const DEFAULT_LOADING = true // loading默认状态

class Request {
  private instance?: AxiosInstance // 保存axios实例
  private interceptors?: ZRequestInterceptors // 在创建axios实例的时，可传入拦截器
  private loading?: any
  private showLoading?: boolean

  constructor(config: ZRequestConfig) {
    // 1. 创建axios实例，并且保存到instance属性当中，这样就可以在实例化该类的时候传入不同的配置，从而创建不同的axios实例
    this.instance = axios.create(config)

    // 3. 在创建axios实例的时候传入的拦截器进行保存
    this.interceptors = config.interceptors

    // 3.1 给loading状态赋值
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    // 4. 给axios实例添加拦截器(给单独的axios实例添加，如果没有传递，则不进行拦截操作)
    this.instance.interceptors.request.use(
      this.interceptors?.requestInstance,
      this.interceptors?.requestInstanceCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInstance,
      this.interceptors?.responseInstanceCatch
    )

    // 5. 给所有的axios实例添加拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 5.1 如果需要展示loading，则展示loading
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '加载中...',
            background: 'rgba(0, 0, 0, 0.3)'
          })
        }
        return config
      },
      (err) => {
        // 失败的时候关闭loading
        setTimeout(() => {
          this.loading?.close()
        }, 1000)
        console.log(err)
        return Promise.reject(err)
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        setTimeout(() => {
          this.loading?.close()
        }, 1000)
        return config
      },
      (err: AxiosError<IErrorResult>) => {
        ElMessage.error(err.response?.data.message || '失败')

        setTimeout(() => {
          this.loading?.close()
        }, 1000)
        return Promise.reject(err)
      }
    )
  }

  // 2. 封装request方法，可以传入不同的参数，从而发送不同的请求
  private request<T = any>(config: ZRequestConfig): Promise<IDataResult<T>> {
    return new Promise((resolve, reject) => {
      this.instance
        ?.request(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: ZRequestConfig): Promise<IDataResult<T>> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: ZRequestConfig): Promise<IDataResult<T>> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T = any>(config: ZRequestConfig): Promise<IDataResult<T>> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T = any>(config: ZRequestConfig): Promise<IDataResult<T>> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

export default Request
