import React, { Component } from 'react';
// import GuttersGrid from './components/GuttersGrid';
import MyHeader from './components/MyHeader';
import MyPaper from './components/MyPaper';
import fetch from 'isomorphic-fetch';
import './App.css';
// import { Grid, Button, List, ListItemText, ListItem, CircularProgress, Drawer, withStyles } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import MyDrawer from './components/MyDrawer';
import { markdown2html } from './util';

const books = ['HTML5', 'React', 'Markdown', 'Material-UI','微信小程序','正则表达式','JS性能优化'];


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            article: '',
            books: books,
            current: 'React',
            loading: false,
            innerHeight:800
        };
        this.update = this.update.bind(this);
        this.setHeight = this.setHeight.bind(this);
    }

    componentWillMount() {
        this.setHeight();
        this.update();
        window.onresize = this.setHeight;
    }

    componentWillUnmount(){
        window.onresize = null;
    }

    setHeight(){
        this.setState({
            innerHeight:window.innerHeight
        })
    }

    update(book="React") {
        this.setState({ loading: true });
        // fetch(`/article?src=${encodeURIComponent(book)}`, {
        //     'Content-Type': 'text/html'
        // })
            // fetch(`resources/${encodeURIComponent(book)}.md`)
            fetch(`resources/${book}.md`)
            .then(res =>res.text())
            .then(data=>markdown2html(data))
            .then(data => this.setState({ article: data, loading: false }))
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
