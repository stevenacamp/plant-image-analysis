import React from 'react';
import './App.css';
import { theme } from "./createTheme";
import { AppBar, Button, IconButton, MuiThemeProvider, Toolbar, Typography } from '@material-ui/core';
import { MenuRounded } from "@material-ui/icons";

function App(props) {
  return (
      <MuiThemeProvider theme={theme}>
        <AppBar>
            <Toolbar>
                <IconButton color="inherit" aria-label="menu" style={{ marginLeft: -12, marginRight: 20 }}>
                    <MenuRounded />
                </IconButton>
                <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                    Plant Image Analysis
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
            {props.children}
      </MuiThemeProvider>
  );
}

export default App;
