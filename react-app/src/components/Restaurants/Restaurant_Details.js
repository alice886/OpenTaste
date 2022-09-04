import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Modal } from '../context/Modal'
import { getRestaurantDetailThunk } from '../../store/restaurant';
import EditRestaurant from '../Restaurants/Restaurant_Edit'
import ReservationDetails from '../Reservations/Business_Reservation'

function RestaurantDetails() {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const therestaurant = useSelector(state => state.restaurant.restaurant)
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState();
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(getRestaurantDetailThunk(restaurantId)).then(() => setLoaded(true))
    }, [dispatch, showModal])

    // console.log('therestaurant id is --', restaurantId)
    // console.log('therestaurant detail is --', therestaurant)
    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)
    const handleEdit = (e, id) => {
        e.preventDefault();
        setShowModal(true);
    }

    const userCheck = therestaurant?.owner_id === sessionUser?.id

    const dollarSigns = ['', '$', '$$', '$$$', '$$$$'];

    return loaded && (
        <>
            {userCheck && (
                <div>
                    <button>Check Reservations</button>
                    <ReservationDetails />
                </div>
            )}
            <div className='res-left-container'>
                <div className='res-left-name'>{therestaurant.name}</div>
                <img src={therestaurant.cover} height={'300px'} />
                <div className='res-left-info'>
                    <div>Price range: {dollarSigns[therestaurant.price_range]}</div>
                    <div>Cuisine: {therestaurant.cuisine}</div>
                </div>
                <div className='res-left-des'>description: {therestaurant.description}</div>
                <div className='res-right-info'>
                    <div>Address:{therestaurant.address}</div>
                    <div>City:{therestaurant.city}</div>
                    <div>State:{therestaurant.state}</div>
                    <div>Zip code:{therestaurant.zip_code}</div>
                    <div>Capacity:{therestaurant.capacity}</div>
                    <div>Open at:{therestaurant.open_time}</div>
                    <div>Close at:{therestaurant.close_time}</div>
                </div>
                {therestaurant.owner_id == sessionUser?.id && (
                    <button onClick={(e) => handleEdit(e, therestaurant.id)}>Edit Your Restaurant</button>
                )}
                {showModal && (<Modal onClose={() => setShowModal(false)}>
                    <EditRestaurant resId={therestaurant.id} showModal={showModal} setShowModal={setShowModal} />
                </Modal>)}

            </div>
        </>
    )
}

export default RestaurantDetails;
