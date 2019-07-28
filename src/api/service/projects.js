import axios from '../index'

export const getProjects = (params) => {
  return axios.get('/api/projects/list')
}
