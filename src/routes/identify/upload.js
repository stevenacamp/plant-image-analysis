import React from 'react';
import { Button, CardContent, Grid, IconButton, Typography, withStyles } from '@material-ui/core';
import { AddAPhotoRounded, CloseRounded } from '@material-ui/icons';
import { db, storage } from "../../config/config";
import Dropzone from 'react-dropzone';

const styles = {
    submitContainer: {
        paddingTop: 16
    },
    image: {
        paddingTop: 16,
        maxWidth: "100%",
        maxHeight: 250,
        objectFit: "none", /* Do not scale the image */
        objectPosition: "center", /* Center the image within the element */
    }
};

class Upload extends React.Component {
    state = {
        hasImage: false,
        url: '',
        fileTitle: '',
        fileNameFull: '',
        submitting: false,
    }

    componentDidMount() {
        // Check for uploaded image if page refreshes
        window.addEventListener('beforeunload', this.clearBeforeExiting);
    }

    async componentWillUnmount() {
        // Check for uploaded image if component unmounts but also remove the event listener so it won't be called later
        await this.clearBeforeExiting();
        window.removeEventListener('beforeunload', this.clearBeforeExiting);
    }

    clearBeforeExiting = async () => {
        // If there's still an image and it isn't unmounting by submitting, remove the image
        if (!this.state.submitting && this.state.hasImage) {
            await this.deleteImage();
        }
    }

    onDrop = async files => {
        try {
            // If there's already an image uploaded, delete it before adding the new one
            if (this.state.hasImage) {
                await this.deleteImage();
            }
            const file = files[0];
            const fileName = (new Date()).toISOString() + '-' + file.name;
            const metadata = { contentType: file.type };
            await storage
                .ref("images")
                .child(fileName)
                .put(file, metadata);
            const url = await storage.ref('images').child(fileName).getDownloadURL();
            this.setState({ hasImage: true, url, fileTitle: file.name, fileNameFull: fileName });
        } catch(err) {
            console.log(err);
        }
    }

    /** Helper method to handle deleting whatever file is in state right now */
    deleteImage = async () => {
        const { fileNameFull } = this.state;
        await storage.ref('images').child(fileNameFull).delete();
    }

    /** Method to remove uploaded file being previewed */
    cancelUpload = async () => {
        await this.deleteImage();
        this.setState({ hasImage: false, url: '', fileTitle: '', fileNameFull: '' });
    }

    /** Method to handle submitting the previewed image and adding it to the database */
    handleSubmit = async () => {
        const { fileNameFull } = this.state;
        let { bucket, fullPath } = await storage.ref('images').child(fileNameFull).getMetadata();
        const url = await storage.ref('images').child(fileNameFull).getDownloadURL();
        const newImage = { url, bucket, fullPath, searchDate: new Date() };
        const newImageFull = await db.collection('images').add(newImage);
        this.setState({ submitting: true }, () => {
            this.props.submitImage(newImageFull.id);
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <CardContent>
                <Grid container justify="center" alignContent="center">
                    <Grid item xs={12} container justify="flex-end" className={classes.submitContainer}>
                        <Button onClick={this.handleSubmit} variant="contained" color="primary" disabled={!this.state.hasImage}>Submit</Button>
                    </Grid>
                    {!this.state.hasImage &&
                        <Dropzone onDrop={this.onDrop}>
                            {({ getRootProps, getInputProps }) => (
                                <div
                                    {...getRootProps({
                                        style: {
                                            width: 'fit-content',
                                            borderRadius: '50%'
                                        }
                                    })}
                                >
                                    <input {...getInputProps()} />
                                    <IconButton style={{ padding: 32, border: "2px solid #ffc400" }}>
                                        <AddAPhotoRounded style={{ height: 150, width: 150 }} color="secondary" />
                                    </IconButton>
                                </div>
                            )}
                        </Dropzone>
                    }
                    {this.state.hasImage &&
                        <Grid item xs={12} container justify="space-between" alignItems="center">
                            <Grid item>
                                <Typography variant="body1">{this.state.fileTitle}</Typography>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={this.cancelUpload}>
                                    <CloseRounded />
                                </IconButton>
                            </Grid>
                        </Grid>
                    }
                    {this.state.hasImage &&
                        <Grid item xs={12} container justify="center">
                            <img src={this.state.url} alt="plant" className={classes.image} />
                        </Grid>
                    }
                </Grid>
            </CardContent>
        );
    }
}

export default withStyles(styles)(Upload);