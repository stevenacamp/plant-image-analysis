import React from 'react';
import { Grid, Typography, withStyles, Button } from '@material-ui/core';
import CustomPlant from "../components/customPlant";
import NameDialog from '../components/nameDialog';
import { IdentifyLink } from '../components/navbar';
import { db } from '../config/config';
import DeleteDialog from '../components/deleteDialog';

const styles = {
    padded: {
        paddingBottom: 32
    },
    plantCard: {
        margin: "0 16px 16px 0"
    }
}

class Plants extends React.Component {
    state = {
        loading: true,
        nameDialog: false,
        plants: [],
        confirmDelete: false,
        plantId: undefined
    }

    async componentDidMount() {
        const plants = [];
        const plantDocs = await db.collection("myPlants").orderBy("added").get();
        await Promise.all(plantDocs.docs.map(async doc => {
            let newItem = doc.data();
            newItem.id = doc.id;
            if (newItem.plantRef) {
                const plant = await newItem.plantRef.get();
                newItem.plant = plant.data();
                newItem.plant.id = plant.id
                plants.push(newItem);
            }
        }));
        this.setState({ loading: false, plants });
    }

    savePlantName = async (plantId, newName) => {
        db.collection('myPlants').doc(plantId).update({ name: newName });
    }

    handleEdit = (plantId) => {
        this.setState({ plantId, nameDialog: true });
    }

    cancelEdit = () => {
        this.setState({ plantId: undefined, nameDialog: false });
    }

    saveEdit = async (newName) => {
        await db.collection('myPlants').doc(this.state.plantId).update({ name: newName });
        const plants = [...this.state.plants];
        const plantIndex = plants.findIndex(p => p.id === this.state.plantId);
        const plant = plants.splice(plantIndex, 1)[0];
        plant.name = newName;
        this.setState({ plants: [...plants, plant], plantId: undefined, nameDialog: false })
    }

    handleDelete = (plantId) => {
        this.setState({ plantId, confirmDelete: true });
    }

    cancelDelete = () => {
        this.setState({ plantId: undefined, confirmDelete: false });
    }

    confirmDelete = async () => {
        await db.collection('myPlants').doc(this.state.plantId).delete();
        const plants = [...this.state.plants];
        const plantIndex = plants.findIndex(p => p.id === this.state.plantId);
        plants.splice(plantIndex, 1);

        this.setState({ plantId: undefined, confirmDelete: false, plants });
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container>
                <Grid item xs={12} className={classes.padded}>
                    <Typography variant="h4">My Plants</Typography>
                </Grid>
                {!this.state.loading &&
                    (this.state.plants.length > 0 ? (
                        this.state.plants.map(p => 
                            <Grid item xs={4} className={classes.plantCard}>
                                <CustomPlant plantId={p.id} name={p.name} image={p.imageUrl} plant={p.plant} handleEdit={() => this.handleEdit(p.id)} handleDelete={() => this.handleDelete(p.id)} />
                            </Grid>
                        )
                    ) : (
                        <React.Fragment>
                            <Grid item xs={12} key="no-plants" style={{ paddingBottom: 16 }}>
                                <Typography variant="body1">You don't have any plants yet! Let's go identify one to get started.</Typography>
                            </Grid>
                            <Grid item xs={12} key="go-identify">
                                <Button variant="contained" color="secondary" component={IdentifyLink}>Identify a Plant</Button>
                            </Grid>
                        </React.Fragment>
                    ))
                }
                <NameDialog open={this.state.nameDialog} handleSave={this.saveEdit} handleCancel={this.cancelEdit} />
                <DeleteDialog open={this.state.confirmDelete} onCancel={this.cancelDelete} onDelete={this.confirmDelete} />
            </Grid>
        );
    }
}

export default withStyles(styles)(Plants);