import React from 'react';
import NavBar from './components/NavBar';
import MenuList from './components/MenuComponent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container fixed>
        <MenuList />
      </Container>
    </>
  );
}

export default App;
