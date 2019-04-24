import React from 'react';
import { CardMedia, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core';
import { ArrowBackRounded } from '@material-ui/icons';

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
        </React.Fragment>
    );
}

export default Results;