import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink as NavRouterLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    margin: theme.spacing(2)
  },
  drawerPaper: {
    backgroundColor: theme.palette.primary.main
  },
  list: {
    color: theme.palette.primary.contrastText
  },
  active: {
    backgroundColor: theme.palette.primary.dark
  }
}));

function NavBar() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [loginOpen, setLoginOpen] = useState(false);

  const { register, handleSubmit, reset, errors, clearErrors } = useForm({ mode: 'onChange' });

  const handleLoginSubmit = (data) => {
    alert(JSON.stringify(data));
    reset();
    clearErrors();
    setLoginOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Hidden mdUp>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" className={classes.title}>
            Ristorante Con Fusion
          </Typography>
          <Hidden smDown>
            <ButtonGroup variant="text" color="inherit">
              <Button startIcon={<HomeIcon /> } component={NavRouterLink} to="/home" activeClassName={classes.active}>Home</Button>
              <Button startIcon={<InfoIcon />} component={NavRouterLink} to="/aboutus" activeClassName={classes.active}>About Us</Button>
              <Button startIcon={<MenuBookIcon />} component={NavRouterLink} to="/menu" activeClassName={classes.active}>Menu</Button>
              <Button startIcon={<ContactMailIcon />} component={NavRouterLink} to="/contactus" activeClassName={classes.active}>Contact Us</Button>
            </ButtonGroup>
            <Button startIcon={<AccountCircleIcon />} variant="outlined" color="inherit" onClick={() => setLoginOpen(true)}>Login</Button>
          </Hidden>
          <Hidden mdUp implementation="css">
            <Drawer anchor={'top'} open={mobileOpen} onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              onClick={handleDrawerToggle}
            >
              <List classes={{root: classes.list}}>
                <ListItem button component={NavRouterLink} to="/home" activeClassName={classes.active}>
                    <ListItemIcon classes={{root: classes.list}}><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={NavRouterLink} to="/aboutus" activeClassName={classes.active}>
                    <ListItemIcon classes={{root: classes.list}}><InfoIcon /></ListItemIcon>
                    <ListItemText primary="About Us" />
                </ListItem>
                <ListItem button component={NavRouterLink} to="/menu" activeClassName={classes.active}>
                    <ListItemIcon classes={{root: classes.list}}><MenuBookIcon /></ListItemIcon>
                    <ListItemText primary="Menu" />
                </ListItem>
                <ListItem button component={NavRouterLink} to="/contactus" activeClassName={classes.active}>
                    <ListItemIcon classes={{root: classes.list}}><ContactMailIcon /></ListItemIcon>
                    <ListItemText primary="Contact Us" />
                </ListItem>
                <Divider />
                <ListItem button component="a" onClick={() => setLoginOpen(true)}>
                    <ListItemIcon classes={{root: classes.list}}><AccountCircleIcon /></ListItemIcon>
                    <ListItemText primary="Login" />
                </ListItem>
              </List>
            </Drawer>
          </Hidden>
          <Dialog open={loginOpen} onClose={() => setLoginOpen(false)} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit(handleLoginSubmit)} >
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter your username and password here to login to the site.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="username"
                label="Username"
                name="username"
                defaultValue=""
                type="text"
                fullWidth
                inputRef={register({
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username must be at least 3 characters',
                  },
                })}
                error={errors.username?.message.length > 0}
                helperText={errors.username?.message}
              />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                name="password"
                defaultValue=""
                fullWidth
                inputRef={register({
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                error={errors.password?.message.length > 0}
                helperText={errors.password?.message}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { clearErrors(); setLoginOpen(false)}} color="primary">
                Cancel
              </Button>
              <Button
                disabled={errors.username?.message.length > 0 || errors.password?.message.length > 0}
                type="submit" color="primary">
                Login
              </Button>
            </DialogActions>
            </form>
          </Dialog>
        </Toolbar>
      </AppBar>
      <Box bgcolor="primary.light" color="primary.contrastText" p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" className={classes.title}>
                Ristorante Con Fusion
            </Typography>
            <Typography variant="h6" className={classes.title}>
              We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default NavBar;