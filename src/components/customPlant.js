import React from 'react';
import { Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography, withStyles } from '@material-ui/core';
import { CloseRounded, EditRounded } from '@material-ui/icons';
import { Light } from "../models/light";

const styles = {
    plantImage: {
        height: 250,
        width: "100%"
    },
}

class CustomPlant extends React.Component {
    render() {
        const { classes, name, image, plant, plantId } = this.props;
        const waterLabel = plant.water === 1
            ? "day"
            : plant.water >= 7 ? Math.ceil(plant.water / 7) + " weeks" : plant.water + " days";

        return (
            <Card>
                <CardHeader
                    action={
                        <React.Fragment>
                            <IconButton key={plantId + "-edit-button"} onClick={this.props.handleEdit}>
                                <EditRounded />
                            </IconButton>
                            <IconButton key={plantId + "-edit-button"} onClick={this.props.handleDelete}>
                                <CloseRounded />
                            </IconButton>
                        </React.Fragment>
                    }
                    title={name}
                    subheader={plant.name + ", " + plant.scientificName}
                />
                <CardMedia
                    className={classes.plantImage}
                    image={image}
                    title={plant.name}
                />
                <CardContent>
                    <Grid container>
                        <Grid item xs={6} style={{ paddingBottom: 16 }}>
                            <Typography variant="body1">Light:</Typography>
                            <Typography variant="caption" className={classes.textSpace}>{Light[plant.light]}</Typography>
                        </Grid>
                        <Grid item xs={6} style={{ paddingBottom: 16 }}>
                            <Typography variant="body1">Water:</Typography>
                            <Typography variant="caption" className={classes.textSpace}>Every {waterLabel}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">Temperature</Typography>
                            <Typography variant="caption" className={classes.textSpace}>{plant.minTemp}F to {plant.maxTemp}F</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(CustomPlant);