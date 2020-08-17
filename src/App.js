import React, { useState } from 'react';
import NavBar from './components/NavBar';
import MenuList from './components/MenuComponent';
import DishDetail from './components/DishDetailComponent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { DISHES } from './shared/dishes';

function App() {

  const [selectedDishId, setSelectedDishId] = useState(null);

  const dishes = DISHES;

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container fixed>
        <MenuList dishes={dishes} setSelectedDishId={setSelectedDishId} />
        {(selectedDishId !== null) ? <DishDetail dishes={dishes} selectedDishId={selectedDishId} /> : null }
      </Container>
    </>
  );
}

export default App;
