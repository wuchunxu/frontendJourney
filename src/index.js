import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import storeFactory from './model/storeFactory';

import { Provider } from 'react-redux';

// 从store工厂获取store
const store = storeFactory();

// 将store传递给Provider，这样store就被添加到上下文中
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
