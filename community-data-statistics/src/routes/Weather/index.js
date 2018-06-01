/**
 * 2018-05-08
 * 天气展示
 */

import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';

import WeatherCard from '../../components/WeatherCard';
import styles from './index.less';

class Weather extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'weather/getInfo'
    })
  }
  // handleSearch = () => {
  //   this.props.dispatch({
  //     type: 'weather/getInfo'
  //   })
  // }
  render() {
    const { loading, weathers } = this.props;
    // const infos = JSON.parse(localStorage.getItem('weatherInfo'));
    console.log('data>>>>>>', weathers);
    console.log('loading>>>>>', loading);
    // console.log('infos++++++', infos);
    return (
      <div>
        <h2 style={{ color: '#99ddcc' }}>保定</h2>
        {
          weathers === '' || undefined ? null :
          weathers.value[0].weathers.map(item => (
            <div
              key={item.date}
              className={styles.container}
            >
              <WeatherCard
                date={item.date}
                week={item.week}
                temp_day_c={item.temp_day_c}
                temp_night_c={item.temp_night_c}
                weather={item.weather}
              />
            </div>
          ))
        }
        <div style={{ clear: 'both' }}></div>
      </div>
    );
  }
}

export default connect(state => ({
  loading: state.loading.models.weather,
  weathers: state.weather.weathers,
}))(Weather);
