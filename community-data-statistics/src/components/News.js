import React from 'react';
import { Card } from 'antd';

export default class News extends React.Component {
  render() {
    return (
      <Card
        title={this.props.title}
        style={{ margin: 20, width: 300 }}
      >
        <p>{this.props.content}</p>
      </Card>
    );
  }
}
