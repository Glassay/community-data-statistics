import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
  namespace: 'users',

  state: {
    userInfo: {
      userName: '111',
      password: '111'
    }
  },

  effects: {
    *usersLogin({ payload }, { call, put, select }) {
      const loginInfos = yield select(state => state.users.userInfo);
      if(payload.userName === loginInfos.userName && payload.password === loginInfos.password) {
        yield put(routerRedux.push('/city'));
      } else {
        message.error('用户名或密码错误！');
      }
    }
  },

  reducers: {},
}
