module.exports = {
  '简单的文本输入(带校验)': {
    items: {
      title: {
        view: {
          label: '名称',
          field: {
            type: 'input',
          },
        },
        validation: {
          rules: [{ type: 'string', required: true, message: '必须填写名称' }],
        },
      },
      desc: {
        view: {
          label: '描述',
          field: {
            type: 'input',
            defaultValue: 'xxxxx',
          },
          extra: '可以用defaultValue指定初始值',
        },
      },
      note: {
        view: {
          label: '文本',
          field: {
            type: 'plain',
            defaultValue: '这里是plain text，随便写什么，whatever',
          },
        },
      },
      text: {
        view: {
          label: '文本x',
          field: {
            type: 'copyPlain',
            defaultValue: '还可以带复制按钮',
          },
        },
      },
    },
  },
  switch: {
    items: {
      isEnable: {
        view: {
          label: '是否启用',
          field: {
            type: 'switch',
          },
        },
        validation: {
          rules: [{ type: 'boolean', required: true }],
        },
      },
    },
  },
  number: {
    items: {
      age: {
        view: {
          label: '年龄',
          field: {
            type: 'number',
          },
        },
        validation: {
          rules: [{ type: 'number', required: true }],
        },
      },
    },
  },
  radio: {
    items: {
      gender: {
        view: {
          label: '性别',
          field: {
            type: 'radio',
            children: {
              male: '男',
              female: '女',
            },
            defaultValue: 'male',
          },
        },
        validation: {
          rules: [{ type: 'enum', enum: ['male', 'female'], required: true }],
        },
      },
    },
  },
  select: {
    items: {
      city: {
        view: {
          label: '城市',
          field: {
            type: 'select',
            children: {
              guangzhou: '广州',
              hangzhou: '杭州',
            },
            defaultValue: 'guangzhou',
          },
        },
        validation: {
          rules: [{ type: 'enum', enum: ['guangzhou', 'hangzhou'], required: true }],
        },
      },
    },
  },
};
