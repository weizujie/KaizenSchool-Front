import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',  // 请求登录的地址
    url: 'http://localhost:8001/eduService/user/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: 'http://localhost:8001/eduService/user/info',
    method: 'get',
    params: { token }
  })
}

// 退出登录
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
