/**
 * 2018-05-08
 * 工业统计
 */

import React from 'react';
import {
  Cascader,
} from 'antd';
// import { Chart, Axis, Geom, Tooltip, Coord, Legend, Label } from 'bizcharts';

class Industrial extends React.Component {
  render() {
    // const { DataView } = DataSet; // eslint-disable-line
    // const data = [
    //   { item: '事例一', count: 40 },
    //   { item: '事例二', count: 21 },
    //   { item: '事例三', count: 17 },
    //   { item: '事例四', count: 13 },
    //   { item: '事例五', count: 9 }
    // ];
    // const dv = new DataView();
    // dv.source(data).transform({
    //   type: 'percent',
    //   field: 'count',
    //   dimension: 'item',
    //   as: 'percent'
    // });
    // const cols = {
    //   percent: {
    //     formatter: val => {
    //       val = (val * 100) + '%';
    //       return val;
    //     }
    //   }
    // }
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
        {/* <Chart height={window.innerHeight} data={dv} scale={cols} padding={[ 80, 100, 80, 80 ]} forceFit>
          <Coord type='theta' radius={0.75} />
          <Axis name="percent" />
          <Legend position='right' offsetY={-window.innerHeight / 2 + 120} offsetX={-100} />
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
            style={{lineWidth: 1,stroke: '#fff'}}
            >
            <Label content='percent' formatter={(val, item) => {
                return item.point.item + ': ' + val;}} />
          </Geom>
        </Chart> */}
      </div>
    );
  }
}

export default Industrial;
