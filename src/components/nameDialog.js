import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';

class NameDialog extends React.Component {
    state = {
        name: '',
        nameError: false
    }

    handleChange = event => {
        this.setState({ name: event.target.value, nameError: false })
    }

    handleSave = () => {
        if (!this.state.name) {
            this.setState({ nameError: true });
        } else {
            this.props.handleSave(this.state.name);
        }
    }

    handleCancel = () => {
        this.setState({ name: '', nameError: false });
        this.props.handleCancel();
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
            >
                <DialogTitle>Save Plant</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ paddingBottom: 16}}>
                        Give this plant a name to save it into your collection.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        fullWidth
                        required
                        placeholder="New Plant"
                        value={this.state.name}
                        onChange={this.handleChange}
                        label="Plant Name"
                        error={this.state.nameError}
                        helperText={this.state.nameError ? "Required" : ""}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel}>Cancel</Button>
                    <Button onClick={this.handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default NameDialog;