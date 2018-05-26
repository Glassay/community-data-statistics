/**
 * 2018-05-08
 * 天气展示
 */

import React from 'react';
import { connect } from 'dva';

import WeatherCard from '../../components/WeatherCard';
import styles from './index.less';

class Weather extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'weather/getInfo'
    })
  }
  render() {
    const { loading, data } = this.props;
    const infos = JSON.parse(localStorage.getItem('weatherInfo'));
    console.log('data>>>>>>', data);
    console.log('loading>>>>>', loading);
    console.log('infos++++++', infos);
    return (
      <div>
        <h2 style={{ color: '#99ddcc' }}>保定</h2>
        {
          infos === null ? null :
          infos.weather[0].future.map(item => (
            <div
              key={item.date}
              className={styles.container}
            >
              <WeatherCard
                date={item.date}
                day={item.day}
                high={item.high}
                low={item.low}
                text={item.text}
                wind={item.wind}
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
  data: state.weather.data,
}))(Weather);
