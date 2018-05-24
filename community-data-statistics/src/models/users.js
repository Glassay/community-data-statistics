import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {
  namespace: 'users',

  state: {
    userInfo: {
      userName: '111',
      password: '111',
    }
  },

  effects: {
    *usersLogin({ payload }, { call, put, select }) {
      const loginInfos = yield select(state => state.users.userInfo);
      if(payload.userName === loginInfos.userName && payload.password === loginInfos.password) {
        yield put(routerRedux.push('/city'));
        yield localStorage.setItem('isLogin', true);
        console.log('localStorage>>>>>', localStorage.isLogin);
      } else {
        message.error('用户名或密码错误！');
      }
    },

    *loginOut({ payload }, { put, select }) {
      yield localStorage.removeItem('isLogin')
      console.log('loginOUtstatus>>>>', localStorage.isLogin);
      console.log('loaclStorage++++++', localStorage);
      yield put(routerRedux.push('/'))
    }
  },

  reducers: {
  },
}
