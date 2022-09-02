import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import Home from './components/Restaurants/Home';
import { Modal } from './components/context/Modal';
import RestaurantDetails from './components/Restaurants/Restaurant_Details'
import ListNewRestaurant from './components/Restaurants/Restaurant_Create'
import MyRestaurants from './components/MyProfile/My_Restaurants'
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignUp] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <Modal onClose={() => setShowLogin(false)}>
            <LoginForm setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
          </Modal>
        </Route>
        <Route path='/sign-up' exact={true}>
          <Modal onClose={() => setShowSignUp(false)}>
            <SignUpForm setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
          </Modal>
        </Route>
        <Route path='/restaurants/:restaurantId' >
          <RestaurantDetails />
        </Route>
        <Route path='/listnewrestaurant' >
          <ListNewRestaurant />
        </Route>
        <Route path='/myrestaurants' >
          <MyRestaurants />
        </Route>
        <Route path='/' exact={true}>
          <Home />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/myhomepage' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
