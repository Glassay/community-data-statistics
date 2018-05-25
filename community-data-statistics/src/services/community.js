import request from '../utils/request';

export async function getAllInfo(params) {
  return request({
    url: '/community/region/getall',
    method: 'get',
    data: params
  })
}

export async function insertInfo(params) {
  return request({
    url: '/community/region/create',
    method: 'post',
    data: params
  })
}

export async function deleteInfo(params) {
  return request({
    url: '/community/region/delete',
    method: 'post',
    data: params
  })
}

export async function searchInfo(params) {
  return request({
    url: '/community/region/getname',
    method: 'post',
    data: params
  })
}

export async function modifyInfo(params) {
  return request({
    url: '/community/region/modify',
    method: 'post',
    data: params
  })
}
