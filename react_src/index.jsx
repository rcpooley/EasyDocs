import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';

import './css/main.css';

const PAGES = {injectPagesHere: 'injectPagesHere'};

ReactDOM.render(<Main pages={PAGES} />, document.getElementById('root'));
