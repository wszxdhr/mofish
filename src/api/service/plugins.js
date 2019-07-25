import axios from '../index'

export const getPlugins = (params) => {
  return axios.get('/api/plugins/list')
}

export const addPlugin = (params) => {
  return axios.post('/api/plugins/add', params)
}

export const deletePlugin = (params) => {
  return axios.delete(`/api/plugins/delete?name=${params.name}`)
}
