import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './src/App';
import './index.css';
import 'antd/dist/antd.min.css';

render(
    <BrowserRouter>
      <App/>
    </BrowserRouter>, document.getElementById('app'));
