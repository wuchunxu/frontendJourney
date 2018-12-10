import React, { Component } from 'react';
import {
    Drawer, withStyles, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Divider, Paper, CircularProgress, IconButton
} from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconReorder from '@material-ui/icons/Reorder';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import green from '@material-ui/core/colors/green';

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
    }
});

class MyDrawer extends Component {

    /*
        1、属性类型，用来检查使用组件时，是否传入了相关属性，若没有，编译的时候会报错
        2、【代替方案，不推荐】if(onSelectBook)onSelectBook(title)使用时加上判断也是可以的，但是更推荐属性类型检查
        3、属性类型检查是编写健壮纯UI组件的开始，非常重要！
    */
    static propTypes = {
        classes: PropTypes.object.isRequired,
        onSelectBook: PropTypes.func.isRequired,
        article: PropTypes.string,
        loading: PropTypes.bool
    }


    state = {
        drawerOpen: true
    }

    openDrawer = () => this.setState({ drawerOpen: true })
    closeDrawer = () => this.setState({ drawerOpen: false })
    openProfile = () => {
        console.log('open profile')
    }

    render() {
        const { classes, lists, onSelectBook, height, loading, article, selected } = this.props;
        const { drawerOpen } = this.state;
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
                    lists.map(({ title }, i) =>
                        <List key={i}>
                            <ListItem button onClick={() => onSelectBook(title)}>
                                <ListItemText classes={{ primary: title === selected && classes.listItemText }}>{title}</ListItemText>
                            </ListItem>
                        </List>
                    )
                }
            </Drawer>
        );
        const paper = <Paper dangerouslySetInnerHTML={{ __html: article }} className={classes.paper} />;
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