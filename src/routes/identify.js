import React from 'react';
import { Card, Grid, Typography } from '@material-ui/core';
import Results from './identify/results';
import Upload from "./identify/upload";
import { inject, observer } from 'mobx-react';

function Identify(props) {
    const { identifyStore } = props;
    return (
        <div>
            <Typography variant="h3">Plant Image Analysis</Typography>
            <Grid container justify="center" style={{ paddingTop: 24 }}>
                <Grid item xs={4}>
                    <Card>
                        {identifyStore.cardState.get() === 'upload' ? <Upload /> : <Results />}
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default inject('identifyStore')(observer(Identify));