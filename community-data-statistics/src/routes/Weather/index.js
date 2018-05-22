/**
 * 2018-05-08
 * 天气展示
 */

import React from 'react';
import {
  Cascader,
} from 'antd';
import { connect } from 'dva';

import options from '../../assets/addressData';

class Weather extends React.Component {
  // componentDidMount() {
  //   this.props.dispatch({
  //     type: 'weather/getInfo'
  //   })
  // }
  render() {
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
