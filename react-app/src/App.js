import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import Home from './components/Restaurants/Home';
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
      <NavBar/>
      <Switch>
        <Route path='/' exact={true}>
          <Home />
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
