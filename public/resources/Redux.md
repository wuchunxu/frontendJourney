# Redux

## 使用Redux
### 安装依赖包
```
npm i redux --save
npm i react-redux --save
```
## Redux的原理
### State
在Redux中，所有的状态统一放在单个不可变对象中，构成一个状态树。不可变意味着，任意更新都是基于新对象，再将新对象赋值给状态树。
以下`initialState`是该笔记的初始化数据，一个state树。
```
const initialState = {
    directory:{
        books: [
            { title: 'Git', icon: '' },
            { title: 'HTML5', icon: '' },
            { title: 'React', icon: '' },
            { title: 'Redux', icon: '' },
            { title: 'Markdown', icon: '' },
            { title: 'Material-UI', icon: '' },
            { title: '微信小程序', icon: '' },
            { title: '正则表达式', icon: '' },
            { title: 'JS性能优化', icon: '' }
        ],
        selected:'Git'
    },
    article:'',
    loading:false
}
```
### Reducer
将所有的`reducer`放在一个js文件中，然后导出：
```
// 具体的、小reducer(leaf)
const select = (state = '请从左侧边栏选择笔记', action) => {
    switch (action.type) {
        case 'SELECT_BOOK':return action.title;
        default:return state;
    }
}
// 更大一些的reducer(node)
const directory = (state = {}, action) => {
    switch (action.type) {
        case 'SELECT_BOOK':
            return {
                ...state,
                selected: select(state.selected, action) // 将action转发给select()
            }
        default:
            return state
    }
}
const article = (state = '选择一篇文章', action) => {
    switch (action.type) {
        case 'UPDATE_ARTICLE': return action.article;
        default: return state;
    }
}

const loading = (state = false, { type, loading }) => {
    switch (type) {
        case 'UPDATE_LOADING':
            return loading;
        default: return state;
    }
}

export {
    directory, article, loading
}
```
### Action
action生成器不是必需的，但它可以减少代码重复。
```
// Action 生成器
const selectBook = (title) => {
    return {
        type:'SELECT_BOOK',
        title
    }
}
const updateArticle = (article)=>{
    return {
        type:'UPDATE_ARTICLE',
        article
    }
}
const setLoading = (state)=>{
    return {
        type:'UPDATE_LOADING',
        loading:state
    }
}
export {
    selectBook,updateArticle,setLoading
}
```
### Store
创建store对象，store用来保存state并处理state的更新。
```
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
```
### 使用
> store.getState() //获取状态树
>store.dispatch(action) // 分发action

#### store通过上下文Context传递给子组件
将`store`对象传递给`Provider`，再用`Provider`包装React元素，那么子元素就能通过上下文访问`store`了。
```
import storeFactory from './model/storeFactory';
import { Provider } from 'react-redux';

// 从store工厂获取store
const store = storeFactory();

// 将store传递给Provider，这样store就被添加到上下文中
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
```
#### connect()将state和dispatch映射成属性和回调属性
```
import Drawer from './MyDrawer';
import { selectBook, updateArticle, setLoading } from '../model/actions';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import { markdown2html } from '../util';

const getBookData = (book_title) => {
    return fetch(`resources/${book_title}.md`)
        .then(res => res.text());
}

const mapStateToProps = state => {
    const { directory, article, loading } = state;
    return {
        lists: directory.books,
        selected: directory.selected,
        article,
        loading
    }
}

const mapDispatchToProps = dispatch =>
    ({
        onSelectBook(title) {
            dispatch(selectBook(title));            // 更改选中
            dispatch(setLoading(true));             // 显示Loading图标
            getBookData(title)                      //请求API
                .then(text => markdown2html(text))  // 将markdown转成html
                .then(article => {
                    dispatch(updateArticle(article)) // 更新文章内容
                    dispatch(setLoading(false))      // 隐藏Loading
                })
        }
    })
  
// connect()可以将state映射到组件的属性中；将dispatch()映射成回调属性
const MyDrawer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Drawer)

export {
    MyDrawer
}
```