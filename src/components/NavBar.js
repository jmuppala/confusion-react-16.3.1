import React from 'react';
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

function NavBar(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

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
              </List>
            </Drawer>
          </Hidden>
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