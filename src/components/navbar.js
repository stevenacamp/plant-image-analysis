import React from 'react';
import classNames from 'classnames';
import { AppBar, Button, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography, withStyles } from '@material-ui/core';
import { ChevronLeftRounded, HomeRounded, ImageSearchRounded, MenuRounded, NaturePeopleRounded } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

export const LoginLink = props => <NavLink {...props} to="/login" />;
export const HomeLink = props => <NavLink {...props} to="/home" />;
export const IdentifyLink = props => <NavLink {...props} to="/identify" />;
export const MyPlantsLink = props => <NavLink {...props} to="/plants" />;

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 32,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 7 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    activeLink: {
        color: theme.palette.primary.main,
        fontWeight: 500
    }
});

class NavBar extends React.Component {
    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                        >
                            <MenuRounded />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap style={{ flexGrow: 1 }}>
                            Plant AI
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftRounded />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button component={HomeLink} activeClassName={classes.activeLink}>
                            <ListItemIcon style={{ color: "inherit" }}>
                                <HomeRounded style={{ height: 40, width: 40 }} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Home"
                                style={{ color: "inherit", fontWeight: "inherit" }}
                                primaryTypographyProps={{ style: { color: "inherit", fontWeight: "inherit" } }}
                            />
                        </ListItem>
                        <ListItem button component={IdentifyLink} activeClassName={classes.activeLink}>
                            <ListItemIcon style={{ color: "inherit" }}>
                                <ImageSearchRounded style={{ height: 40, width: 40 }} />
                            </ListItemIcon>
                            <ListItemText
                                primary="Identify a Plant"
                                style={{ color: "inherit", fontWeight: "inherit" }}
                                primaryTypographyProps={{ style: { color: "inherit", fontWeight: "inherit" }}}
                            />
                        </ListItem>
                        <ListItem button component={MyPlantsLink} activeClassName={classes.activeLink}>
                            <ListItemIcon style={{ color: "inherit" }}>
                                <NaturePeopleRounded style={{ height: 40, width: 40 }} />
                            </ListItemIcon>
                            <ListItemText
                                primary="My Plants"
                                style={{ color: "inherit", fontWeight: "inherit" }}
                                primaryTypographyProps={{ style: { color: "inherit", fontWeight: "inherit" } }}
                            />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(NavBar);