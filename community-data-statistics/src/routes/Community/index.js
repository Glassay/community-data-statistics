/**
 * 2018-05-22
 * 工业统计
 */

import React from 'react';
import {
  Cascader,
  Table,
  Button,
  Form,
  Input,
  Divider
} from 'antd';
import { connect } from 'dva';

import options from '../../assets/communityName';

const FormItem = Form.Item;

class Community extends React.Component {
  state = {
    areaInfo: null
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'community/getInfos'
    })
    console.log('sssssssss');
  }

  handleChange = (value) => {
    console.log(value[0]);
    this.setState({
      areaInfo: value[0]
    })
  }

  handleDelete = (ID) => {
    this.props.dispatch({
      type: 'enterprise/deleteInfos',
      payload: ID
    })
  }

  handleSearch = () => {
    console.log('qweqwe', this.state.areaInfo)
    this.props.dispatch({
      type: 'community/searchInfos',
      payload: {
        name: this.state.areaInfo
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const value = {
          name: values.name[0],
          acreage: +values.acreage,
          developers: values.developers,
          address: values.address
        }
        console.log('Received values of form: ', value);
        this.props.dispatch({
          type: 'community/insertInfos',
          payload: value,
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { infos, loading } = this.props;
    console.log('infos>>>>>>', infos);
    const columns = [{
      title: '小区名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '面积',
      dataIndex: 'acreage',
      key: 'acreage',
    }, {
      title: '开发商',
      dataIndex: 'developers',
      key: 'developers',
    }, {
      title: '小区地址',
      dataIndex: 'address',
      key: 'address',
    },{
      render: (text, ID) => (
        <span>
          <a>修改</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDelete(ID)}>删除</a>
        </span>
      ),
    }];
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请选择小区名!' }],
            })(
              <Cascader options={options} placeholder="选择小区" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('acreage', {
              rules: [{ required: true, message: '请输入小区面积!' }],
            })(
              <Input placeholder="小区面积" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('developers', {
              rules: [{ required: true, message: '请输入小区开发商！'}]
            })(
              <Input placeholder="开发商" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('address', {
              rules: [{ required: true, message: '请输入小区地址！'}]
            })(
              <Input placeholder="小区地址" />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
            >
              提交
            </Button>
          </FormItem>
        </Form>
        <Cascader options={options} onChange={this.handleChange} placeholder="选择小区" />
        <Button
          type="primary"
          style={{ marginTop: 15, marginLeft: 15 }}
          onClick={this.handleSearch}
        >
          查询
        </Button>
        {infos === null || undefined ? null :
        <Table
          style={{ marginTop: 20 }}
          rowKey="ID"
          columns={columns}
          dataSource={infos.data}
          loading={loading}
        />
        }
      </div>
    );
  }
}

Community = Form.create({})(Community);

export default connect(state => ({
  infos: state.community.infos,
  loading: state.loading.models.community
}))(Community);
