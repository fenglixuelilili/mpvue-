import CONF from '@/config.js'
const request = {}
const baseUrl = CONF.host

request.install = function (Vue) {
  const http = function (url, method = 'get', data = {}) {
    // console.log(url,method,data)
    return new Promise(function (resolve, reject) {
      wx.request({
        url: baseUrl + url,
        method: method,
        data: data,
        success: function (data) {
          resolve(data)
        },
        fail: function () {

        }
      })
    })
  }

  Vue.prototype.$http = http
}
export default request
