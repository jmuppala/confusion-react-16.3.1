import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    }
  }));

export default function Home() {
    const classes = useStyles();

    return(
      <div className={classes.root}>
        <h4>Home</h4>
      </div>
    );
}
