import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Modal } from '../context/Modal'
import { getAllReservationsThunk } from '../../store/reservation';

function ReservationDetails() {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const therestaurant = useSelector(state => state.restaurant.restaurant)
    const reservations = useSelector(state => state.reservation.reservations)
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState();
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllReservationsThunk(restaurantId)).then(() => setLoaded(true))
    }, [dispatch])

    // console.log('reservations detail is --', reservations)
    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)

    return loaded && (
        <div className='business-reservation-container'>
            <div className='b-reservation-left'>
                <h3>I want a calendar here</h3>
            </div>
            <div className='b-reservation-right'>
                {reservations?.map(reservation => {
                    return <div className='b-reservation-each'>
                        <div>Customer Name: {reservation.user.username}</div>
                        <div>Reserved At: {reservation.created_at}</div>
                        <div>Reserve Date/Time: {reservation.reserve_datetime}</div>
                        <div>Party Size: {reservation.party_size}</div>
                        <div>Occasion: {reservation.occasion}</div>
                        <div>Special Request: {reservation.special_request}</div>

                    </div>
                })}
            </div>
        </div>
    )
}

export default ReservationDetails;
