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
  Input
} from 'antd';
import { connect } from 'dva';

import options from '../../assets/addressData';
import typeOptions from '../../assets/companyType';

const FormItem = Form.Item;

class Enterprise extends React.Component {
  state = {
    areaInfo: null
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'enterprise/getInfos'
    })
    console.log('sssssssss');
  }

  handleChange = (value) => {
    console.log(value[0] + value[1]);
    this.setState({
      areaInfo: value[0] + value[1]
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
      type: 'enterprise/searchInfos',
      payload: {
        area: this.state.areaInfo
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const value = {
          name: values.name,
          type: values.type[0],
          capital: +values.capital,
          scope: values.scope,
          area: values.area[0] + values.area[1],
          address: values.address
        }
        console.log('Received values of form: ', value);
        this.props.dispatch({
          type: 'enterprise/insertInfos',
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
      title: '公司名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '注册资本 /万元',
      dataIndex: 'capital',
      key: 'capital',
    }, {
      title: '经营范围',
      dataIndex: 'scope',
      key: 'scope',
    }, {
      title: '公司地址',
      dataIndex: 'adress',
      key: 'adress',
    },{
      render: (text, ID) => (
        <span>
          <a onClick={() => this.handleDelete(ID)}>删除</a>
        </span>
      ),
    }];
    return (
      <div>
        {infos === null || undefined ? null :
        <div>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入公司名称!' }],
              })(
                <Input placeholder="公司名称" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('type', {
                rules: [{ required: true, message: '请输入类型!' }],
              })(
                <Cascader options={typeOptions} placeholder="选择类型" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('capital', {
                rules: [{ required: true, message: '请输入注册资本！'}]
              })(
                <Input placeholder="注册资本 /万元" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('scope', {
                rules: [{ required: true, message: '请经营范围！'}]
              })(
                <Input placeholder="经营范围" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('area', {
                rules: [{ required: true, message: '请选择地区！'}]
              })(
                <Cascader options={options} placeholder="选择地区" />
              )}
            </FormItem>
              <FormItem>
                {getFieldDecorator('address', {
                  rules: [{ required: true, message: '请输入公司地址！'}]
                })(
                  <Input placeholder="公司地址" />
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
          <Cascader options={options} onChange={this.handleChange} placeholder="选择地区" />
          <Button
            type="primary"
            style={{ marginTop: 15, marginLeft: 30 }}
            onClick={this.handleSearch}
          >
            查询
          </Button>
          <Table
            style={{ marginTop: 20 }}
            rowKey="ID"
            columns={columns}
            dataSource={infos.data}
            loading={loading}
          />
        </div>
        }
      </div>
    );
  }
}

Enterprise = Form.create({})(Enterprise);

export default connect(state => ({
  infos: state.enterprise.infos,
  loading: state.loading.models.enterprise
}))(Enterprise);
