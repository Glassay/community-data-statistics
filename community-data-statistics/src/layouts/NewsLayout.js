import React from 'react';
import { Link } from 'dva/router';
import { Layout, List, Card, Modal } from 'antd';

import Carousel from '../components/Carousel';
import styles from './NewsLayout.less';

const { Header, Content, Footer } = Layout;

export default class NewsLayout extends React.Component {
  state = {
    loading: false,
    visible: false,
    index: 0
  }
  showModal = (i) => {
    this.setState({
      visible: true,
      index: i
    });
    console.log('i++++++++', i)
  }
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  // readNews = () => {
  //   this.props.dispatch({

  //   })
  // }
  render() {
    const { visible } = this.state;
    const listData = [];
    console.log('data>>>>>', listData)
    for (let i = 0; i < 23; i++) {
      listData.push({
        id: i,
        title: `标题${i}`,
        content: `内容${i}`
      });
    }
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <Header className={styles.header}>
          <Link to="/"><span className={styles.title}>社区首页</span></Link>
          <Link to="/login"><span className={styles.login}>后台管理</span></Link>
        </Header>
        <Content>
          <Carousel />
          <h1 className={styles.news}>公告</h1>
          <List
            style={{ marginTop: 50 }}
            grid={{ gutter: 16, column: 4 }}
            dataSource={listData}
            renderItem={(item, index) => (
              <List.Item>
                <Card onClick={() => this.showModal(index)} style={{ margin: 10 }} title={item.title}>{item.content}</Card>
                <Modal
                  visible={visible}
                  title={listData[this.state.index].title}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={null}
                >
                  <p>{listData[this.state.index].content}</p>
                </Modal>
              </List.Item>
            )}
          />
        </Content>
        <Footer className={styles.footer}>Issue Community ©2018 Designed by Glassay</Footer>
      </Layout>
    );
  }
}
