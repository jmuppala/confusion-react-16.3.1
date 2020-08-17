import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

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

export default function MenuList({ dishes, setSelectedDishId }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <GridList cellHeight={240} cols={3} className={classes.gridList}>
            { dishes.map((dish) => (
                <GridListTile key={dish.id} onClick={() => setSelectedDishId(dish.id)}>
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
    </div>
  );
}
