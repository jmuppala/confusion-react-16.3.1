import React from 'react';
import NavBar from './components/NavBar';
import Home from './components/HomeComponent';
import About from './components/AboutComponent';
import MenuList from './components/MenuComponent';
import DishDetail from './components/DishDetailComponent';
import Contact from './components/ContactComponent';
import Footer from './components/FooterComponent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useDishes, useComments, usePromotions, useLeaders } from './State/confusion';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';

function App() {

  const [dishes] = useDishes();
  const [comments, addComment, postFeedback] = useComments();
  const [promotions] = usePromotions();
  const [leaders] = useLeaders();

  let location = useLocation();

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Container fixed>
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={300}>
            <Switch>
              <Route exact path='/home'>
                <Home dishes={dishes} promotions={promotions} leaders={leaders} />
              </Route>
              <Route exact path='/aboutus'>
                <About leaders={leaders} />
              </Route>
              <Route exact path='/menu'>
                <MenuList dishes={dishes} />
              </Route>
              <Route path='/menu/:dishId'>
                <DishDetail dishes={dishes} comments={comments} addComment={addComment} />
              </Route>
              <Route exact path='/contactus'>
                <Contact postFeedback={postFeedback} />
              </Route>
              <Redirect to='/home' />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Container>
      <Footer />
    </>
  );
}

export default App;
