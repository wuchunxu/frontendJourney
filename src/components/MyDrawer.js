import React, { Component } from 'react';
import { Drawer, withStyles, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Divider, Paper, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
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
        backgroundColor: theme.palette.background.secondary,
        padding: theme.spacing.unit * 3,
        overflow: 'auto'
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor:green[600]
    }
});

class MyDrawer extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    render() {
        const { classes, lists, func, content, height, loading } = this.props;
        return (
            <div className={classes.appFrame} style={{ height }}>
                <AppBar position="fixed" color="primary" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="title">
                            笔记
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{ paper: classes.drawerPaper }}
                    anchor="left">
                    <List>
                        <ListItem>
                            <ListItemText ><span className="colorful" style={{fontSize:20,fontWeight:400}}>巫春旭的前端笔记</span></ListItemText>
                        </ListItem>
                    </List>
                    <Divider />
                    {
                        lists.map((item,i) =>
                            <List key={i}>
                                <ListItem button onClick={() => func(item)}>
                                    <ListItemText>{item}</ListItemText>
                                </ListItem>
                            </List>
                        )
                    }
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {
                        loading ?
                            <div style={{textAlign:"center"}}><CircularProgress /></div> :
                            <Paper dangerouslySetInnerHTML={{ __html: content }} style={{backgroundColor:'#F1F8E9'}}></Paper>
                    }

                </main>
            </div>

        );
    }
}
export default withStyles(styles)(MyDrawer);