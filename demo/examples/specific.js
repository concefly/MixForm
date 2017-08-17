module.exports = {
  endTimePicker: {
    items: {
      endTime: {
        view: {
          label: '结束时间',
          field: {
            type: 'endTimePicker',
          },
          extra: '此控件会以可读字符串形式返回时间',
        },
        validation: {
          rules: [{ type: 'string', required: true, message: '必须输入时间' }],
        },
      },
    },
  },
  dataProviderParamSet: {
    items: {
      params: {
        view: {
          label: '参数列表',
          field: {
            type: 'dataProviderParamSet',
            props: {
              types: ['TypeA', 'TypeB'],
            },
          },
          extra: '此控件用于编辑key-type-desc参数列表，会返回Array',
        },
        validation: {
          rules: [{ type: 'array', required: true, message: '必须输入参数' }],
        },
      },
    },
  },
  singleImageUpload: {
    items: {
      params: {
        view: {
          label: '封面',
          field: {
            type: 'singleImageUpload',
            props: {
              thumbSize: [160, 80],
              uploadPath: '/api/upload',
            },
          },
          extra: '此控件用于上传单张图片，会返回图片URL。注意需要配置上传地址和预览尺寸',
        },
        validation: {
          rules: [{ type: 'url', required: true }],
        },
      },
    },
  },
};
