import React from 'react';
import { CardMedia, CardContent, CardHeader, IconButton, Typography } from '@material-ui/core';
import { ArrowBackRounded } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';

function Results(props) {
    return (
        <React.Fragment>
            <CardHeader
                avatar={
                    <IconButton onClick={props.identifyStore.handleBack}><ArrowBackRounded /></IconButton>
                }
            />
            <CardContent>
                <Typography variant="h6">Looks like a plant!</Typography>
            </CardContent>
        </React.Fragment>
    );
}

export default inject('identifyStore')(observer(Results));