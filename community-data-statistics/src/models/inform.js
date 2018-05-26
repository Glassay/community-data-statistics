import { getNews, insertInfo } from '../services/inform';

export default {
  namespace: 'inform',

  state: {
    news: null
  },

  effects: {
    *getInfos({ payload }, { call, put }) {
      const res = yield call(getNews, payload);
      console.log('getinfos>>>>', res);
      if(res.status === 'success') {
        yield put({
          type: 'updateInfos',
          payload: res
        })
      }
    },

    *insertInfos({ payload }, { call, put }) {
      const res = yield call(insertInfo, payload);
      console.log('insertInfos>>>>', res);
    }
  },

  reducers: {
    updateInfos(state, { payload }) {
      return {
        ...state,
        news: payload
      }
    }
  },
}
