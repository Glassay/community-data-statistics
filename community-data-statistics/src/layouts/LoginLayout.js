/**
 * 2018-05-08
 * 登录界面
 */

import React from 'react';
import { connect } from 'dva';
import { Layout, Form, Icon, Input, Button } from 'antd';

import styles from './LoginLayout.less';

const FormItem = Form.Item;
const { Content } = Layout;

class LoginLayout extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'users/usersLogin',
          payload: values,
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout className={styles.layout}>
        <Content className={styles.bgimage}>
          <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名！' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码！' }],
              })(
                <Input type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className={styles.formButton}>
                登录
              </Button>
            </FormItem>
          </Form>
        </Content>
      </Layout>
    );
  }
}

LoginLayout = Form.create({})(LoginLayout);

export default connect(({ users }) => ({ ...users }))(LoginLayout);
