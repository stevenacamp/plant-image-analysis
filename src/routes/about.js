import React, { Component } from 'react';
import { Button, Grid, Typography, withStyles } from '@material-ui/core';
import { ReactComponent as GithubSVG } from "../icons/github.svg";

const GithubLink = props => <a {...props} href="https://github.com/stevenacamp/plant-image-analysis" target="_blank" />;
const FontAwesomeLink = props => <a {...props} href="https://fontawesome.com/license" target="_blank" />;

const styles = {
    default: {
        paddingBottom: 16
    },
    dense: {
        paddingBottom: 8
    },
    extra: {
        paddingBottom: 64
    }
}

class About extends Component {
    render () {
        const { classes } = this.props;
        return (
            <Grid container>
                <Grid item xs={12} className={classes.default}>
                    <Typography variant="h4">About</Typography>
                </Grid>
                <Grid item xs={12} className={classes.dense}>
                    <Typography variant="body1">This app was created for a final project in CSCI 48900, Data Science</Typography>
                </Grid>
                <Grid item xs={12} className={classes.default}>
                    <Typography variant="body1">Made by Steven Camp, Nathalie Kroeker, and Trent Spice.</Typography>
                </Grid>
                <Grid item xs={12} className={classes.extra}>
                    <Button component={GithubLink} style={{ textTransform: "none" }}>
                        <GithubSVG height={24} width={24} style={{ marginRight: 16 }} />
                        https://github.com/stevenacamp/plant-image-analysis
                    </Button>
                </Grid>
                <Grid item xs={12} className={classes.default}>
                    <Typography variant="h4">Attributions</Typography>
                </Grid>
                <Grid item xs={12} className={classes.dense}>
                    <Typography variant="caption" style={{ display: "inline" }}>Some icons used were provided by FontAwesome.com</Typography>
                    <Button component={FontAwesomeLink}>License</Button>
                </Grid>
                <Grid item xs={12} className={classes.dense}>
                    <Typography variant="caption">Home page icon is Plant by ibrandify from the Noun Project</Typography>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(About);