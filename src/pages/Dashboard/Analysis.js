import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Modal, Table, Tag, Card, Button, Input, Form } from 'antd';

const FormItem = Form.Item;
@connect(({ chart, list }) => ({
  chart,
  list,
}))
@Form.create()
class Analysis extends Component {
  state = {
    myList: [],
    visible: false,
    name: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;

    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'list/fetch',
      });
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  saveForm = (value, cro) => {
    console.log(value);
    this.setState({
      visible: true,
      myList: value.properties,
      name: value.name,
    });
  };

  search = (value, e) => {
    this.props.form.validateFields((err, values) => {
      const { dispatch } = this.props;

    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'list/fetchList',
        pyload: values.name
      });
    });

    })
  };

  render() {
    const { list } = this.props.list;
    const columns1 = [
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '地址',
        dataIndex: 'url',
        key: 'url',
        render: text => (
          <span style={{ fontSize: '13px' }}>
            <a href={text}>{text}</a>
          </span>
        ),
      },
    ];
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '地址',
        dataIndex: 'baseURL',
        key: 'age',
        render: text => (
          <span style={{ fontSize: '13px' }}>
            <a href={text}>{text}</a>
          </span>
        ),
      },
      {
        title: '图片',
        dataIndex: 'image',
        key: 'image',
        render: text => <img src={text} />,
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <span>
            {tags.map(tag => (
              <Tag color="blue" key={tag}>
                {tag}
              </Tag>
            ))}
          </span>
        ),
      },
      {
        title: '更多信息',

        render: (text, cro) => (
          <Button type="primary" onClick={this.saveForm.bind(text, cro)}>
            更多信息
          </Button>
        ),
      },
    ];
    console.log(list);
    const { getFieldDecorator } = this.props.form;
    return (
      <Card>
        <Form>
          <FormItem label="搜索">
            {getFieldDecorator('name',)(
              <Input
                style={{ width: '200px', marginBottom: 20 }}
                placeholder="Tags"
                onChange={this.search}
              />
            )}
          </FormItem>
        </Form>
        <Table
          dataSource={list}
          columns={columns}
          rowKey={record => record.key}
          pagination={false}
        />
        <Modal
          title={this.state.name}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Table
            dataSource={this.state.myList}
            columns={columns1}
            rowKey={record => record.key}
            pagination={false}
          />
        </Modal>
      </Card>
    );
  }
}

export default Analysis;
