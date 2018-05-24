import request from '../utils/request';

export async function getInfo(params) {
  return request({
    url: '/community/company/getall',
    method: 'get',
    data: params
  })
}
