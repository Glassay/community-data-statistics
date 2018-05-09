/**
 * 2018-05-08
 */

// import axios from 'axios';
import request from '../utils/request';

export async function getWeather() {
  return request({
    url: 'http://tj.nineton.cn/Heart/index/all?city=CHSH000000&language=zh-chs&unit=c&aqi=city&alarm=1&key=78928e706123c1a8f1766f062bc8676b',
    method: 'get',
  })
  // try {
  //   const res = axios.get('http://tj.nineton.cn/Heart/index/all?city=CHSH000000&language=zh-chs&unit=c&aqi=city&alarm=1&key=78928e706123c1a8f1766f062bc8676b');
  //   console.log('res>>>>>', res);
  // } catch(error) {
  //   console.log(error)
  // }
}
