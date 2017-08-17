const React = require('react');
const { Card, Modal, Collapse } = require('antd');
const MixForm = require('../../src/index');

const Panel = Collapse.Panel;

function onSubmit(value) {
  Modal.info({
    content: (
      <pre>
        <code>
          {JSON.stringify(value, null, 2)}
        </code>
      </pre>
    ),
  });
}

const Example = ({ formMap }) =>
  <div>
    {Object.keys(formMap).map(title =>
      <Card title={title} key={title} style={{ margin: '0 16px 16px 16px' }}>
        <MixForm formSchema={formMap[title]} onSubmit={onSubmit} />
        <Collapse>
          <Panel header="show me the code" key="1">
            <pre>
              <code>
                {JSON.stringify(formMap[title], null, 2)}
              </code>
            </pre>
          </Panel>
        </Collapse>
      </Card>
    )}
  </div>;

module.exports = {
  general: <Example formMap={require('./general')} />,
  specific: <Example formMap={require('./specific')} />,
};
