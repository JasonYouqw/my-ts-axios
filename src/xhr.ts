import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'
import { createError } from './helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, data = null, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    // 处理请求结果
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      // 处理响应headers
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      // 处理响应类型
      const responseData =
        responseType && responseType !== 'text'
          ? request.response
          : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    request.onerror = () => {
      const error = createError('Network Error', config, null, request)
      reject(error)
    }

    request.ontimeout = () => {
      const error = createError(
        `time out ${config.timeout} s`,
        config,
        null,
        request
      )
      reject(error)
    }

    // 转换请求headers
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLocaleLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
