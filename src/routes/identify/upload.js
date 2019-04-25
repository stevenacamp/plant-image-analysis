import React from 'react';
import { Button, CardContent, Grid, IconButton, withStyles } from '@material-ui/core';
import { AddAPhotoRounded } from '@material-ui/icons';
import FileUploader from 'react-firebase-file-uploader';
import firebase from "firebase";

const styles = {
    submitContainer: {
        paddingTop: 16
    }
};

class Upload extends React.Component {
    state = {
        url: ''
    }

    async handleUploadSuccess (filename) {
        try {
            let { bucket, fullPath } = await firebase.storage().ref('images').child(filename).getMetadata();
            console.log('bucket', bucket);
            console.log('fullPath', fullPath);
            let downloadUrl = await firebase.storage().ref('images').child(filename).getDownloadURL();
            console.log('downloadURL', downloadUrl);

            let newImage = {
                url: downloadUrl,
                bucket,
                fullPath
            }

            console.log('newImage', newImage);

            await firebase.firestore().collection('images').add(newImage);
        }

        catch(err) {
            console.error(err);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <CardContent>
                <Grid container justify="center" alignContent="center">
                    {this.state.url && <img src={this.state.url} alt="plant" />}
                    
                    <label>
                    <AddAPhotoRounded style={{ height: 150, width: 150 }} color="secondary" />
                    <FileUploader
                                hidden
                                accept="image/*"
                                storageRef={firebase.storage().ref('images')}
                                onUploadStart={this.handleUploadStart}
                                onUploadError={this.handleUploadError}
                                onUploadSuccess={this.handleUploadSuccess}
                                onProgress={this.handleProgress}
                        />
                    </label>

                    <Grid item xs={12} container justify="flex-end" className={classes.submitContainer}>
                        <Button onClick={this.props.submitImage} variant="contained" color="primary">Next</Button>
                    </Grid>
                </Grid>
            </CardContent>
        );
    }
}

export default withStyles(styles)(Upload);