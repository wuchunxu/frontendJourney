// storeFactory.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { initialState } from './initialState';
import { directory ,article,loading } from './reducers';

// 中间件
const saver = store => next => action => {
    let result = next(action);
    localStorage['redux-store'] = JSON.stringify(store.getState()); // 存到localStorage
    return result;
}

// store中使用中间件，这样，action触发后，会执行中间件
const storeFactory = (state = initialState) => {
    return applyMiddleware(saver)(createStore)(
        combineReducers({directory,article,loading}),
        (localStorage['redux-store']) ? JSON.parse(localStorage['redux-store']) : state
    );
}
export default storeFactory;