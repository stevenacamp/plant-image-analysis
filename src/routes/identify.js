import React from 'react';
import { Card, Grid, Typography } from '@material-ui/core';
import Results from './identify/results';
import Upload from "./identify/upload";

class Identify extends React.Component {
    state = {
        card: 'upload'
    };

    submitImage = () => {
        this.setState({ card: 'results' });
    }

    handleBack = () => {
        this.setState({ card: 'upload' })
    }

    render () {
        return (
            <div>
                <Typography variant="h3">Plant Image Analysis</Typography>
                <Grid container justify="center" style={{ paddingTop: 24 }}>
                    <Grid item xs={4}>
                        <Card>
                            {this.state.card === 'upload' ? <Upload submitImage={this.submitImage} /> : <Results handleBack={this.handleBack} />}
                        </Card>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Identify;