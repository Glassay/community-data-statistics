/**
 * 2018-05-22
 * 工业统计
 */

import React from 'react';
import {
  Cascader,
  Table,
  Divider
} from 'antd';

class Enterprise extends React.Component {
  render() {
    const columns = [{
      title: '公司名称',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '注册资本',
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
      render: (text, record) => (
        <span>
          <a>修改</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDelete(record.id)}>删除</a>
          <Divider type="vertical" />
        </span>
      ),
    }];
    const options = [{
      value: '保定',
      label: '保定',
      children: [{
        value: '莲池区',
        label: '莲池区',
      }, {
        value: '徐水区',
        label: '徐水区',
      }, {
        value: '竞秀区',
        label: '竞秀区',
      }, {
        value: '清苑区',
        label: '清苑区',
      }],
    }]
    return (
      <div>
        <Cascader options={options} onChange={() => this.handleChange} placeholder="选择地区" />
        <Table
          style={{ marginTop: 20 }}
          rowKey="id"
          columns={columns}
          // dataSource={data}
          // loading={loading}
        />
      </div>
    );
  }
}

export default Enterprise;
