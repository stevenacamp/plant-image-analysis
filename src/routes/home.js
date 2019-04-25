import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Grid, Typography, withTheme } from '@material-ui/core';
import { ReactComponent as PlantSVG } from "../icons/plant.svg";

const IdentifyLink = props => <NavLink {...props} to="/identify" />

class Home extends Component {
  render () {
    return (
        <Grid container direction="column" alignItems="center" justify="center">
            <Grid item>
                <PlantSVG height={350} width={350} fill={this.props.theme.palette.primary.dark} style={{ marginTop: 16, marginBottom: -48 }} />
            </Grid>
            <Grid item style={{ paddingBottom: 32 }}>
                <Typography variant="h3" style={{ fontFamily: "Pompiere", fontSize: "4.5rem" }}>PLANT PULSE</Typography>
            </Grid>
            <Grid item>
                <Button variant="contained" color="secondary" component={IdentifyLink}>Identify a Plant</Button>
            </Grid>
        </Grid>
    )
  }
}

export default withTheme()(Home);