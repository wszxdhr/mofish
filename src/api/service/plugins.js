import axios from '../index'

export const getPlugins = (params) => {
  return axios.get('/api/plugins/list')
}

export const addPlugins = (params) => {
  return axios.post('/api/plugins/add', params)
}
