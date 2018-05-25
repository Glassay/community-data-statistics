/**
 * 2018-05-22
 * 人口数据基本管理
 */

import React from 'react';
import { connect } from 'dva';
import {
  Cascader,
  Table,
  Divider,
  Modal,
  Radio,
  Form,
  Input,
  Button,
} from 'antd';

import options from '../../assets/addressData';

const FormItem = Form.Item;

const ModifyModal = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="人员信息修改"
          okText="提交"
          cancelText="取消"
          onCancel={onCancel}
          onOk={onCreate}
          maskStyle={{ opacity: 0.2 }}
        >
          <Form layout="vertical">
            <FormItem>
              {getFieldDecorator('ID', {
                initialValue: this.props.ID,
              })(
                <Input disabled={true} />
              )}
            </FormItem>
            <FormItem label="姓名">
              {getFieldDecorator('name', {
                initialValue: this.props.name,
                rules: [{ required: true, message: '请输入姓名！'}],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="性别">
              {getFieldDecorator('sex', {
                initialValue: this.props.sex
              })(
                <Radio.Group>
                  <Radio value="man">男</Radio>
                  <Radio value="woman">女</Radio>
                </Radio.Group>
              )
              }
            </FormItem>
            <FormItem label="年龄">
              {getFieldDecorator('age', {
                initialValue: this.props.age,
                rules: [{ required: true, message: '请输入年龄！'}]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="身份证号">
              {getFieldDecorator('IDnumber', {
                initialValue: this.props.IDnumber,
                rules: [{ required: true, min: 18, max: 18, message: '请输入正确的身份证号！'}]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="详细地址">
              {getFieldDecorator('address', {
                initialValue: this.props.address,
                rules: [{ required: true, message: '请输入详细地址！'}]
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="所在地区">
              {getFieldDecorator('area', {
                initialValue: this.props.area,
                rules: [{ required: true, message: '请输入所在地区！'}]
              })(
                <Input />
              )}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
)

class CPopulation extends React.Component {
  state = {
    visible: false,
    singleData: 0,
    modifyData: '',
    areaInfo: null
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'population/getInfo'
    })
  }

  showModal = (i) => {
    this.setState({
      visible: true,
      singleData: i
    })
    console.log('singleData>>>>>', i);
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  handleCreate = (e) => {
    e.preventDefault();
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return false;
      }
      console.log('Received values of form: ', values);
      const modifyInfo = {
        ID: values.ID,
        name: values.name,
        sex: values.sex,
        age: +values.age,
        IDnumber: values.IDnumber,
        address: values.address,
        area: values.area[0] + values.area[1]
      }
      this.props.dispatch({
        type: 'population/modifyInfo',
        payload: modifyInfo
      })
      form.resetFields();
      this.setState({
        visible: false
      })
    })
  }

  handleChange = (value) => {
    console.log(value);
    console.log(value[0] + value[1]);
    this.setState({
      areaInfo: value[0] + value[1]
    })
  }

  handleSearch = () => {
    console.log('qweqwe', this.state.areaInfo)
    this.props.dispatch({
      type: 'population/getAreaInfo',
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
          sex: values.sex,
          age: +values.age,
          IDnumber: values.IDnumber,
          address: values.address,
          area: values.area[0] + values.area[1]
        }
        console.log('Received values of form: ', value);
        this.props.dispatch({
          type: 'population/insertData',
          payload: value,
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data, loading } = this.props;
    console.log('data+++++++', data);
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      render: text => <span>{text === 'man' ? '男' : '女'}</span>
    }, {
      title: '身份证号',
      dataIndex: 'IDnumber',
      key: 'IDnumber',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '详细地址',
      dataIndex: 'address',
      key: 'address',
    },{
      render: (text, ID) => (
        <span>
          <a onClick={() => this.showModal(ID)}>修改</a>
          <Divider type="vertical" />
          <ModifyModal
            wrappedComponentRef={this.saveFormRef}
            ID={this.state.singleData.ID}
            name={this.state.singleData.name}
            sex={this.state.singleData.sex}
            age={this.state.singleData.age}
            IDnumber={this.state.singleData.IDnumber}
            area={this.state.singleData.area}
            address={this.state.singleData.address}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </span>
      ),
    }];
    return (
      <div>
        {data === null || undefined ? null :
        <div>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入姓名!' }],
              })(
                <Input placeholder="姓名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('age', {
                rules: [{ required: true, message: '请输入年龄!' }],
              })(
                <Input placeholder="年龄" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('sex', {
                rules: [{ required: true, message: '请选择性别!' }],
              })(
                <Radio.Group>
                  <Radio value="man">男</Radio>
                  <Radio value="woman">女</Radio>
                </Radio.Group>
              )
              }
            </FormItem>
            <FormItem>
              {getFieldDecorator('IDnumber', {
                rules: [{ required: true, min: 18, max: 18,  message: '请输入正确的身份证号！'}]
              })(
                <Input placeholder="身份证号" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('area', {
                rules: [{ required: true, message: '请输入所在地区！'}]
              })(
                <Cascader options={options} placeholder="选择地区" />
              )}
            </FormItem>
              <FormItem>
                {getFieldDecorator('address', {
                  rules: [{ required: true, message: '请输入精确地址！'}]
                })(
                  <Input placeholder="精确地址" />
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
          <Cascader style={{ marginTop: 15 }} options={options} onChange={this.handleChange} placeholder="选择地区" />
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
            dataSource={data.info}
            loading={loading}
          />
        </div>
        }
      </div>
    );
  }
}

CPopulation = Form.create({})(CPopulation);

export default connect(state => ({
  data: state.population.data,
  loading: state.loading.models.population
}))(CPopulation);
