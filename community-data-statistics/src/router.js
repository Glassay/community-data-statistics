import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import BasicLayout from './layouts/BasicLayout';
import LoginLayout from './layouts/LoginLayout';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" exact component={LoginLayout} />
        <Route path="/city" component={BasicLayout} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
