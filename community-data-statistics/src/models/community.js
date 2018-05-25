import { message } from 'antd';

import { getAllInfo, insertInfo, deleteInfo, searchInfo, modifyInfo } from '../services/community';

export default {
  namespace: 'community',

  state: {
    infos: null
  },

  effects: {
    *getInfos({ payload }, { call, put }) {
      const res = yield call(getAllInfo, payload);
      console.log('res>>>>>>', res);
      yield put({
        type: 'updateInfo',
        payload: res
      })
    },

    *insertInfos({ payload }, { call, put }) {
      const res = yield call(insertInfo, payload);
      console.log('insertInfo>>>>', res);
      if(res.status === 'success') {
        message.success('添加成功！');
        const refreshRes = yield call(getAllInfo);
        yield put({
          type: 'updateInfo',
          payload: refreshRes
        })
      } else {
        message.error('添加失败！');
      }
    },

    *deleteInfos({ payload }, { call, put }) {
      const res = yield call(deleteInfo, payload);
      if(res.status === 'success') {
        message.success('删除成功！');
      } else {
        message.error('删除失败！');
      }
      console.log('deleteInfo>>', res);
      const refreshRes = yield call(getAllInfo);
      yield put({
        type: 'updateInfo',
        payload: refreshRes
      })
    },

    *searchInfos({ payload }, { call, put }) {
      const res = yield call(searchInfo, payload);
      if(res.status === 'success') {
        message.success('查找成功！');
      } else {
        message.error('查找失败！');
      }
      console.log('searchInfo>>>>', res);
      yield put({
        type: 'updateInfo',
        payload: res
      })
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
