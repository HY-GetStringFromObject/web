import axios from 'axios'
import { getMessageFromRequestErrorObject } from '../utils/api'

export const API_URL = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ? 'http://localhost:8080' : process.env.REACT_APP_API_URL

function axiosClient () {
  const axiosClient = axios.create({
    baseURL: API_URL,
    timeout: 15000
  })

  if (process.env.NODE_ENV === 'development') {
    axiosClient.interceptors.request.use(request => {
      console.log('Starting Request', request)
      return request
    }, err => {
      console.log('request error', err)
      return Promise.reject(err)
    })

    axiosClient.interceptors.response.use(response => {
      console.log('Response:', response)
      return response
    }, err => {
      console.log('response error', err)
      err.message = getMessageFromRequestErrorObject(err)
      return Promise.reject(err)
    })
  } else {
    axiosClient.interceptors.response.use(response => {
      return response
    }, err => {
      err.message = getMessageFromRequestErrorObject(err)
      return Promise.reject(err)
    })
  }
  return axiosClient
}

export default axiosClient
