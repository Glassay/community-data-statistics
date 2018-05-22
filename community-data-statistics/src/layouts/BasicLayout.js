/**
 * 2018-05-08
 * 基本展示页面
 */

import React from 'react';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { Switch, Route, Link } from 'dva/router';

import styles from './BasicLayout.less';
import Economics from '../routes/Economics';
import Industrial from '../routes/Industrial';
import Population from '../routes/Population';
import Weather from '../routes/Weather';
import CPopulation from '../routes/Community/CPopulation';
import Enterprise from '../routes/Community/Enterprise';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class BasicLayout extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className={styles.logo}>
            <Link to="/">
              <h1>城市社区管理</h1>
            </Link>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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
                  退出登录
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>人口数据</Breadcrumb.Item>
              <Breadcrumb.Item>经济数据</Breadcrumb.Item>
              <Breadcrumb.Item>工业数据</Breadcrumb.Item>
              <Breadcrumb.Item>天气展示</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: '80vh' }}>
              <Switch>
                <Route path="/city/population" render={() => <Population />} />
                <Route path="/city/economics" render={() => <Economics />} />
                <Route path="/city/industrial" render={() => <Industrial />} />
                <Route path="/city/weather" render={() => <Weather />}/>
                <Route path="/city/community-population" render={() => <CPopulation />} />
                <Route path="/city/community-enterprise" render={() => <Enterprise />} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Copyright ©2018 Created by Glassay
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
