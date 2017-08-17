'use strict';

const React = require('react');
const { Button, Form } = require('antd');
const _ = require('lodash');
const getField = require('./field');
const getExtra = require('./extra');

const Component = React.Component;
const PropTypes = React.PropTypes;
const FormItem = Form.Item;

class MixForm extends Component {
  render() {
    const innerForm = formProps => {
      const { getFieldDecorator, validateFields } = formProps.form;
      const { schema, onSubmit, onCancel } = formProps;
      const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };
      // submit handler
      const handleSubmit = e => {
        e.preventDefault();
        validateFields((err, values) => {
          if (!err) onSubmit && onSubmit(values);
        });
      };
      // cancel handler
      const handleCancel = () => {
        onCancel && onCancel();
      };
      // return Form
      return (
        <Form onSubmit={handleSubmit}>
          {_.map(schema.items, (itemDefine, name) => {
            const field = getField(itemDefine.view.field);
            const extra = getExtra(itemDefine.view.extra);
            // prepare field decorator
            const decoratorConfig = {};
            if (itemDefine.validation && itemDefine.validation.rules) {
              decoratorConfig.rules = itemDefine.validation.rules.map(rule => {
                // 转换服务端传来的字符串为RegExp类型
                if (rule.patternString) {
                  return Object.assign({}, rule, {
                    pattern: new RegExp(rule.patternString, rule.flag || ''),
                  });
                }
                return rule;
              });
            }
            if (itemDefine.view.field.defaultValue) {
              decoratorConfig.initialValue = itemDefine.view.field.defaultValue;
            }
            // return FormItem
            return (
              <FormItem
                label={itemDefine.view.label}
                extra={extra}
                {...formItemLayout}
                key={name}
                style={{ display: itemDefine.view.field.type === 'hidden' ? 'none' : 'block' }}
              >
                {getFieldDecorator(name, decoratorConfig)(field)}
              </FormItem>
            );
          })}
          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              {this.props.submitText || '确定'}
            </Button>
            <Button onClick={handleCancel} style={{ marginLeft: '1em' }}>
              {this.props.cancelText || '取消'}
            </Button>
          </FormItem>
        </Form>
      );
    };
    const WrappedForm = Form.create()(innerForm);
    const { formSchema, onSubmit, onCancel } = this.props;
    return (
      <div>
        <WrappedForm schema={formSchema} onSubmit={onSubmit} onCancel={onCancel} />
      </div>
    );
  }
}

MixForm.propTypes = {
  formSchema: PropTypes.shape({
    items: PropTypes.shape({
      name: PropTypes.shape({
        view: PropTypes.shape({
          label: PropTypes.string.isRequired,
          field: PropTypes.shape({
            type: PropTypes.string.isRequired,
            children: PropTypes.element,
            defaultValue: PropTypes.any,
            props: PropTypes.object,
          }),
          extra: PropTypes.any,
        }),
        validation: PropTypes.shape({
          rules: PropTypes.array,
        }),
      }),
    }),
  }),
  submitText: PropTypes.string,
  cancelText: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

module.exports = MixForm;
