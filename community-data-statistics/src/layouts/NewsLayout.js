import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout, Card, Modal } from 'antd';
import QueueAnim from 'rc-queue-anim'

import Carousel from '../components/Carousel';
import styles from './NewsLayout.less';

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
                  <QueueAnim delay={300}>
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
                  </QueueAnim>
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
