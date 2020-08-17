import React from 'react';
import NavBar from './components/NavBar';
import Home from './components/HomeComponent';
import MenuList from './components/MenuComponent';
import DishDetail from './components/DishDetailComponent';
import Contact from './components/ContactComponent';
import Footer from './components/FooterComponent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { DISHES } from './shared/dishes';
import { COMMENTS } from './shared/comments';
import { PROMOTIONS } from './shared/promotions';
import { LEADERS } from './shared/leaders';
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {

  const dishes = DISHES;
  const comments = COMMENTS;
  const promotions = PROMOTIONS;
  const leaders = LEADERS;

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container fixed>
        <Switch>
          <Route exact path='/home'>
            <Home dishes={dishes} promotions={promotions} leaders={leaders} />
          </Route>
          <Route exact path='/menu'>
            <MenuList dishes={dishes} />
          </Route>
          <Route path='/menu/:dishId'>
            <DishDetail dishes={dishes} comments={comments} />
          </Route>
          <Route exact path='/contactus'>
            <Contact />
          </Route>
          <Redirect to='/home' />
        </Switch>
      </Container>
      <Footer />
    </>
  );
}

export default App;
