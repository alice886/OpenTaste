import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyReservations from './My_Reservations';
import { getMyReservationsThunk } from '../../store/reservation';
import { Redirect, useHistory } from "react-router-dom";
import './my_profile.css';



export default function MyProfileReservations() {
    const dispatch = useDispatch();
    const history = useHistory();
    // const [showModal, setShowModal] = useState();
    const [showEditReser, setShowEditReser] = useState(false);
    const [showProfile, setShowProfile] = useState(true);

    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getMyReservationsThunk())
    }, [dispatch, showProfile, sessionUser, showEditReser])

    const myReservations = useSelector(state => state.reservation.reservations);
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
                <MyReservations showEditReser={showEditReser} setShowEditReser={setShowEditReser} myReservations={myReservations}/>
            </div>
        </div >
    )
}
