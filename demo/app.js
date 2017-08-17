const React = require('react');
const ReactDom = require('react-dom');
const { HashRouter: Router, Route, Redirect, Link } = require('react-router-dom');
const { Tabs } = require('antd');
const MixForm = require('../src/index');

require('antd/dist/antd.less');
require('./style.less');

const TabPane = Tabs.TabPane;

const tabMap = require('./examples');

const SideBar = ({ id, location, history }) =>
  <Tabs
    tabPosition="top"
    activeKey={location.pathname && location.pathname.slice(1)}
    onChange={key => history.push('/' + key)}
  >
    {Object.keys(tabMap).map(name => <TabPane tab={name} key={name} />)}
  </Tabs>;

const routers = Object.keys(tabMap).map(name => ({
  path: '/' + name,
  sidebar: props => <SideBar id={name} {...props} />,
  main: () => tabMap[name],
}));

const Page = props =>
  <Router>
    <div>
      <Route exact path="/" render={() => <Redirect to={Object.keys(tabMap)[0]} />} />
      <div>
        {routers.map(r => <Route key={r.path} path={r.path} component={r.sidebar} />)}
      </div>
      <div>
        {routers.map(r => <Route key={r.path} path={r.path} component={r.main} />)}
      </div>
    </div>
  </Router>;

ReactDom.render(<Page />, document.getElementById('__react'));
