import React from 'react';
import { CardActions, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core';
import { AddRounded, ArrowBackRounded } from '@material-ui/icons';

function Results(props) {
    return (
        <React.Fragment>
            <CardHeader
                avatar={
                    <IconButton onClick={props.handleBack}><ArrowBackRounded /></IconButton>
                }
            />
            <CardContent>
                <Typography variant="h6">Looks like a plant!</Typography>
            </CardContent>
            <CardActions>
                <IconButton>
                    <AddRounded style={{ fontSize: "50px" }} color="secondary" />
                </IconButton>
            </CardActions>
        </React.Fragment>
    );
}

export default Results;