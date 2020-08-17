import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PhoneIcon from '@material-ui/icons/Phone';
import PrintIcon from '@material-ui/icons/Print';
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { NavLink as RouterLink } from 'react-router-dom';

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
  active: {
    backgroundColor: theme.palette.primary.main
  }
}));

function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box bgcolor="primary.light" color="primary.contrastText" p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2} md={1}>
            <List>
                <ListItem button component={RouterLink} to="/home" activeClassName={classes.active}>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={RouterLink} to="/aboutus" activeClassName={classes.active}>
                    <ListItemText primary="About" />
                </ListItem>     
                <ListItem button component={RouterLink} to="/menu" activeClassName={classes.active}>
                    <ListItemText primary="Menu" />
                </ListItem>     
                <ListItem button component={RouterLink} to="/contactus" activeClassName={classes.active}>
                    <ListItemText primary="Contact Us" />
                </ListItem>                  
            </List>
          </Grid>
          <Grid item xs={12} sm={4} md={5}>
            <h4>Our Address</h4>
            <address>
            121, Clear Water Bay Road<br /> Clear Water Bay, Kowloon<br /> HONG KONG<br />
            <PhoneIcon fontSize='small' />: +852 1234 5678<br />
            <PrintIcon fontSize='small' />: +852 8765 4321<br />
            <EmailIcon fontSize='small' />:
            <a href="mailto:confusion@food.net">confusion@food.net</a>
            </address>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" align='center' component="p">
                <IconButton color="inherit" component="a" href="https://www.facebook.com/">
                    <FacebookIcon />
                </IconButton>
                <IconButton color="inherit" component="a" href="https://www.twitter.com/">
                    <TwitterIcon />
                </IconButton>
                <IconButton color="inherit" component="a" href="https://www.linkedin.com/">
                    <LinkedInIcon />
                </IconButton>
                <IconButton color="inherit" component="a" href="https://youtube.com/">
                    <YouTubeIcon />
                </IconButton>
                <IconButton color="inherit" component="a" href="mailto:confusion@food.net">
                    <EmailIcon />
                </IconButton>
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="body2" align='center' component="p">
                © Copyright 2020 Ristorante Con Fusion
                </Typography>
            </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Footer;