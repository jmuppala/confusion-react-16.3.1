import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  media: {
    height: 480,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  }
}));

function DishCard ({ dish, classes }) {

    return(
        <Grid item xs={12} md={6}>
            <Card variant="outlined">
            <CardActionArea>
                <CardMedia
                className={classes.media}
                image={dish.image}
                title={dish.name}
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {dish.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {dish.description}
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
        </Grid>
    );
}

function DishComments({ comments, classes }) {
    return(
        <Grid item xs={12} md={6}>
            <Typography variant="h6" className={classes.title}>
                Comments
            </Typography>
            <List>
              {comments.map((comment) => (
                <ListItem key={comment.id} >
                    <ListItemText
                    primary={comment.comment}
                    secondary={<>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))} </> }
                    />
                </ListItem>                  
              ))}
            </List>
        </Grid>
    );
}

export default function DishDetail ({ dishes, selectedDishId }) {
    const classes = useStyles();

    const dish = dishes.filter((dish) => dish.id === selectedDishId)[0];

    return(
        <Grid container spacing={2} className={classes.root}>
            <DishCard dish={dish} classes={classes} />
            <DishComments comments={dish.comments} classes={classes} />
        </Grid>
    );
}
