/**
 * 2018-05-08
 * 人口统计
 */

import React from 'react';
import {
  Cascader,
} from 'antd';

class Population extends React.Component {
  handleChange = (value) => {
    console.log(value);
  }
  render() {
    const options = [{
      value: '保定',
      label: '保定',
      children: [{
        value: '莲池区',
        label: '莲池区',
        children: [{
          value: '韩庄乡',
          label: '韩庄乡',
        }],
      }, {
        value: '徐水区',
        label: '徐水区',
        children: [{
          value: '瑞祥大街',
          label: '瑞祥大街',
        }]
      }, {
        value: '竞秀区',
        label: '竞秀区',
        children: [{
          value: '瑞祥大街',
          label: '瑞祥大街',
        }]
      }, {
        value: '清苑区',
        label: '清苑区',
        children: [{
          value: '瑞祥大街',
          label: '瑞祥大街',
        }]
      }],
    }]
    return (
      <Cascader options={options} onChange={() => this.handleChange} placeholder="选择地区" />
    );
  }
}

export default Population;
