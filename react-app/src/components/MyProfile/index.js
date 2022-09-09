import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyRestaurants from './My_Restaurants';
import MyReservations from './My_Reservations';
import { getMyRestaurantThunk } from '../../store/restaurant';
import { getMyReservationsThunk } from '../../store/reservation';
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
    const [myrestaurants66, setMyrestaurants66] = useState(false);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getMyRestaurantThunk())
    }, [dispatch, showProfile, sessionUser, showMyRestaurants])

    useEffect(() => {
        // dispatch(getMyReservationsThunk()).then(() => setLoaded(true))
        dispatch(getMyReservationsThunk())
    }, [dispatch, showProfile, sessionUser, showMyReservations])

    const myRestaurants = useSelector(state => state.restaurant.restaurants);
    const myReservations = useSelector(state => state.reservation.reservations);
    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)

    console.log('checkcheck ', myRestaurants?.length)

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
                <div className='profile-tab1'>
                    <button onClick={HandleMyProfile}>Profile Summary</button>
                </div>
                <div className='profile-tab2'>
                    <button onClick={HandleMyRestaurants}>My Restaurants</button>
                </div>
                <div className='profile-tab3'>
                    <button onClick={HandleMyReservations}>My Reservations</button>
                </div>
            </div>
            <div className='profile-content'>
                {showProfile && (<div className='profile-summary'>
                    <div>
                        <h2>{sessionUser.first_name} {sessionUser.last_name}</h2>
                    </div>
                    <div>👤 {sessionUser.username}</div>
                    <div>📧 {sessionUser.email}</div>
                    <br></br>
                    <div className='summary-details'>
                        <div>You have listed {myRestaurants?.length} restaurants</div>
                        <div>You have made {myReservations?.length} reservations</div>
                    </div>
                </div>)}
                {showMyRestaurants && <MyRestaurants showMyRestaurants={showMyRestaurants} />}
                {showMyReservations && <MyReservations />}
            </div>
        </div >
    )
}
