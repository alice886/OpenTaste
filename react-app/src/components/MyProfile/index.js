import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { Modal } from '../context/Modal'



export default function MyProfile() {
    const dispatch = useDispatch();
    // const [loaded, setLoaded] = useState(false);
    const [showModal, setShowModal] = useState();
    const [resId, setResId] = useState();
    const [showReservations, setShowReservations] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const myrestaurants = useSelector(state => state.restaurant.restaurants);


    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)



    return sessionUser && (
        <div>
            <h2>My profile home</h2>
        </div >
    )
}
