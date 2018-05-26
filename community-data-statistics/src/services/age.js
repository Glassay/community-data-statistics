import request from '../utils/request';

export async function getInfo(params) {
  return request({
    url: '/community/user/getuserage',
    method: 'post',
    data: params
  })
}
