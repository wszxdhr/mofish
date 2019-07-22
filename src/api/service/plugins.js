import axios from '../index'

export const getPlugins = (params) => {
  return axios.post('/api/getPlugins', params)
}
