import React from 'react';
import { Button, CardContent, Grid, IconButton, withStyles } from '@material-ui/core';
import { AddAPhotoRounded } from '@material-ui/icons';
import Dropzone from 'react-dropzone';
import firebase from "firebase";

const styles = {
    submitContainer: {
        paddingTop: 16
    },
    image: {
        paddingTop: 16,
        maxWidth: "100%",
        objectFt: "none", /* Do not scale the image */
        objectPosition: "center", /* Center the image within the element */
    }
};

class Upload extends React.Component {
    state = {
        url: ''
    }

    onDrop = files => {
        const file = files[0];
        const name = (+new Date()) + '-' + file.name;
        const metadata = { contentType: file.type };
        firebase
            .storage()
            .ref("images")
            .child(name)
            .put(file, metadata)
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => this.setState({ url }))
    }

    render() {
        const { classes } = this.props;
        return (
            <CardContent>
                <Grid container justify="center" alignContent="center">
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
                        <Grid item xs={12}>
                            {this.state.url && <img src={this.state.url} alt="plant" className={classes.image} />}
                        </Grid>
                        <Grid item xs={12} container justify="flex-end" className={classes.submitContainer}>
                            <Button onClick={this.props.submitImage} variant="contained" color="primary">Submit</Button>
                        </Grid>
                </Grid>
            </CardContent>
        );
    }
}

export default withStyles(styles)(Upload);