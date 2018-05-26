import { message } from 'antd';

import { getAllInfo, insertInfo, deleteInfo, searchInfo, modifyInfo } from '../services/building';

export default {
  namespace: 'building',

  state: {
    infos: null
  },

  effects: {
    *getInfos({ payload }, { call, put }) {
      const res = yield call(getAllInfo, payload);
      yield put({
        type: 'updateInfo',
        payload: res
      })
    },

    *insertInfos({ payload }, { call, put }) {
      const res = yield call(insertInfo, payload);
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
        const refreshRes = yield call(getAllInfo);
        yield put({
          type: 'updateInfo',
          payload: refreshRes
        })
        message.success('删除成功！');
      } else {
        message.error('删除失败！');
      }
    },

    *searchInfos({ payload }, { call, put }) {
      const res = yield call(searchInfo, payload);
      if(res.status === 'success') {
        message.success('查找成功！');
      } else {
        message.error('查找失败！');
      }
      yield put({
        type: 'updateInfo',
        payload: res
      })
    },

    *modifyInfos({ payload }, { call, put }) {
      const res = yield call(modifyInfo, payload)
      if(res.status === 'success') {
        const refreshRes = yield call(getAllInfo);
        yield put({
          type: 'updateInfo',
          payload: refreshRes
        })
        message.success('修改成功！');
      } else {
        message.error('修改失败！');
      }
    },
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
