/**
 * 2018-05-08
 * 基本展示页面
 */

import React from 'react';
import { connect } from 'dva';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { Switch, Route, Link } from 'dva/router';

import styles from './BasicLayout.less';
import Economics from '../routes/Economics';
import Industrial from '../routes/Industrial';
import Population from '../routes/Population';
import Weather from '../routes/Weather';
import CPopulation from '../routes/Staff/CPopulation';
import Enterprise from '../routes/Staff/Enterprise';
import Building from '../routes/Building';
import Community from '../routes/Community';
import Inform from '../routes/Staff/Inform';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class BasicLayout extends React.Component {
  componentDidMount() {
    console.log('localStorage++++', localStorage);
  }
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  loginOut = () => {
    this.props.dispatch({
      type: 'users/loginOut'
    })
  }

  render() {
    const isLogin = localStorage.getItem('isLogin');
    console.log('asdasdasd', isLogin);
    return (
      <Layout style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
        {
          isLogin ?
          <Layout>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              <div className={styles.logo}>
                <Link to="/city">
                  <h1>城市社区管理</h1>
                </Link>
              </div>
              <Menu
                theme="dark"
                defaultOpenKeys={['sub1']}
                mode="inline"
              >
                <SubMenu
                  key="sub1"
                  title={<span><Icon type="area-chart" /><span>城市综合数据</span></span>}
                >
                  <Menu.Item key="1">
                    <Link to="/city/population">人口数据</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <Link to="/city/economics">经济数据</Link>
                  </Menu.Item>
                  <Menu.Item key="3">
                    <Link to="/city/industrial">工业数据</Link>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <Link to="/city/weather">天气展示</Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={<span><Icon type="table" /><span>社区管理</span></span>}
                >
                  <Menu.Item key="5">
                    <Link to="/city/community-population">人员数据</Link>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <Link to="/city/community-enterprise">企业数据</Link>
                  </Menu.Item>
                  <Menu.Item key="7">
                    <Link to="/city/community-name">小区数据</Link>
                  </Menu.Item>
                  <Menu.Item key="8">
                    <Link to="/city/community-building">楼房数据</Link>
                  </Menu.Item>
                  <Menu.Item key="9">
                    <Link to="/city/community-inform">发布公告</Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout>
              <Header>
                <Menu theme="dark" mode="horizontal">
                  <SubMenu
                    style={{
                      float: 'right',
                      right: 20,
                      top: 8
                    }}
                    title={
                      <span>
                        <Icon type="user" />
                        管理员
                      </span>
                    }
                  >
                    <Menu.Item key="logout">
                      <span onClick={this.loginOut}>退出登录</span>
                    </Menu.Item>
                  </SubMenu>
                </Menu>
              </Header>
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item><a href="/city/population">人口数据</a></Breadcrumb.Item>
                  <Breadcrumb.Item><a href="/city/economics">经济数据</a></Breadcrumb.Item>
                  <Breadcrumb.Item><a href="/city/industrial">工业数据</a></Breadcrumb.Item>
                  <Breadcrumb.Item><a href="/city/weather">天气展示</a></Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ padding: 24, background: '#fff', minHeight: '80vh' }}>
                  <Switch>
                    <Route path="/city/population" render={() => <Population />} />
                    <Route path="/city/economics" render={() => <Economics />} />
                    <Route path="/city/industrial" render={() => <Industrial />} />
                    <Route path="/city/weather" render={() => <Weather />}/>
                    <Route path="/city/community-population" render={() => <CPopulation />} />
                    <Route path="/city/community-enterprise" render={() => <Enterprise />} />
                    <Route path="/city/community-building" render={() => <Building />} />
                    <Route path="/city/community-name" render={() => <Community />} />
                    <Route path="/city/community-inform" render={() => <Inform />} />
                  </Switch>
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Copyright ©2018 Created by Glassay
              </Footer>
            </Layout>
          </Layout>
          :
          <Link to="/login">
            <div className={styles.needLogin}>
              <h1 style={{ marginTop: 100, color: '#f6ec66' }}>点击登录</h1>
              <img src="http://www.gx8899.com/uploads/allimg/2016060812/52o34owzgd0.jpg" alt="" />
            </div>
          </Link>
        }
      </Layout>
    );
  }
}

export default connect(state => ({
  status: state.users.status
}))(BasicLayout);
