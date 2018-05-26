import request from '../utils/request';

export async function getNews(params) {
  return request({
    url: '/community/notice/get',
    method: 'get',
    data: params
  })
}

export async function insertInfo(params) {
  return request({
    url: '/community/notice/create',
    method: 'post',
    data: params
  })
}
