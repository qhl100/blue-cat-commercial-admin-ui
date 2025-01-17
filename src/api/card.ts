import request from '@/utils/system/request'

// 获取数据api
export function getData(data: object) {
  return request({
    url: '/admin/queryUserLog',
    method: 'post',
    data
  })
}

export function getUserData() {
  return request({
    url: '/admin/queryUserData',
    method: 'get',
  })
}


// 新增
export function add(data: object) {
  return request({
    url: '/card/add',
    method: 'post',
    baseURL: '/mock',
    data
  })
}

// 编辑
export function update(data: object) {
  return request({
    url: '/card/update',
    method: 'post',
    baseURL: '/mock',
    data
  })
}

// 删除
export function del(data: object) {
  return request({
    url: '/card/del',
    method: 'post',
    baseURL: '/mock',
    data
  })
}