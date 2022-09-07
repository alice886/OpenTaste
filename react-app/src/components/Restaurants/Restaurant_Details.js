import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Modal } from '../context/Modal'
import { getRestaurantDetailThunk } from '../../store/restaurant';
import EditRestaurant from '../Restaurants/Restaurant_Edit'
import ReservationDetails from '../Reservations/Business_Reservation'
import MakeReservation from '../Reservations/Reservation_Create'
import './restaurant_details.css'

function RestaurantDetails() {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const therestaurant = useSelector(state => state.restaurant.restaurant)
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState();
    const [loaded, setLoaded] = useState(false)
    const [showReservations, setShowReservations] = useState(false);
    const [buttontitle, setButtontitle] = useState('See Reservations');

    useEffect(() => {
        dispatch(getRestaurantDetailThunk(restaurantId)).then(() => setLoaded(true))
    }, [dispatch, showModal])

    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)

    const handleEdit = (e, id) => {
        e.preventDefault();
        setShowModal(true);
    }

    const reservationToggle = e => {
        e.preventDefault();
        setShowReservations(true)
        // buttontitle === 'See Reservations' ? setButtontitle('Hide Reservations') : setButtontitle('See Reservations')
    }

    const overviewToggle = e => {
        e.preventDefault();
        setShowReservations(false)
    }

    const userCheck = therestaurant?.owner_id === sessionUser?.id
    const dollarSigns = ['', '$', '$$', '$$$', '$$$$'];

    return loaded && (
        <>
            <img className='restaurant-detail-cover' src={therestaurant.cover} height={'300px'} />
            <div className='restaurant-all-container'>
                <div className='res-left-container'>
                    <div className='res-left-name'>{therestaurant.name}</div>
                    <div className='res-left-toggle'>
                        <button className='res-left-toggle-button' onClick={overviewToggle}>Overview</button>
                        {userCheck && (
                                <button className='res-left-toggle-button' onClick={reservationToggle}>{buttontitle}</button>
                        )}
                    </div>
                    {showReservations ? < ReservationDetails showModal={showModal}/> : (
                        <>
                            <div className='res-left-info'>
                                <div>{dollarSigns[therestaurant.price_range]} {therestaurant.cuisine}</div>
                                <div>{therestaurant.description}</div>
                            </div>
                            <div className='res-right-info'>
                                <div>Address: {therestaurant.address}</div>
                                <div>City: {therestaurant.city}</div>
                                <div>State: {therestaurant.state}</div>
                                <div>Zip code: {therestaurant.zip_code}</div>
                                {/* <div>Capacity:{therestaurant.capacity}</div> */}
                                <div>Open at: {therestaurant.open_time}</div>
                                <div>Close at: {therestaurant.close_time}</div>
                            </div>
                        </>
                    )
                    }
                </div>
                <div className='res-right-container'>
                    {showModal && (<Modal onClose={() => setShowModal(false)}>
                        <EditRestaurant resId={therestaurant.id} showModal={showModal} setShowModal={setShowModal} />
                    </Modal>)}
                    <div className='res-right-container'>
                        <MakeReservation therestaurant={therestaurant} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantDetails;
