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