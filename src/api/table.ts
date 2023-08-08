import request from '@/utils/system/request'

export function getData(data: object) {
  return request({
    url: '/table/list',
    method: 'post',
    baseURL: '/mock',
    data
  })
}

export function queryUserLog(data: object) {
  return request({
    url: 'http://127.0.0.1:8080/api/admin/queryUserLog',
    method: 'post',
    data
  })
}

export function queryPromptRecord(data: object) {
  return request({
    url: 'http://127.0.0.1:8080/api/admin/queryPromptRecord',
    method: 'post',
    data
  })
}
export function queryOnlineUser() {
  return request({
    url: 'http://127.0.0.1:8080/api/admin/queryOnlineUser',
    method: 'get',
  })
}

export function queryUserAccess(data: object) {
  return request({
    url: 'http://127.0.0.1:8080/api/userAccessRule/admin/queryUserAccess',
    method: 'post',
    data
  })
}

export function queryGptModelConfig(data: object) {
  return request({
    url: 'http://127.0.0.1:8080/api/admin/queryGptModelConfig',
    method: 'post',
    data
  })
}


export function queryGptAilTokenConfig(data: object) {
    return request({
        url: 'http://127.0.0.1:8080/api/gptApiTokenConfig/getGptAilTokenConfig',
        method: 'post',
        data
    })
}


export function queryChannelConfig(data: object) {
    return request({
        url: 'http://127.0.0.1:8080/api/channelConfig/getChannelConfig',
        method: 'post',
        data
    })
}


export function queryUserinfo(data: object) {
  return request({
    url: 'http://127.0.0.1:8080/api/userInfo/admin/queryUserInfo',
    method: 'post',
    data
  })
}
// 获取分类数据
export function getCategory(data: object) {
  return request({
    url: '/table/category',
    method: 'post',
    baseURL: '/mock',
    data
  })
}

// 获取树组织数据
export function getTree(data: object) {
  return request({
    url: '/table/tree',
    method: 'post',
    baseURL: '/mock',
    data
  })
}

// 新增
export function add(data: object) {
  return request({
    url: '/table/add',
    method: 'post',
    baseURL: '/mock',
    data
  })
}

// 编辑
export function update(data: object) {
  return request({
    url: 'http://127.0.0.1:8080/api/userAccessRule/update',
    method: 'post',
    data
  })
}


// 编辑
export function addGptModelConfig(data: object) {
  return request({
    url: 'http://127.0.0.1:8080/api/admin/addGptModelConfig',
    method: 'post',
    data
  })
}


// 编辑
export function updateGptAilTokenConfig(data: object) {
  return request({
    url: 'http://127.0.0.1:8080/api/gptApiTokenConfig/updateGptAilTokenConfig',
    method: 'post',
    data
  })
}




// 编辑
export function updateGptModelConfig(data: object) {
  return request({
    url: 'http://127.0.0.1:8080/api/admin/updateGptModelConfig',
    method: 'post',
    data
  })
}




// 编辑
export function delGptModelConfig(data: object) {
  return request({
    url: 'http://127.0.0.1:8080/api/admin/delGptModelConfig',
    method: 'post',
    data
  })
}


// 删除
export function del(data: object) {
  return request({
    url: '/table/del',
    method: 'post',
    baseURL: '/mock',
    data
  })
}