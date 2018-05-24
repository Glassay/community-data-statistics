/**
 * 2018-05-22
 * 工业统计
 */

import React from 'react';
import {
  Cascader,
  Table,
  Divider
} from 'antd';
import { connect } from 'dva';

import options from '../../assets/addressData';

class Enterprise extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'enterprise/getInfos'
    })
    console.log('sssssssss');
  }

  render() {
    const { infos } = this.props;
    console.log('infos>>>>>>', infos);
    const columns = [{
      title: '公司名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    }, {
      title: '注册资本',
      dataIndex: 'capital',
      key: 'capital',
    }, {
      title: '经营范围',
      dataIndex: 'scope',
      key: 'scope',
    }, {
      title: '公司地址',
      dataIndex: 'adress',
      key: 'adress',
    },{
      render: (text, record) => (
        <span>
          <a onClick={() => this.handleDelete(record.id)}>删除</a>
        </span>
      ),
    }];
    return (
      <div>
        {infos === null || undefined ? null :
        <div>
          <Cascader options={options} onChange={this.handleChange} placeholder="选择地区" />
          <Table
            style={{ marginTop: 20 }}
            rowKey="ID"
            columns={columns}
            dataSource={infos.data}
            // loading={loading}
          />
        </div>
        }
      </div>
    );
  }
}

export default connect(state => ({
  infos: state.enterprise.infos
}))(Enterprise);
