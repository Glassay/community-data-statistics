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
  Modal,
  Divider
} from 'antd';
import { connect } from 'dva';

import options from '../../assets/communityName';

const FormItem = Form.Item;

const ModifyModal = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="楼房信息修改"
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
            <FormItem>
              {getFieldDecorator('name', {
                initialValue: this.props.name,
                rules: [{ required: true, message: '请输入小区单元!' }],
              })(
                <Input placeholder="小区单元" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('high', {
                initialValue: this.props.high,
                rules: [{ required: true, message: '请输入楼房高度!' }],
              })(
                <Input placeholder="楼房高度" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('layer', {
                initialValue: this.props.layer,
                rules: [{ required: true, message: '请输入小区层数！'}]
              })(
                <Input placeholder="小区层数" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('address', {
                initialValue: this.props.address,
                rules: [{ required: true, message: '请输入具体地址！'}]
              })(
                <Input placeholder="具体地址" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('acreage', {
                initialValue: this.props.acreage,
                rules: [{ required: true, message: '请输入楼房面积！'}]
              })(
                <Input placeholder="楼房面积" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('region', {
                initialValue: this.props.region,
                rules: [{ required: true, message: '请输入所属小区！'}]
              })(
                <Input placeholder="小区" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('builddate', {
                initialValue: this.props.builddate,
                rules: [{ required: true, message: '请输入建成时间！'}]
              })(
                <Input placeholder="建成时间" />
              )}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
)

class Building extends React.Component {
  state = {
    region: null,
    singleData: 0,
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'building/getInfos'
    })
    console.log('sssssssss');
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
        high: +values.high,
        layer: +values.layer,
        address: values.address,
        region: values.region[0],
        acreage: +values.acreage,
        builddate: values.builddate
      }
      this.props.dispatch({
        type: 'building/modifyInfos',
        payload: modifyInfo
      })
      form.resetFields();
      this.setState({
        visible: false
      })
    })
  }

  handleChange = (value) => {
    console.log(value[0]);
    this.setState({
      region: value[0]
    })
  }

  handleDelete = (ID) => {
    this.props.dispatch({
      type: 'building/deleteInfos',
      payload: ID
    })
  }

  handleSearch = () => {
    console.log('qweqwe', this.state.region)
    this.props.dispatch({
      type: 'building/searchInfos',
      payload: {
        region: this.state.region
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const value = {
          name: values.name,
          high: +values.high,
          layer: +values.layer,
          address: values.address,
          region: values.region[0],
          acreage: +values.acreage,
          builddate: values.builddate
        }
        console.log('Received values of form: ', value);
        this.props.dispatch({
          type: 'building/insertInfos',
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
      title: '单元号',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '高度',
      dataIndex: 'high',
      key: 'high',
    }, {
      title: '层数',
      dataIndex: 'layer',
      key: 'layer',
    }, {
      title: '面积',
      dataIndex: 'acreage',
      key: 'acreage',
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '小区',
      dataIndex: 'region',
      key: 'region',
    }, {
      title: '建成日期',
      dataIndex: 'builddate',
      key: 'builddate',
    },{
      render: (text, ID) => (
        <span>
          <a onClick={() => this.showModal(ID)}>修改</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDelete(ID)}>删除</a>
          <ModifyModal
            wrappedComponentRef={this.saveFormRef}
            ID={this.state.singleData.ID}
            name={this.state.singleData.name}
            high={this.state.singleData.high}
            layer={this.state.singleData.layer}
            address={this.state.singleData.address}
            acreage={this.state.singleData.acreage}
            region={this.state.singleData.region}
            builddate={this.state.singleData.builddate}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
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
                rules: [{ required: true, message: '请输入小区单元!' }],
              })(
                <Input placeholder="小区单元" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('high', {
                rules: [{ required: true, message: '请输入楼房高度!' }],
              })(
                <Input placeholder="楼房高度" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('layer', {
                rules: [{ required: true, message: '请输入小区层数！'}]
              })(
                <Input placeholder="小区层数" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('address', {
                rules: [{ required: true, message: '请输入具体地址！'}]
              })(
                <Input placeholder="具体地址" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('acreage', {
                rules: [{ required: true, message: '请输入楼房面积！'}]
              })(
                <Input placeholder="楼房面积" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('region', {
                rules: [{ required: true, message: '请输入所属小区！'}]
              })(
                <Cascader onChange={this.handleChange} options={options} placeholder="选择小区" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('builddate', {
                rules: [{ required: true, message: '请输入建成时间！'}]
              })(
                <Input placeholder="建成时间" />
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

Building = Form.create({})(Building);

export default connect(state => ({
  infos: state.building.infos,
  loading: state.loading.models.building
}))(Building);
