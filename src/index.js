import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import "./css/common.css";
import "./css/componets.css";

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import Mobile from './entries/pc/index';
document.title="Shopping System";

ReactDOM.render(
  <React.StrictMode>
    <Mobile />
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
