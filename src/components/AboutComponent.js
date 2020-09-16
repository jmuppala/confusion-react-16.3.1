import React, { Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { useLeaders, useBaseUrl } from '../State/confusion';
import Loading from './LoadingComponent';
import { ErrorBoundary } from "react-error-boundary";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    gridList: {
      width: 1080,
      height: 500,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    }
  }));

function LeaderList() {

    const leaders = useLeaders();
    const baseUrl = useBaseUrl();

    return (
        <List>
            { leaders.map((leader, index) => (
                <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={leader.name} src={baseUrl + leader.image} />
                        </ListItemAvatar>
                        <ListItemText
                        primary={leader.name}
                        secondary={leader.description}
                        />
                    </ListItem>
                    {(index < leaders.length - 1) ? <Divider /> : null }
                </React.Fragment>
            ))}
        </List>
    );
}

export default function About() {
  const classes = useStyles();

    return(
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" component={RouterLink} to="/">
                        Home
                    </Link>
                    <Typography color="textPrimary">About Us</Typography>
                    </Breadcrumbs>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" align='left' component="h4">
                    About Us
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5" align='left' component="h5">
                    Our History
                    </Typography>
                    <Typography variant="body1" align='left' component="p">
                    Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.
                    The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h6" align='left' component="h6">
                            Facts At a Glance
                            </Typography>
                            <Table>
                                <TableBody>
                                <TableRow>
                                <TableCell align='right'>Started</TableCell>
                                <TableCell align='left'>3 Feb. 2013</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell align='right'>Major Stake Holder</TableCell>
                                <TableCell align='left'>HK Fine Foods Inc.</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell align='right'>Last Year's Turnover</TableCell>
                                <TableCell align='left'>$1,250,375</TableCell>
                                </TableRow>
                                <TableRow>
                                <TableCell align='right'>Employees</TableCell>
                                <TableCell align='left'>40</TableCell>
                                </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="body1" align='left' component="p">
                            You better cut the pizza in four pieces because
                            I'm not hungry enough to eat six.
                            </Typography>
                            <Typography variant="body2" align='right' component="p">
                            -- Yogi Berra, The Wit and Wisdom of Yogi Berra, P. Pepe, Diversion Books, 2014.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" align='left' component="h5">
                    Corporate Leadership
                    </Typography>
                    <ErrorBoundary
                        fallbackRender={({error, componentStack, resetErrorBoundary}) => (
                        <div role="alert">
                            <Typography variant="h5" align='left' component="h5">
                            Error
                            </Typography>
                            <Typography variant="body1" align='left' component="p">
                            {error.message}
                            </Typography>
                        </div>
                        )}
                    >                    
                        <Suspense fallback={<Loading message={'Loading Leaders'} />}>
                            <LeaderList />
                        </Suspense>
                    </ErrorBoundary>
                </Grid>
            </Grid>
        </div>
    );
}
