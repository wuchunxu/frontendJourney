import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
//定义样式参数
const drawerWidth = 300;
const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  }
};
const primary = green[500];
class SimpleAppBar extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
    }

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="fixed" color="primary" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="title" style={{color:green[500]}}>
                        笔记
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}




export default withStyles(styles)(SimpleAppBar);