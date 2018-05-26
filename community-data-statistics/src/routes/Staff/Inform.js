import React from 'react';
import { connect } from 'dva';
import {
  Form,
  Button,
  Input
} from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

class Inform extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'inform/insertInfos',
          payload: values,
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="标题">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题!' }],
          })(
            <Input placeholder="公告标题" />
          )}
        </FormItem>
        <FormItem label="内容">
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '请输入公告内容!' }],
          })(
            <TextArea placeholder="在此处输入公告内容" autosize={{ minRows: 10, maxRows: 14 }} />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => this.handleSubmit}
          >
            发布
          </Button>
        </FormItem>
      </Form>
    );
  }
}

Inform = Form.create({})(Inform);

export default connect(({ inform }) => ({ ...inform }))(Inform);
