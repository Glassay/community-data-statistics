import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout, List, Card, Modal } from 'antd';

import Carousel from '../components/Carousel';
import styles from './NewsLayout.less';
import News from '../components/News';

const { Header, Content, Footer } = Layout;

class NewsLayout extends React.Component {
  state = {
    visible: false,
    details: ''
  }

  componentDidMount() {
    console.log('DidMount!');
    this.props.dispatch({
      type: 'inform/getInfos'
    })
  }

  showModal = (i) => {
    this.setState({
      visible: true,
      details: i
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

  render() {
    const { news } = this.props;
    console.log('news+++++', news);
    // const listData = [];
    // console.log('data>>>>>', listData)
    // for (let i = 0; i < 23; i++) {
    //   listData.push({
    //     id: i,
    //     title: `标题${i}`,
    //     content: `内容${i}`
    //   });
    // }
    return(
      <Layout style={{ minHeight: '100vh' }}>
        <Header className={styles.header}>
          <Link to="/"><span className={styles.title}>社区首页</span></Link>
          <Link to="/login"><span className={styles.login}>后台管理</span></Link>
        </Header>
        <Content>
          <Carousel />
          <h1 className={styles.newsTitle}>公告</h1>
          {
            news === null || undefined ? null :
            news.data.map(item => (
              <div
                key={item.ID}
              >
                <div className={styles.news}>
                  {/* <News
                    onClick={() => this.showModal(item)}
                    title={item.title}
                    content={item.content}
                  /> */}
                  <Card
                    extra={<a onClick={() => this.showModal(item)}>查看</a>}
                    style={{
                      width: 300,
                      margin: 20
                    }}
                    title={item.title}
                  >
                    <p>{item.content}</p>
                  </Card>
                </div>
                <Modal
                  visible={this.state.visible}
                  title={this.state.details.title}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  footer={null}
                >
                  <p>{this.state.details.content}</p>
                </Modal>
              </div>
            ))
          }
          {/* {
            news === undefined || null ? null :
            <List
              style={{ marginTop: 50 }}
              grid={{ gutter: 16, column: 4 }}
              dataSource={news.data}
              renderItem={(item, index) => (
                <List.Item>
                  <Card onClick={() => this.showModal(index)} style={{ margin: 10 }} title={item.title}>{item.content}</Card>
                  <Modal
                    visible={this.state.visible}
                    title={item.title}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                  >
                    <p>{item.conten}</p>
                  </Modal>
                </List.Item>
              )}
            />
          } */}
        </Content>
        <Footer className={styles.footer}>Issue Community ©2018 Designed by Glassay</Footer>
      </Layout>
    );
  }
}

export default connect(state => ({
  news: state.inform.news,
  loading: state.loading.models.inform
}))(NewsLayout);
