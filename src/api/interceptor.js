export default function (axios) {
  axios.interceptors.response.use(res => {
    return res.data
  })
}
