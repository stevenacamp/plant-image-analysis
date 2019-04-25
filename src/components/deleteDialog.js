import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

class DeleteDialog extends React.Component {
    render() {
        return (
            <Dialog
                open={this.props.open}
            >
                <DialogTitle>Delete Plant</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ paddingBottom: 16}}>
                        Are you sure you would like to delete this plant?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onCancel}>Cancel</Button>
                    <Button onClick={this.props.onDelete} color="primary">Delete</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default DeleteDialog;