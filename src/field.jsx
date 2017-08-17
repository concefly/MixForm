'use strict';

const React = require('react');
const {
  Switch,
  Input,
  InputNumber,
  Radio,
  Select,
  DatePicker,
  Upload,
  Button,
  Row,
  Col,
  Icon,
} = require('antd');
const moment = require('moment');
const _ = require('lodash');

const Component = React.Component;
const PropTypes = React.PropTypes;

const Option = Select.Option;

class ValueSwitch extends Component {
  render() {
    return <Switch {...this.props} checked={this.props.value} />;
  }
}

class EndTimePicker extends Component {
  disabledDate(current) {
    // 限制在 60 days 内
    return !current.isBetween(moment(), moment().add(60, 'days'), 'day', '[]');
  }
  onChange(time, timeString) {
    void time;
    this.props.onChange(timeString);
  }
  render() {
    return (
      <DatePicker
        {...this.props}
        value={moment(this.props.value)}
        allowClear={false}
        format="YYYY-MM-DD HH:mm"
        showTime={{
          format: 'HH:mm',
          hideDisabledOptions: true,
        }}
        disabledDate={this.disabledDate.bind(this)}
        onChange={this.onChange.bind(this)}
      />
    );
  }
}

class SingleImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: this.props.value,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value && !this.state.imgUrl) {
      this.setState({
        imgUrl: nextProps.value,
      });
    }
  }
  handleChange(value) {
    if (value.file && value.file.response) {
      const { url, success } = value.file.response;
      if (url && success) {
        this.setState({ imgUrl: url });
        this.props.onChange(url);
      }
    }
  }
  render() {
    const { imgUrl } = this.state;
    const [thumbWidth, thumbHeight] = this.props.thumbSize;
    const bgStyle = {
      width: thumbWidth,
      height: thumbHeight,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundImage: `url(${imgUrl})`,
      border: '1px dashed #ddd',
    };
    return (
      <div>
        {imgUrl && <div style={bgStyle} />}
        <Upload
          accept="images/*"
          listType="picture"
          action="/api/upload"
          showUploadList={false}
          onChange={this.handleChange.bind(this)}
        >
          <Button>上传</Button>
        </Upload>
      </div>
    );
  }
}
SingleImageUpload.propTypes = {
  thumbSize: PropTypes.array.isRequired,
};

