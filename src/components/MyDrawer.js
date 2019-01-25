import React, { Component } from 'react';
import {
    Drawer, withStyles, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Divider, Paper, CircularProgress, IconButton, ListItemIcon
} from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconReorder from '@material-ui/icons/Reorder';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import green from '@material-ui/core/colors/green';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Folder from '@material-ui/icons/Folder';
import FolderOpen from '@material-ui/icons/FolderOpen';
import File from '@material-ui/icons/InsertDriveFileOutlined';

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

const drawerWidth = 240;
const styles = theme => ({
    appFrame: {
        // height:800,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth + 'px'
    },
    toolbar: {
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        overflow: 'auto',
        // padding: theme.spacing.unit * 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth
    },
    //导航条
    appBar: {
        backgroundColor: green[600],
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    hide: {
        display: 'none',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px 0 20px',
        ...theme.mixins.toolbar,
        justifyContent: 'space-between',
        position: 'relative'
    },
    grow: {
        flexGrow: 1,
    },
    paper: {
        backgroundColor: '#F1F8E9',
        marginTop: 60
    },
    listItemText: {
        transition: theme.transitions.create('color', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        color: green[500]
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
});

class MyDrawer extends Component {

    /*
        1、属性类型，用来检查使用组件时，是否传入了相关属性，若没有，编译的时候会报错
        2、【代替方案，不推荐】if(onSelectBook)onSelectBook(title)使用时加上判断也是可以的，但是更推荐属性类型检查
    */
    static propTypes = {
        classes: PropTypes.object.isRequired,
        onSelectBook: PropTypes.func.isRequired,
        article: PropTypes.string,
        loading: PropTypes.bool
    }


    state = {
        drawerOpen: true,
        open: [false]
    }

    openDrawer = () => this.setState({ drawerOpen: true })
    closeDrawer = () => this.setState({ drawerOpen: false })
    openProfile = () => {
        console.log('open profile')
    }

    componentDidMount() {
        hljs.initHighlightingOnLoad();
        const { lists } = this.props;
        console.log(lists)
        const folders_length = lists.reduce((counter, { children }) =>
            children ? counter + 1 : counter,
            0);
        // console.log(folders_length)
        // 初始化文件夹的状态，默认全部关闭
        const folders = [];
        for (var i = 0; i < folders_length; i++) {
            folders[i] = false;
        }
        this.setState({
            open: folders
        })
    }
    componentDidUpdate() {
        const codeEle = document.getElementById('code');
        // 着色
        codeEle.querySelectorAll('code').forEach(ele => {
            hljs.highlightBlock(ele);
        });
        codeEle.parentNode.scrollTop = 0;


    }
    handleClick = (index) => {
        const { open } = this.state;
        const isOpen = open[index];
        open[index]=!isOpen;
        this.setState({
            open
        })
    }
    render() {
        const { classes, lists, onSelectBook, height, loading, article, selected } = this.props;
        const { drawerOpen, open } = this.state;
        // 将open数组记录的状态反映到视图上
        // console.log(selected)
        let drawer = (
            <Drawer
                variant="persistent"
                open={drawerOpen}
                classes={{ paper: classes.drawerPaper }}
                anchor="left"
            >
                <div className={classes.drawerHeader}>
                    <span className="colorful" style={{ fontSize: 20, fontWeight: 400 }}>前端之旅</span>
                    <IconButton onClick={this.closeDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                {
                    lists.map(({ title, children }, i) =>
                        <List key={i}>
                            {
                                children ?
                                    <ListItem button onClick={()=>this.handleClick(i)}>
                                        <ListItemIcon>
                                            {open[i] ? <FolderOpen /> : <Folder />}
                                        </ListItemIcon>
                                        <ListItemText classes={{ primary: title === selected && classes.listItemText }} >{title}</ListItemText>
                                        {open[i] ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    :
                                    <ListItem button onClick={() => onSelectBook(title)}>
                                        <ListItemIcon><File /></ListItemIcon>
                                        <ListItemText
                                            classes={{ primary: title === selected && classes.listItemText }}
                                            primary={title}
                                        />
                                    </ListItem>
                            }
                            <Collapse in={open[i]}>
                                {
                                    children && children.map(({ title }, j) =>
                                        <List key={j}>
                                            <ListItem button onClick={() => onSelectBook(title)}
                                                className={classes.nested}
                                            >
                                                <ListItemIcon>
                                                    <File />
                                                </ListItemIcon>
                                                <ListItemText
                                                    classes={{ primary: title === selected && classes.listItemText }}
                                                    primary={title}
                                                />
                                            </ListItem>
                                        </List>
                                    )
                                }
                            </Collapse>
                        </List>

                    )
                }
            </Drawer>
        );

        const paper = <Paper dangerouslySetInnerHTML={{ __html: article }} className={classes.paper} id="code" />;
        return (
            <div className={classes.appFrame} style={{ height }}>
                <AppBar className={classNames(classes.appBar, {
                    [classes.appBarShift]: drawerOpen,
                })}>
                    <Toolbar
                        disableGutters={!drawerOpen}
                        className={classes.appBar}
                    >
                        <IconButton color="inherit" onClick={this.openDrawer}
                            className={classNames(drawerOpen && classes.hide)}><IconReorder /></IconButton>
                        <Typography variant="title" color="inherit" noWrap>
                            {selected}
                        </Typography>
                        {
                            loading ? <CircularProgress color="inherit" size={20} /> : ''
                        }
                        <div className={classes.grow}></div>
                        <div>
                            <IconButton onClick={this.openProfile} color="inherit">
                                <AccountCircle />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {drawer}
                <main className={classNames(classes.content, {
                    [classes.contentShift]: drawerOpen,
                })}>
                    {paper}
                </main>
            </div>

        );
    }
}
export default withStyles(styles)(MyDrawer);