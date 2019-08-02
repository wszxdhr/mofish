import axios from '../index'

export const searchPackages = (params) => {
  return axios.get(`https://www.npmjs.com/search?q=${params.name}`)
}
