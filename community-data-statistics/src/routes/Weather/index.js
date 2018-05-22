/**
 * 2018-05-08
 * 天气展示
 */

import React from 'react';
import {
  Cascader,
} from 'antd';
import { connect } from 'dva';

class Weather extends React.Component {
  // componentDidMount() {
  //   this.props.dispatch({
  //     type: 'weather/getInfo'
  //   })
  // }
  render() {
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
    const { loading } = this.props;
    // console.log('data>>>>>>', data);
    console.log('loading>>>>>', loading);
    return (
      <div>
        <Cascader options={options} onChange={() => this.handleChange} placeholder="选择地区" />
      </div>
    );
  }
}

export default connect(state => ({
  loading: state.loading.models.weather,
  // data: state.weather.data,
}))(Weather);
