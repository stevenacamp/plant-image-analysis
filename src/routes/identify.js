import React from 'react';
import { Card, Grid, IconButton, Typography, Paper, Table, TableBody, TableHead, TableRow, TableCell, CircularProgress } from '@material-ui/core';
import { OpenInNewRounded } from '@material-ui/icons';
import Results from './identify/results';
import Upload from "./identify/upload";
import { db } from "../config/config";

class Identify extends React.Component {
    state = {
        card: 'upload',
        imageId: '',
        loadingSearches: true,
        searches: undefined
    };

    async componentDidMount() {
        const searches = [];
        const searchDocs = await db.collection("images").orderBy("searchDate").get();
        await Promise.all(searchDocs.docs.map(async doc => {
            let newItem = doc.data();
            newItem.id = doc.id;
            if (newItem.plantRef) {
                const plant = await newItem.plantRef.get();
                newItem.plant = plant.data();
                searches.push(newItem);
            }
        }));
        this.setState({ loadingSearches: false, searches });
    }

    submitImage = (imageId) => {
        this.setState({ card: 'results', imageId });
    }

    handleBack = () => {
        this.setState({ card: 'upload', imageId: '' })
    }

    addSearch = (search) => {
        if (!this.state.searches.some(s => s.id === search.id)) {
            this.setState({ searches: [...this.state.searches, search] });
        }
    }

    render () {
        return (
            <div>
                <Grid container justify="space-between">
                    <Grid item xs={5} style={{ paddingRight: 24 }}>
                        <Grid container justify="center" alignItems="flex-start">
                            <Grid item xs={12}>
                                <Typography variant="h4" style={{ paddingBottom: 32 }}>Plant Identification</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Card>
                                    {this.state.card === 'upload' ? <Upload submitImage={this.submitImage} /> : <Results handleBack={this.handleBack} imageId={this.state.imageId} addSearch={this.addSearch} />}
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={7} style={{ paddingLeft: 24 }}>
                        <Grid container justify="center">
                            <Grid item xs={12}>
                                <Typography variant="h4" style={{ paddingBottom: 32 }}>Previous Searches</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper elevation={1}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Plant Name</TableCell>
                                                <TableCell>Date</TableCell>
                                                <TableCell />
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {this.state.loadingSearches ? (
                                            <TableRow>
                                                <TableCell colSpan={3}>
                                                    <CircularProgress color="secondary" />
                                                </TableCell>
                                            </TableRow>
                                        ) : (this.state.searches.length > 0 ? (
                                                this.state.searches.map(search => (
                                                    <TableRow key={search.id}>
                                                        <TableCell component="th">{search.plant.name}</TableCell>
                                                        <TableCell>{search.searchDate.toDate().toLocaleDateString('en-US')}</TableCell>
                                                        <TableCell>
                                                            <IconButton onClick={e => this.submitImage(search.id)}>
                                                                <OpenInNewRounded />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={3}>No previous searches found</TableCell>
                                                </TableRow>
                                            )
                                        )}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Identify;