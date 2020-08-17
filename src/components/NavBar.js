import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

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
}));

function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Ristorante Con Fusion
          </Typography>
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