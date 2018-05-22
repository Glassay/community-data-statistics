/**
 * 2018-05-08
 * 工业统计
 */

import React from 'react';
import {
  Cascader,
} from 'antd';
import { Chart, Axis, Geom, Tooltip, Coord, Legend, Label } from 'bizcharts';
import { DataSet } from '@antv/data-set';

class Industrial extends React.Component {
  render() {
    const { DataView } = DataSet;
    const data = [
      { item: '制造业', count: 40 },
      { item: '建筑业', count: 21 },
      { item: '零售业', count: 17 },
      { item: '餐饮业', count: 13 },
      { item: '金融业', count: 4 },
      { item: '互联网', count: 5 }
    ];
    const dv = new DataView();
    dv.source(data).transform({
      type: 'percent',
      field: 'count',
      dimension: 'item',
      as: 'percent'
    });
    const cols = {
      percent: {
        formatter: val => {
          val = (val * 100) + '%';
          return val;
        }
      }
    }
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
        <Chart height={window.innerHeight} data={dv} scale={cols} padding={[ 80, 100, 80, 80 ]} forceFit>
          <Coord type='theta' radius={0.75} />
          <Axis name="percent" />
          <Legend position='left' offsetY={-window.innerHeight / 2 + 120} offsetX={50} />
          <Tooltip 
            showTitle={false} 
            itemTpl='<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
            />
          <Geom
            type="intervalStack"
            position="percent"
            color='item'
            tooltip={['item*percent',(item, percent) => {
              percent = percent * 100 + '%';
              return {
                name: item,
                value: percent
              };
            }]}
            style={{ lineWidth: 1, stroke: '#fff'}}
            >
            <Label content='percent' formatter={(val, item) => {
                return item.point.item + ': ' + val;}} />
          </Geom>
        </Chart>
      </div>
    );
  }
}

export default Industrial;
