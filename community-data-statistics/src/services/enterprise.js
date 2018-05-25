import request from '../utils/request';

export async function getInfo(params) {
  return request({
    url: '/community/company/getall',
    method: 'get',
    data: params
  })
}

export async function insertInfo(params) {
  return request({
    url: '/community/company/create',
    method: 'post',
    data: params
  })
}

export async function deleteInfo(params) {
  return request({
    url: '/community/company/delete',
    method: 'post',
    data: params
  })
}

export async function searchInfo(params) {
  return request({
    url: '/community/company/getbyarea',
    method: 'post',
    data: params
  })
}
