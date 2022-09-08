import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyRestaurants from './My_Restaurants';
import MyReservations from './My_Reservations';
import { getMyRestaurantThunk } from '../../store/restaurant';
import { Redirect, useHistory } from "react-router-dom";
// import { Modal } from '../context/Modal'
import './my_profile.css';



export default function MyProfile() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const [loaded, setLoaded] = useState(false);
    // const [showModal, setShowModal] = useState();
    // const [resId, setResId] = useState();
    // const [showReservations, setShowReservations] = useState(false);
    const [showProfile, setShowProfile] = useState(true);
    const [showMyRestaurants, setShowMyRest] = useState(false);
    const [showMyReservations, setShowMyReser] = useState(false);
    const [restaurantloaded, setRestaurantLoaded] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const myrestaurants = useSelector(state => state.restaurant.restaurants);

    useEffect(() => {
        dispatch(getMyRestaurantThunk())
    }, [dispatch, myrestaurants, sessionUser, showMyRestaurants])

    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)

    const HandleMyProfile = async e => {
        e.preventDefault();
        setShowProfile(true);
        setShowMyRest(false);
        setShowMyReser(false);
    }
    const HandleMyRestaurants = async e => {
        e.preventDefault();
        setShowProfile(false);
        setShowMyRest(true);
        setShowMyReser(false);
    }
    const HandleMyReservations = async e => {
        e.preventDefault();
        setShowProfile(false);
        setShowMyRest(false);
        setShowMyReser(true);
    }

    if (!sessionUser) {
        history.push('/');
    }

    return sessionUser && (
        <div className='myprofile-container'>
            {/* <div>My profile home</div> */}
            <div className='profile-sidebar'>
                <div>
                    <button onClick={HandleMyProfile}>Profile Summary</button>
                </div>
                <div>
                    <button onClick={HandleMyRestaurants}>My Restaurants</button>
                </div>
                <div>
                    <button onClick={HandleMyReservations}>My Reservations</button>
                </div>
            </div>
            <div className='profile-content'>
                {showMyRestaurants && <MyRestaurants showMyRestaurants={showMyRestaurants} />}
                {showMyReservations && <MyReservations />}
            </div>
        </div >
    )
}
