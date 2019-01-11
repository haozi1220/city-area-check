/*
* @Author: 仇少凯
* @Date:   2018-11-14 14:29:57
* @Last Modified by:   仇少凯
* @Last Modified time: 2018-11-14 14:57:09
*/

// 192.168.180.87:9080
const devUrl = '10.5.3.9:80'
const testUrl = ''

const conf = {
  baseUrl: '/api',
  headers : {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data: {},
  tiemout: 1000,
  withCredentials: true,
  responseType: 'json'
}

module.exports = {
  baseUrl: devUrl || testUrl,
  conf: conf
}
