import React, { useState } from 'react';
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
import { useForm, Controller } from "react-hook-form";
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useDishes, useComments} from '../State/confusion';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    media: {
      height: 480,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
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
            <CommentForm classes={classes} />
        </Grid>
    );
}

function CommentForm({ classes }) {

    const { register, handleSubmit, reset, errors, clearErrors, control } = useForm({ mode: 'onChange' });
    const [commentOpen, setCommentOpen] = useState(false);

    const handleCommentSubmit = (data) => {
      alert(JSON.stringify(data));
      reset();
      clearErrors();
      setCommentOpen(false);
    };

    return(
        <div>
            <Button startIcon={<CreateIcon />} variant="outlined" color="inherit" onClick={() => setCommentOpen(true)}>Submit Comment</Button>
            <Dialog open={commentOpen} onClose={() => setCommentOpen(false)} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit(handleCommentSubmit)} >
            <DialogTitle id="form-dialog-title">Submit Comment</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter your rating, name and comment below.
              </DialogContentText>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="rating-label">Rating</InputLabel>
                <Controller
                    as={
                        <Select labelId="rating-label">
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    }
                    name="rating"
                    control={control}
                    defaultValue={1}
                />
              </FormControl>
              <TextField
                autoFocus
                margin="dense"
                id="author"
                label="Name"
                name="author"
                defaultValue=""
                type="text"
                fullWidth
                inputRef={register({
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Must be greater than 2 characters',
                  },
                  maxLength: {
                    value: 15,
                    message: 'Must be 15 characters or less',
                  },
                })}
                error={errors.author?.message.length > 0}
                helperText={errors.author?.message}
              />
              <TextField
                margin="dense"
                id="comment"
                label="comment"
                type="text"
                name="comment"
                defaultValue=""
                fullWidth
                inputRef={register}
                multiline rows={6}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { clearErrors(); setCommentOpen(false)}} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={errors.author?.message.length > 0}>
                Submit
              </Button>
            </DialogActions>
            </form>
          </Dialog>
        </div>
    );
}

export default function DishDetail () {
    const classes = useStyles();

    const { dishId } = useParams();
    let dish = useDishes().filter((dish) => dish.id === parseInt(dishId,10))[0];
    let commentList = useComments().filter((comment) => comment.dishId === parseInt(dishId,10));

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
