import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import BasicLayout from './layouts/BasicLayout';
import LoginLayout from './layouts/LoginLayout';
import NewsLayout from './layouts/NewsLayout';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={NewsLayout} />
        <Route path="/login" component={LoginLayout} />
        <Route path="/city" component={BasicLayout} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
