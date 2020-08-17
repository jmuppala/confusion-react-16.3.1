import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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

    let item = items.filter((item) => item.featured)[0];

    return(
        <Grid item xs={12} md={4}>
            <Card variant="outlined">
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={item.image}
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

export default function Home({ dishes, promotions, leaders }) {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <RenderCard items={dishes} classes={classes} />
            <RenderCard items={promotions} classes={classes} />
            <RenderCard items={leaders} classes={classes} />
        </div>
    );
}
