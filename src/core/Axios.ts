import { AxiosPromise, AxiosRequestConfig, Method } from '../types'
import dispatchRequest from './dispatchRequest'

class Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config)
  }
  _requestMethoodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }
  _requestMethoodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethoodWithoutData('get', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethoodWithoutData('delete', url, config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethoodWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethoodWithoutData('options', url, config)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethoodWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethoodWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethoodWithData('post', url, data, config)
  }
}

export default Axios