class DataProviderParamSet extends Component {
  constructor(props) {
    super(props);
    const originParam = props.value ? this.toInnerParams(props.value) : {};
    this.state = {
      isEditing: false,
      error: '',
      params: originParam,
    };
    this.originParam = originParam;
  }
  toInnerParams(params) {
    const re = {};
    params.forEach(p => {
      re[_.uniqueId()] = p;
    });
    return re;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value) this.originParam = this.toInnerParams(nextProps.value);
  }
  replaceParam(id, fieldName, value) {
    const params = Object.assign({}, this.state.params);
    params[id][fieldName] = value;
    return params;
  }
  validate() {
    const ids = Object.keys(this.state.params);
    const isValid = ids.every(id => {
      const p = this.state.params[id];
      return p.key && p.type && p.description;
    });
    if (isValid) {
      return true;
    }
    this.setState({
      error: '请正确填写参数',
    });
    return false;
  }
  handleEditChange(isEditing) {
    this.setState({
      isEditing,
    });
  }
  handleOpen() {
    this.setState({
      isEditing: true,
    });
  }
  handleSave() {
    if (this.validate()) {
      const ids = Object.keys(this.state.params);
      const re = ids.map(id => this.state.params[id]);
      this.setState(
        {
          isEditing: false,
        },
        () => this.props.onChange(re)
      );
    }
  }
  handleCancel() {
    this.setState({
      isEditing: false,
      error: '',
      params: this.originParam,
    });
  }
  handleKeyChange(id, value) {
    this.setState({
      params: this.replaceParam(id, 'key', value),
    });
  }
  handleTypeChange(id, value) {
    this.setState({
      params: this.replaceParam(id, 'type', value),
    });
  }
  handleDescChange(id, value) {
    this.setState({
      params: this.replaceParam(id, 'description', value),
    });
  }
  handleAppend() {
    const params = Object.assign({}, this.state.params, { [_.uniqueId()]: {} });
    this.setState({ params });
  }
  handleRemove(id) {
    const re = {};
    Object.keys(this.state.params).forEach(pid => {
      if (id !== pid) re[pid] = this.state.params[pid];
    });
    this.setState({
      params: re,
    });
  }
  render() {
    const { params, isEditing } = this.state;
    const { types } = this.props;
    const ids = Object.keys(params).sort((a, b) => (+a < +b ? -1 : 1));
    const span = {
      key: 6,
      type: 6,
      description: 12,
    };
    return (
      <div>
        {isEditing
          ? <div>
              {ids.map(id =>
                <Row gutter={4} key={id}>
                  <Col span={span.key}>
                    <Input
                      value={params[id].key}
                      placeholder="key"
                      onChange={e => this.handleKeyChange(id, e.target.value)}
                    />
                  </Col>
                  <Col span={span.type}>
                    <Select
                      value={params[id].type}
                      placeholder="type"
                      onChange={e => this.handleTypeChange(id, e)}
                    >
                      {types.map((type, index) =>
                        <Option value={type} key={index}>
                          {type}
                        </Option>
                      )}
                    </Select>
                  </Col>
                  <Col span={span.description - 1}>
                    <Input
                      value={params[id].description}
                      placeholder="description"
                      onChange={e => this.handleDescChange(id, e.target.value)}
                    />
                  </Col>
                  <Col span={1} style={{ textAlign: 'right' }}>
                    <a onClick={() => this.handleRemove(id)}>
                      <Icon type="minus-circle-o" />
                    </a>
                  </Col>
                </Row>
              )}
              <Row>
                <Col span={23}>
                  <a
                    style={{
                      display: 'block',
                      marginTop: 2,
                      lineHeight: 2,
                      border: '1px dashed #ccc',
                      borderRadius: '4px',
                      textAlign: 'center',
                      color: '#ccc',
                    }}
                    onClick={this.handleAppend.bind(this)}
                  >
                    <Icon type="plus" /> 新增参数
                  </a>
                </Col>
              </Row>
              {this.state.error &&
                <div style={{ color: 'red' }}>
                  <Icon type="close" /> {this.state.error}
                </div>}
              <div>
                <a onClick={this.handleSave.bind(this)}>确定</a>
                <a style={{ marginLeft: 4, color: '#ccc' }} onClick={this.handleCancel.bind(this)}>
                  取消
                </a>
              </div>
            </div>
          : <div>
              <div>
                {ids.map(id =>
                  <Row key={id} gutter={4}>
                    <Col span={span.key}>
                      <Input value={params[id].key} disabled />
                    </Col>
                    <Col span={span.type}>
                      <Input value={params[id].type} disabled />
                    </Col>
                    <Col span={span.description}>
                      <Input value={params[id].description} disabled />
                    </Col>
                  </Row>
                )}
              </div>
              <a onClick={() => this.handleOpen()}>
                编辑参数 <Icon type="edit" />
              </a>
            </div>}
      </div>
    );
  }
}

module.exports = function getField(field) {
  switch (field.type) {
    case 'hidden':
      return <input type="hidden" />;
    case 'plain':
      return (
        <span className="ant-form-text">
          {field.children}
        </span>
      );
    case 'switch':
      return <ValueSwitch />;
    case 'input':
    case 'string':
      return <Input />;
    case 'number':
      return <InputNumber />;
    case 'radio':
      return (
        <Radio.Group {...field.props}>
          {_.map(field.children, (content, value) =>
            <Radio value={value} key={value}>
              {content}
            </Radio>
          )}
        </Radio.Group>
      );
    case 'select':
      return (
        <Select {...field.props}>
          {_.map(field.children, (content, value) =>
            <Select.Option value={value} key={value}>
              {content}
            </Select.Option>
          )}
        </Select>
      );
    case 'endTimePicker':
      return <EndTimePicker {...field.props} />;
    case 'singleImageUpload':
      return <SingleImageUpload {...field.props} />;
    case 'dataProviderParamSet':
      return <DataProviderParamSet {...field.props} />;
    default:
      return <span className="ant-form-text">暂不支持</span>;
  }
};
