import React from 'react';
import { Button, CardContent, Grid, IconButton, withStyles } from '@material-ui/core';
import { AddAPhotoRounded } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';
import Dropzone from 'react-dropzone';

const styles = {
    card: { 
        maxWidth: 500
    },
    submitContainer: {
        paddingTop: 16
    }
};

function Upload(props) {
    const { classes, identifyStore } = props;
    return (
        <CardContent>
            <Grid container justify="center" alignContent="center">
                <Dropzone onDrop={identifyStore.setPreview}>
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
                        {identifyStore.showPreview === true ? <img src={identifyStore.image[0]} alt="preview" /> : null}
                    </Grid>
                    <Grid item xs={12} container justify="flex-end" className={classes.submitContainer}>
                        <Button onClick={identifyStore.submitImage} variant="contained" color="primary">Next</Button>
                    </Grid>
            </Grid>
        </CardContent>
    );
}

export default withStyles(styles)(inject('identifyStore')(observer(Upload)));