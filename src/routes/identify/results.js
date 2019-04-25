import React from 'react';
import { Button, CardContent, CardHeader, CardMedia, CircularProgress, IconButton, Typography, withStyles, Grid } from '@material-ui/core';
import { AddRounded, ArrowBackRounded } from '@material-ui/icons';
import { db } from "../../config/config";
import { Light } from "../../models/light";
import NameDialog from '../../components/nameDialog';

const styles = {
    loadingPage: {
        minHeight: 350,
    },
    plantImage: {
        height: 250,
        width: "100%"
    },
    textSpace: {
        paddingBottom: 16
    },
    addButton: {
        alignSelf: "center",
        padding: "8px 8px 0 0"
    }
}

class Results extends React.Component {
    state = {
        loading: true,
        notFound: false,
        image: '',
        plant: {
            id: '',
            name: '',
            scientificName: '',
            light: undefined,
            water: undefined,
            maxTemp: undefined,
            minTemp: undefined
        },
        nameDialogState: false
    }

    async componentDidMount() {
        await this.getPlant();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.imageId !== this.props.imageId) {
            this.setState({ loading: true }, async () => {
                await this.getPlant();
            });
        }
    }

    addToPlants = () => {
        this.setState({ nameDialogState: true });
    }

    savePlant = async (plantName) => {
        const plantRef = db.collection('plants').doc(this.state.plant.id);
        const plant = {
            name: plantName,
            plantRef,
            imageUrl: this.state.image,
            added: new Date()
        }
        await db.collection('myPlants').add(plant);
        this.setState({ nameDialogState: false });
        window.location.assign("/plants");
    }

    cancelSave = () => {
        this.setState({ nameDialogState: false });
    }

    getPlant = async () => {
        const imageRef = await db.collection('images').doc(this.props.imageId);
        imageRef.onSnapshot(async doc => {
            if (this.state.loading) {
                const data = doc.data();
                data.id = doc.id;
                if (data.labels) {
                    // Get plants to compare names
                    const plantsSnapshot = await db.collection('plants').get();
                    const plants = plantsSnapshot.docs;
                    let plantMatch;
                    data.labels.forEach(async label => {
                        const labelKeys = label.toLowerCase().split(' ');
                        labelKeys.forEach(key => {
                            if (!plantMatch) {
                                plantMatch = plants.find(plant => {
                                    const { name, scientificName } = plant.data();
                                    return name.toLowerCase().includes(key) || scientificName.toLowerCase().includes(key)
                                });
                            }
                        });
                    });
                    if (plantMatch) {
                        this.setState({ loading: false, image: data.url, plant: { ...plantMatch.data(), id: plantMatch.id } })
                        // Get ref to plant match
                        let documentRefString = db.collection('plants').doc(plantMatch.id);
                        let plantRef = db.doc(documentRefString.path);
                        // Add plant ref to image search
                        await db.collection('images').doc(this.props.imageId).update({ plantRef });
                        this.props.addSearch({ ...data, plant: { ...plantMatch.data(), id: plantMatch.id } });
                    } else {
                        this.setState({ loading: false, notFound: true });
                    }
                }
            }
        });
    }

    render() {
        const { classes } = this.props;
        const { plant } = this.state;

        const waterLabel = plant.water === 1
            ? "day"
            : plant.water >= 7 ? Math.ceil(plant.water / 7) + " weeks" : plant.water + " days";

        return this.state.loading ? (
            <CardContent className={classes.loadingPage}>
                <Grid container alignItems="center" justify="center" style={{ height: "100%" }}>
                    <Grid item>
                        <CircularProgress color="secondary" />
                    </Grid>
                </Grid>
            </CardContent>
        ) : (
            <React.Fragment>
                <CardHeader
                    classes={{ action: classes.addButton }}
                    avatar={
                        <IconButton onClick={this.props.handleBack}><ArrowBackRounded /></IconButton>
                    }
                    action={
                        <Button variant="contained" color="secondary" onClick={this.addToPlants}>
                            Add to My Plants
                            <AddRounded style={{ marginLeft: 8 }} />
                        </Button>
                    }
                />
                <CardMedia
                    className={classes.plantImage}
                    image={this.state.image}
                    title={plant.name}
                />
                <CardContent>
                    {this.state.notFound ? (
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h5">Plant Not Found</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1">We're sorry, that plant could not be identified at this time. Please try again with a different image.</Typography>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h5">{plant.name}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="caption" className={classes.textSpace}>{plant.scientificName}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">Light:</Typography>
                                <Typography variant="caption" className={classes.textSpace}>{Light[plant.light]}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body1">Water:</Typography>
                                <Typography variant="caption" className={classes.textSpace}>Every {waterLabel}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body1">Temperature</Typography>
                                <Typography variant="caption" className={classes.textSpace}>{plant.minTemp}F to {plant.maxTemp}F</Typography>
                            </Grid>
                        </Grid>
                    )}
                </CardContent>
                <NameDialog open={this.state.nameDialogState} handleSave={this.savePlant} handleCancel={this.cancelSave} />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Results);