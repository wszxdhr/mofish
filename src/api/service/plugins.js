import axios from '../index'

export const getPlugins = (params) => {
  return axios.get('/api/plugins/list', params)
}
