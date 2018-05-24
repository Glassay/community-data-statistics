/**
 * 2018-05-08
 * 人口统计
 */

import React from 'react';
import {
  Cascader,
} from 'antd';
import { connect } from 'dva';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';

import styles from './index.less';
import options from '../../assets/addressData';

class Population extends React.Component {
  state = {
    select: null
  }

  handleChange = (value) => {
    console.log(value);
    console.log(value[0] + value[1]);
    this.props.dispatch({
      type: 'population/getAge',
      payload: value[0] + value[1]
    })
  }

  render() {
    // 数据源
    // const { age } = this.props;
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
    return (
      <div>
        <Cascader
          options={options}
          onChange={this.handleChange}
          placeholder="选择地区"
        />
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

export default connect(state => ({
  age: state.population.age
}))(Population);
