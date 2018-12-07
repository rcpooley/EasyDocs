import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';

import './css/main.css';

import Pages from './content/index';

ReactDOM.render(<Main pages={Pages} />, document.getElementById('root'));
