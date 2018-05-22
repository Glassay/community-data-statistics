/**
 * 2018-05-22
 * 人口数据基本管理
 */

import React from 'react';
// import { connect } from 'dva';
import {
  Cascader,
  Table,
  Divider
} from 'antd';

class CPopulation extends React.Component {
  render() {
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    }, {
      title: '性别',
      dataIndex: 'studentNumber',
      key: 'studentNumber',
    }, {
      title: '身份证号',
      dataIndex: 'sex',
      key: 'sex',
    }, {
      title: '年龄',
      dataIndex: 'class',
      key: 'class',
    }, {
      title: '所在地区',
      dataIndex: 'club',
      key: 'club',
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

export default CPopulation;
