import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyRestaurants from './My_Restaurants';
import { getMyRestaurantThunk } from '../../store/restaurant';
import { Redirect, useHistory } from "react-router-dom";
import './my_profile.css';



export default function MyProfileRestaurants() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getMyRestaurantThunk())
    }, [dispatch, sessionUser])

    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)


    const HandleMyProfile = async e => {
        e.preventDefault();

    }
    const HandleMyRestaurants = async e => {
        e.preventDefault();

    }
    const HandleMyReservations = async e => {
        e.preventDefault();

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
                <MyRestaurants />
            </div>
        </div >
    )
}
