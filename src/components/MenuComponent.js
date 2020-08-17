import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  }
}));

function MenuItem({ dish }) {
    return(
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={dish.name} src={dish.image} />
            </ListItemAvatar>
            <ListItemText
            primary={dish.name}
            secondary={dish.description}
            />
        </ListItem>
    );
}

export default function MenuList() {
  const classes = useStyles();

  const dishes = [
    {
      id: 0,
      name:'Uthappizza',
      image: 'assets/images/uthappizza.png',
      category: 'mains',
      label:'Hot',
      price:'4.99',
      description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.'                        },
   {
      id: 1,
      name:'Zucchipakoda',
      image: 'assets/images/zucchipakoda.png',
      category: 'appetizer',
      label:'',
      price:'1.99',
      description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce'                        },
   {
      id: 2,
      name:'Vadonut',
      image: 'assets/images/vadonut.png',
      category: 'appetizer',
      label:'New',
      price:'1.99',
      description:'A quintessential ConFusion experience, is it a vada or is it a donut?'                        },
   {
      id: 3,
      name:'ElaiCheese Cake',
      image: 'assets/images/elaicheesecake.png',
      category: 'dessert',
      label:'',
      price:'2.99',
      description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms'                        }
   ];

  return (
    <List className={classes.root}>
        { dishes.map((dish, index) => {
            return (
                <React.Fragment key={dish.id}>
                    <MenuItem dish={dish} />
                    { (index < dishes.length - 1) ?
                        <Divider component="li" />
                        : null
                    }
                </React.Fragment>
            );
        })}
    </List>
  );
}
