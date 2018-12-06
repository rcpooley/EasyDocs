import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';

import './css/main.css';

import Pages from '../contentGen/generated';

ReactDOM.render(<Main pages={Pages} />, document.getElementById('root'));
