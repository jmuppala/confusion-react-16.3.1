import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Home from './components/HomeComponent';
import MenuList from './components/MenuComponent';
import DishDetail from './components/DishDetailComponent';
import Footer from './components/FooterComponent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { DISHES } from './shared/dishes';
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {

  const [selectedDishId, setSelectedDishId] = useState(null);

  const dishes = DISHES;

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container fixed>
        <Switch>
          <Route path='/home'>
            <Home />
          </Route>
          <Route path='/menu'>
            <MenuList dishes={dishes} setSelectedDishId={setSelectedDishId} />
            {(selectedDishId !== null) ? <DishDetail dishes={dishes} selectedDishId={selectedDishId} /> : null }
          </Route>
          <Redirect to='/home' />
        </Switch>
      </Container>
      <Footer />
    </>
  );
}

export default App;
