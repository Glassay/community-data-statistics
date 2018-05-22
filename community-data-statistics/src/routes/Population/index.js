/**
 * 2018-05-08
 * 人口统计
 */

import React from 'react';
import {
  Cascader,
} from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';

import styles from './index.less';

class Population extends React.Component {
  handleChange = (value) => {
    console.log(value);
  }
  render() {
    // 数据源
    const data = [
      { genre: '儿童', count: 275 },
      { genre: '少年', count: 115 },
      { genre: '青年', count: 120 },
      { genre: '中年', count: 350 },
      { genre: '老年', count: 150 }
    ];
    
    // 定义度量
    const cols = {
      count: { alias: '人口数' },
      genre: { alias: '区间' }
    };

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
        <Chart className={styles.chart} width={600} height={400} data={data} scale={cols}>
          <Axis name="genre" />
          <Axis name="count" />
          <Legend position="bottom" dy={-20} />
          <Tooltip />
          <Geom type="interval" position="genre*count" color="genre" />
        </Chart>
      </div>
    );
  }
}

export default Population;
