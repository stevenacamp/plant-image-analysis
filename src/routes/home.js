import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';

const IdentifyLink = props => <NavLink {...props} to="/identify" />

export default class login extends Component {
  render () {
    return (
        <div>
            <Typography variant="h3">Welcome!</Typography>
            <Button variant="contained" color="secondary" component={IdentifyLink}>Identify a Plant</Button>
        </div>
    )
  }
}