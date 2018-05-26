/**
 * 2018-05-08
 */

// import axios from 'axios';
import request from '../utils/request';

export async function getWeather(params) {
  return request({
    url: `/community/weather`,
    method: 'get',
    data: params
  })
}
