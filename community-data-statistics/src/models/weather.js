/**
 * 2018-05-08
 */

import { getWeather } from '../services/weather';

export default {
  namespace: 'weather',

  state: {
    data: [],
  },

  effects: {
    *getInfo({ payload }, { call, put, select }) {
      console.log('dnsdoqiw');
      const res = yield call(getWeather);
      console.log('res>>>>>', res);
      yield put({
        type: 'updateInfo',
      })
    }
  },

  reducers: {
    updateInfo(state, { payload }) {
      return {
        ...state,
        data: payload,
      }
    }
  }
}
