import React, { Component } from 'react';
import { Drawer, withStyles, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Divider, Paper, CircularProgress, IconButton } from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import IconReorder from '@material-ui/icons/Reorder';
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
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        overflow: 'auto',
        padding: theme.spacing.unit * 3,
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
});

class MyDrawer extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    state = {
        drawerOpen: true
    }

    openDrawer = () => this.setState({ drawerOpen: true })
    closeDrawer = () => this.setState({ drawerOpen: false })

    render() {
        const { classes, lists, func, content, height, loading } = this.props;
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
                {/* <List>
                    <ListItem>
                        <ListItemText >
                        </ListItemText>
                    </ListItem>
                </List> */}
                <Divider />
                {
                    lists.map((item, i) =>
                        <List key={i}>
                            <ListItem button onClick={() => func(item)}>
                                <ListItemText>{item}</ListItemText>
                            </ListItem>
                        </List>
                    )
                }
            </Drawer>
        );

        return (
            <div className={classes.appFrame} style={{ height }}>
                <AppBar className={classes.appBar}>
                    <Toolbar
                        disableGutters={!drawerOpen}
                        className={classNames(classes.appBar, {
                            [classes.appBarShift]: drawerOpen,
                        })}
                    >
                        <IconButton color="inherit" onClick={this.openDrawer}
                            className={classNames(drawerOpen && classes.hide)}><IconReorder /></IconButton>
                        <Typography variant="title" color="inherit" noWrap>
                            文章的标题
                        </Typography>
                    </Toolbar>
                </AppBar>
                {drawer}
                <main className={classNames(classes.content, {
                    [classes.contentShift]: drawerOpen,
                })}>
                    {
                        loading ?
                            <div style={{ textAlign: "center" }}><CircularProgress /></div> :
                            <Paper dangerouslySetInnerHTML={{ __html: content }} style={{ backgroundColor: '#F1F8E9' }}></Paper>
                    }

                </main>
            </div>

        );
    }
}
export default withStyles(styles)(MyDrawer);