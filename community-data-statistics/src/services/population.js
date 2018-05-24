import request from '../utils/request';

export async function getPopulation(params) {
  return request({
    url: '/community/user/getuser',
    method: 'get',
    data: params
  })
}

export async function insertPopulation(params) {
  return request({
    url: '/community/user/create',
    method: 'post',
    data: params
  })
}

export async function modifyPopulation(params) {
  return request({
    url: '/community/user/modify',
    method: 'post',
    data: params
  })
}

export async function getPopulationAge(params) {
  return request({
    url: '/community/user/getuserage',
    method: 'post',
    data: params
  })
}

export async function selectArea(params) {
  return request({
    url: '/community/user/getuserarea',
    method: 'post',
    data: params
  })
}
