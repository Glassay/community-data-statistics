import request from '../utils/request';

export async function getAllInfo(params) {
  return request({
    url: '/community/house/getall',
    method: 'get',
    data: params
  })
}

export async function insertInfo(params) {
  return request({
    url: '/community/house/create',
    method: 'post',
    data: params
  })
}

export async function deleteInfo(params) {
  return request({
    url: '/community/house/delete',
    method: 'post',
    data: params
  })
}

export async function searchInfo(params) {
  return request({
    url: '/community/house/getname',
    method: 'post',
    data: params
  })
}

export async function modifyInfo(params) {
  return request({
    url: '/community/house/modify',
    method: 'post',
    data: params
  })
}
