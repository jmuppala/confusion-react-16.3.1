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
import { useParams } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';

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

export default function DishDetail ({ dishes, comments }) {
    const classes = useStyles();

    const { dishId } = useParams();
    let dish = dishes.filter((dish) => dish.id === parseInt(dishId,10))[0];
    let commentList = comments.filter((comment) => comment.dishId === parseInt(dishId,10));

    return(
        <Grid container spacing={2} className={classes.root}>
            <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" component={RouterLink} to="/">
                    Home
                    </Link>
                    <Link color="inherit" component={RouterLink} to="/menu">
                    Menu
                    </Link>
                    <Typography color="textPrimary">{dish.name}</Typography>
                </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4" align='left' component="h4">
                {dish.name}
                </Typography>
            </Grid>
            <DishCard dish={dish} classes={classes} />
            <DishComments comments={commentList} classes={classes} />
        </Grid>
    );
}
