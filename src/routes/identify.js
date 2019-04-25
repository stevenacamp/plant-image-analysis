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
                <Grid container justify="center" style={{ paddingTop: 24 }}>
                    <Grid item xs={12}>
                        <Typography variant="h3" style={{ textAlign: "center", paddingBottom: 32 }}>Plant Identification</Typography>
                    </Grid>
                    <Grid item xs={6}>
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