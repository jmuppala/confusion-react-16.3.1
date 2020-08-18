import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import Grow from '@material-ui/core/Grow';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    media: {
      height: 480,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    }
  }));

  function RenderCard ({ items, classes }) {

    if (items.isLoading) {
        return(
            <Grid item xs={12} md={4}>
                <Loading message={'Loading'} />
            </Grid>
        );
    }
    else if (items.errMess !== null) {
        return(
          <Grid item xs={12} md={4}>
            <Typography variant="body1" align='left' component="p">
                {items.errMess}
            </Typography>
          </Grid>
        );
    }
    else if (items.items.length > 0) {
        let item = items.items.filter((item) => item.featured)[0];
        return(
            <Grid item xs={12} md={4}>
                <Grow in={items.items.length > 0} timeout={5000}>
                    <Card variant="outlined">
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image={baseUrl + item.image}
                            title={item.name}
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {item.name}
                            </Typography>
                            {item.designation ? 
                                (<Typography gutterBottom variant="h6" component="h6">
                                    {item.designation}
                                </Typography>
                                ) 
                                : null }
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.description}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grow>
            </Grid>
        );
    }
    else
        return(
            <Grid item xs={12} md={4}>
                <Loading message={'Loading'} />
            </Grid>
        );
}

export default function Home({ dishes, promotions, leaders}) {
    const classes = useStyles();

    return(
        <Grid container spacing={2}>
            <RenderCard items={dishes} classes={classes} />
            <RenderCard items={promotions} classes={classes} />
            <RenderCard items={leaders} classes={classes} />
        </Grid>
    );
}
