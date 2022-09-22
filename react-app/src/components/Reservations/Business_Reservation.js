import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getAllReservationsThunk } from '../../store/reservation';
import './business_reservations.css'

function ReservationDetails({ showModal }) {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    // const therestaurant = useSelector(state => state.restaurant.restaurant)
    const reservations = useSelector(state => state.reservation.reservations)
    // const sessionUser = useSelector(state => state.session.user);
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllReservationsThunk(restaurantId)).then(() => setLoaded(true))
    }, [dispatch, showModal,restaurantId])

    // console.log('reservations detail is --', reservations)
    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)

    return loaded && (
        <div className='business-reservation-container'>
            <div className='b-reservation-left'>
            </div>
            <div className='b-reservation-right'>
                <h3>You have {reservations?.length} reservation(s)</h3>
                {reservations?.length > 0 && reservations?.map(reservation => {
                    return <div className='b-reservation-each'>
                        <div>Customer Name: {reservation.user.username}</div>
                        <div>Reserve Date: {reservation.reserve_datetime.slice(0, 16)}</div>
                        <div>Reserve Time: {reservation.reserve_datetime.slice(16, 22)}</div>
                        <div>Party Size: {reservation.party_size}</div>
                        <div>Occasion: {reservation.occasion}</div>
                        <div>Special Request: {reservation.special_request}</div>
                        <div>Reserved At: {reservation.created_at.slice(0, 16)}</div>

                    </div>
                })}
            </div>
        </div>
    )
}

export default ReservationDetails;
