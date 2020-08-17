import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { DISHES } from '../shared/dishes';

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
  },
  media: {
    height: 480,
  },
}));

function DishCard ({ dish, classes }) {
    return(
      <Card className={classes.root} variant="outlined">
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
    );
}

export default function MenuList() {
  const classes = useStyles();

  const [selectedDish, setSelectedDish] = useState(null);

  const dishes = DISHES;

  return (
    <div className={classes.root}>
        <GridList cellHeight={240} cols={3} className={classes.gridList}>
            { dishes.map((dish) => (
                <GridListTile key={dish.id} onClick={() => setSelectedDish(dish)}>
                    <img src={dish.image} alt={dish.name} />
                    <GridListTileBar
                    title={dish.name}
                    actionIcon={
                        <IconButton aria-label={`info about ${dish.name}`} className={classes.icon}>
                        <InfoIcon />
                        </IconButton>
                    }
                    />
                </GridListTile>
            ))}
        </GridList>
        {selectedDish ? <DishCard dish={selectedDish} classes={classes} /> : null }
    </div>
  );
}
