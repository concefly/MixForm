const test = require('ava');
const React = require('react');
const { shallow } = require('enzyme');

const Div = require('../src/temp');

test('Div shallow', t => {
  const w = shallow(<Div />);
  t.is(w.text(), 'xxx');
});
