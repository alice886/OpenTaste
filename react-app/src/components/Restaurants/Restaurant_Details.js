import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Modal } from '../context/Modal'
import { getRestaurantDetailThunk } from '../../store/restaurant';
import EditRestaurant from '../Restaurants/Restaurant_Edit'

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

    return loaded && (
        <div className='res-left-container'>
            <div className='res-left-name'>{therestaurant.name}</div>
            <div className='res-left-info'>
                <div>price_range: {therestaurant.price_range}</div>
                <div>cuisine: {therestaurant.cuisine}</div>
                <div>reviews: -- {therestaurant.reviews}</div>
                <div>star: -- {therestaurant.star}</div>
            </div>
            <div className='res-left-des'>description: {therestaurant.description}</div>
            <div className='res-right-info'>
                <div>address:{therestaurant.address}</div>
                <div>city:{therestaurant.city}</div>
                <div>state:{therestaurant.state}</div>
                <div>zip_code:{therestaurant.zip_code}</div>
                <div>capacity:{therestaurant.capacity}</div>
                <div>open_time:{therestaurant.open_time}</div>
                <div>close_time:{therestaurant.close_time}</div>
            </div>
            {therestaurant.owner_id == sessionUser?.id && (
                <button onClick={(e) => handleEdit(e, therestaurant.id)}>Edit Your Restaurant</button>
            )}
            {showModal && (<Modal onClose={() => setShowModal(false)}>
nt.id} showModal={showModal} setShowModal={setShowModal} />
            </Modal>)}
        </div>
    )
}

export default RestaurantDetails;
