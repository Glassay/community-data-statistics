/**
 * 2018-05-08
 * 人口统计
 */

import React from 'react';
import {
  Cascader,
} from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';

import styles from './index.less';

class Population extends React.Component {
  handleChange = (value) => {
    console.log(value);
  }
  render() {
    // 数据源
    const data = [
      { genre: 'Sports', sold: 275, income: 2300 },
      { genre: 'Strategy', sold: 115, income: 667 },
      { genre: 'Action', sold: 120, income: 982 },
      { genre: 'Shooter', sold: 350, income: 5271 },
      { genre: 'Other', sold: 150, income: 3710 }
    ];
    
    // 定义度量
    const cols = {
      sold: { alias: '销售量' },
      genre: { alias: '游戏种类' }
    };

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
      <div>
        <Cascader options={options} onChange={() => this.handleChange} placeholder="选择地区" />
        <Chart className={styles.chart} width={600} height={400} data={data} scale={cols}>
          <Axis name="genre" />
          <Axis name="sold" />
          <Legend position="bottom" dy={-20} />
          <Tooltip />
          <Geom type="interval" position="genre*sold" color="genre" />
        </Chart>
      </div>
    );
  }
}

export default Population;
