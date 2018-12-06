import React, { Component } from 'react';
// import GuttersGrid from './components/GuttersGrid';
// import MyHeader from './components/MyHeader';
// import MyPaper from './components/MyPaper';
import fetch from 'isomorphic-fetch';
import './App.css';
// import { Grid, Button, List, ListItemText, ListItem, CircularProgress, Drawer, withStyles } from '@material-ui/core';
// import purple from '@material-ui/core/colors/purple';
import MyDrawer from './components/MyDrawer';
import { markdown2html } from './util';

const books = ['Git','HTML5', 'React', 'Markdown', 'Material-UI','微信小程序','正则表达式','JS性能优化'];


class App extends Component {

    state = {
        article: '',
        books: books,
        current: 'React',
        loading: false,
        innerHeight:800
    };

    componentWillMount() {
        this.setHeight();
        this.update();
        window.onresize = this.setHeight;
    }

    componentWillUnmount(){
        window.onresize = null;
    }

    setHeight=()=>{
        this.setState({
            innerHeight:window.innerHeight
        })
    }

    update = (book="React")=> {
        this.setState({ loading: true });
            fetch(`resources/${book}.md`,{
                'Content-Type':'text/html;charset=UTF-8'
            })
            .then(res =>res.text())
            .then(data=>markdown2html(data))
            .then(data => {
                this.setState({ article: data, loading: false })
            })
    }
    render() {
        const { article, loading, innerHeight } = this.state;
        return (
            <div>
                <MyDrawer lists={books} func={this.update} content={article} height={innerHeight} loading={loading}/>
            </div>
        );
    }
}

export default App;
