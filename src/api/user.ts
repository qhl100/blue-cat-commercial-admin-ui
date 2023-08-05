import request from '@/utils/system/request'

/** 登录api */
export function loginApi(data: object) {
  return request({
    url: 'http://127.0.0.1:8080/api/userInfo/admin/login',
    method: 'post',
    data
  })
}

/** 获取用户信息Api */
export function getInfoApi(data: object) {
  return request({
    url: 'http://127.0.0.1:8080/api/userInfo/info',
    method: 'get',
    data
  })
}

/** 退出登录Api */
export function loginOutApi() {
  return request({
    url: 'http://127.0.0.1:8080/api/userInfo/loginOut',
    method: 'get',
  })
}

/** 获取用户信息Api */
export function passwordChange(data: object) {
  return request({
    url: '/user/passwordChange',
    method: 'post',
    baseURL: '/mock',
    data
  })
}

/** 获取登录后需要展示的菜单 */
export function getMenuApi() {
  return request({
    url: '/menu/list',
    method: 'post',
    baseURL: '/mock'
  })
}