import axios from '../index'

export const searchPackages = (params) => {
  return axios.get(`/package/online?name=${params.name}`)
}

export const getLocalPackages = (params) => {
  return axios.get('/package/local')
}
