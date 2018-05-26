import { getInfo } from '../services/age';

export default {
  namespace: 'age',

  state: {
    infos: '',
  },

  effects: {
    *getInfos({ payload }, { call, put }) {
      const res = yield call(getInfo, payload);
      yield put({
        type: 'updateInfos',
        payload: res
      })
    }
  },

  reducers: {
    updateInfos(state, { payload }) {
      return({
        ...state,
        infos: payload
      })
    }
  }
}
