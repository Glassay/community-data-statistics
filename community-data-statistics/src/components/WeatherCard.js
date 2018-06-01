import React from 'react';

import styles from './WeatherCard.less';

export default class WeatherCard extends React.Component {
  render() {
    return(
      <div className={styles.container}>
        <div className={styles.time}>
          <div>{this.props.date}</div>
          <div>{this.props.week}</div>
        </div>
        <div className={styles.line} />
        <div className={styles.label}>
          <span className={styles.type}>最高温度：</span>
          <div>{this.props.temp_day_c}</div>
        </div>
        <div className={styles.label}>
          <span className={styles.type}>最低温度：</span>
          <div>{this.props.temp_night_c}</div>
        </div>
        <div className={styles.label}>
          <span className={styles.type}>天气：</span>
          <div>{this.props.weather}</div>
        </div>
        {/* <div className={styles.label}>
          <span className={styles.type}>风力：</span>
          <div>{this.props.wind}</div>
        </div> */}
      </div>
    );
  }
}
