import React, { Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useFeaturedDish, useFeaturedPromotion, useFeaturedLeader, useBaseUrl } from '../State/confusion';
import Loading from './LoadingComponent';

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

function RenderCard ({ item, classes }) {

    const baseUrl = useBaseUrl();

    return(
        <Grid item xs={12} md={4}>
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
        </Grid>
    );
}

function RenderFeaturedDish({ classes }) {
    const dish = useFeaturedDish();

    return(
        <RenderCard item={dish} classes={classes} />
    );
}

function RenderFeaturedPromotion({ classes }) {
    const promotion = useFeaturedPromotion();

    return(
        <RenderCard item={promotion} classes={classes} />
    );
}

function RenderFeaturedLeader({ classes }) {
    const leader = useFeaturedLeader();

    return(
        <RenderCard item={leader} classes={classes} />
    );
}

export default function Home() {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Suspense fallback={<Loading message={'Loading Dish'} />}>
                <RenderFeaturedDish classes={classes} />
            </Suspense>
            <Suspense fallback={<Loading message={'Loading Promotion'} />}>
                <RenderFeaturedPromotion classes={classes} />
            </Suspense>
            <Suspense fallback={<Loading message={'Loading Leader'} />}>
                <RenderFeaturedLeader classes={classes} />
            </Suspense>
        </div>
    );
}
