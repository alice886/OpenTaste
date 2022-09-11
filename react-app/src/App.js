import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TopBar from './components/TopBar';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './components/Restaurants/Home';
import RestaurantDetails from './components/Restaurants/Restaurant_Details'
import ListNewRestaurant from './components/Restaurants/Restaurant_Create'
// import MyProfileRestaurants from './components/MyProfile/index_myrestaurants'
// import MyProfileReservations from './components/MyProfile/index_myreservations'
import MyRestaurants from './components/MyProfile/My_Restaurants'
import MyReservations from './components/MyProfile/My_Reservations'
import ProtectedRoute from './components/auth/ProtectedRoute';
import MyProfile from './components/MyProfile/index';
import User from './components/User';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
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
      <TopBar />
      <NavBar />
      <Switch>
        <ProtectedRoute path='/myprofile' exact={true} >
          <MyProfile />
        </ProtectedRoute>
        <Route path='/myrestaurants' exact={true} >
          <MyRestaurants />
        </Route>
        <Route path='/myreservations' exact={true}>
          <MyReservations />
        </Route>
        <Route path='/' exact={true}>
          <Home />
        </Route>
        <Route path='/restaurants/:restaurantId' >
          <RestaurantDetails />
        </Route>
        <Route path='/listnewrestaurant' exact={true} >
          <ListNewRestaurant />
        </Route>
        <Route path='*' >
          <div className='pagenotfound'>404 Page not Foud - Please Try Another URL</div>
        </Route>
        {/* <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        {/* <ProtectedRoute path='/myhomepage' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute> */}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
