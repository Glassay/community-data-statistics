/**
 * 2018-05-08
 * 经济统计
 */

import React from 'react';
import {
  Cascader,
} from 'antd';
import { Chart, Axis, Geom, Tooltip } from 'bizcharts';

class Economics extends React.Component {
  render() {
    const data = [
      { year: "2008", GDP: 3 },
      { year: "2009", GDP: 4 },
      { year: "2010", GDP: 3 },
      { year: "2011", GDP: 4 },
      { year: "2012", GDP: 3.5 },
      { year: "2013", GDP: 5 },
      { year: "2014", GDP: 4.9 },
      { year: "2015", GDP: 6 },
      { year: "2016", GDP: 7 },
      { year: "2017", GDP: 9 },
      { year: "2018", GDP: 13 }
    ];
    const cols = {
      'GDP': { min: 0 },
      'year': {range: [ 0 , 1] }
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
      <div style={{ overflow: 'scroll' }}>
        <Cascader options={options} onChange={() => this.handleChange} placeholder="选择地区" />
        <Chart height={400} data={data} scale={cols} forceFit>
          <Axis name="year" />
          <Axis name="GDP" />
          <Tooltip crosshairs={{type : "y"}}/>
          <Geom type="line" position="year*GDP" size={2} />
          <Geom type='point' position="year*GDP" size={4} shape={'circle'} style={{ stroke: '#fff', lineWidth: 1}} />
        </Chart>
      </div>
    );
  }
}

export default Economics;
