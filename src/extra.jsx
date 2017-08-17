'use strict';

const React = require('react');
const { Popover, Icon } = require('antd');
const QRCode = require('qrcode.react');

module.exports = extra => {
  let normalizedExtra = {};
  if (!extra) return <span />;
  if (typeof extra === 'string') {
    Object.assign(normalizedExtra, {
      type: 'plain',
      children: extra,
    });
  } else {
    normalizedExtra = extra;
  }
  switch (normalizedExtra.type) {
    case 'plain':
      return (
        <span>
          {normalizedExtra.children}
        </span>
      );
    case 'qrcode':
      return (
        <span>
          {normalizedExtra.children}
          <Popover
            content={
              <QRCode className="qrcode-canvas" value={normalizedExtra.props.qrcode} size={160} />
            }
            placement="bottom"
          >
            <a>
              <Icon type="qrcode" />
            </a>
          </Popover>
        </span>
      );
    case 'help':
      return (
        <span>
          {normalizedExtra.children}
          <a href={normalizedExtra.props.link} target="_blanck" style={{ marginLeft: 8 }}>
            <Icon type="question-circle-o" />
          </a>
        </span>
      );
    default:
      return <span />;
  }
};
