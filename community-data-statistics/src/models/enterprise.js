import { getInfo } from '../services/enterprise';

export default {
  namespace: 'enterprise',

  state: {
    infos: null
  },

  effects: {
    *getInfos({ payload }, { call, put }) {
      const res = yield call(getInfo, payload);
      console.log('res>>>>>>', res);
      yield put({
        type: 'updateInfo',
        payload: res
      })
      // if(payload === undefined) {
      //   const params = {
      //     area: 'a'
      //   };
      //   const res = yield call(getInfo, params);
      //   console.log('res>>>>>>', res);
      //   yield put({
      //     type: 'updateInfo',
      //     payload: res
      //   })
      // } else {
      //   const res = yield call(getInfo, payload);
      //   console.log('res>>>>>>', res);
      //   yield put({
      //     type: 'updateInfo',
      //     payload: res
      //   })
      // }
    }
  },

  reducers: {
    updateInfo(state, { payload }) {
      return {
        ...state,
        infos: payload
      }
    }
  }
}
