import { message } from 'antd';

import {
  getPopulation,
  getPopulationAge,
  selectArea,
  insertPopulation,
  modifyPopulation
} from '../services/population';

export default {
  namespace: 'population',

  state: {
    data: null,
    age: null
  },

  effects: {
    *insertData({ payload }, { call, put }) {
      const res = yield call(insertPopulation, payload);
      if(res.status === 'success') {
        const refreshData = yield call(getPopulation);
        yield put({
          type: 'updateInfo',
          payload: refreshData
        })
        message.success('添加成功！');
      } else {
        message.error('添加失败！');
      }
      console.log('insertResult>>>>', res);
    },

    *getInfo({ payload }, { call, put }) {
      const res = yield call(getPopulation);
      console.log('res>>>>>>>', res);
      yield put({
        type: 'updateInfo',
        payload: res
      })
    },

    *modifyInfo({ payload }, { call, put }) {
      const res = yield call(modifyPopulation, payload)
      console.log('modifyres>>>>>>', res);
    },
    
    *getAge({ payload }, { call, put }) {
      const res = yield call(getPopulationAge, payload);
      console.log('peopleAge>>>>', res);
    },

    *getAreaInfo({ payload }, { call, put }) {
      const res = yield call(selectArea, payload);
      console.log('areaInfo>>>>>', res);
      if(res.status === 'success') {
        yield put({
          type: 'updateInfo',
          payload: res
        })
        message.success('查询成功！');
      } else {
        message.error('查询失败！');
      }
    }
  },

  reducers: {
    updateInfo(state, { payload }) {
      return {
        ...state,
        data: payload
      }
    },

    updateAge(state, { payload }) {
      return {
        ...state,
        data: payload
      }
    }
  },
}
