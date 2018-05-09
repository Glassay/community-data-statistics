/**
 * 2018-05-08
 * 天气展示
 */

import React from 'react';
import { connect } from 'dva';

class Weather extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'weather/getInfo'
    })
  }
  render() {
    const { data, loading } = this.props;
    console.log('data>>>>>>', data);
    console.log('loading>>>>>', loading);
    return (
      <div>天气展示</div>
    );
  }
}

export default connect(state => ({
  loading: state.loading.models.weather,
  data: state.weather.data,
}))(Weather);
