import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';




const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

function PaperSheet(props) {
    const { classes, article } = props;

    return (
        <div>
            <Paper dangerouslySetInnerHTML={{ __html: article }}>
            </Paper>

            <Button variant="contained" color="primary">contained</Button>
            <Button variant="extendedFab" color="primary">extendedFab</Button>
            <Button variant="fab" color="primary">fab</Button>
            <Button variant="flat" color="primary">flat</Button>
            <Button variant="outlined" color="primary">outlined</Button>
            <Button variant="raised" color="primary">raised</Button>

            <Button variant="contained" color="primary">primary</Button>
            <Button variant="contained" color="default">default</Button>
            <Button variant="contained" color="inherit">inherit</Button>
            <Button variant="contained" color="secondary">secondary</Button>


        </div>
    );
}

PaperSheet.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);