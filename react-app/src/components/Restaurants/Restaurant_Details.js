import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getRestaurantDetailThunk } from '../../store/restaurant';

function RestaurantDetails() {
    const dispatch = useDispatch();
    const { restaurantId } = useParams();
    const therestaurant = useSelector(state => state.restaurant.restaurant)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(getRestaurantDetailThunk(restaurantId)).then(() => setLoaded(true))
    }, [dispatch])

    console.log('therestaurant print --1', restaurantId)
    console.log('therestaurant print --2', therestaurant)
    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)


    return loaded && (
        <div className='res-left-container'>
            <div className='res-left-name'>{therestaurant.name}</div>
            <div className='res-left-info'>
                <div>price_range: {therestaurant.price_range}</div>
                <div>cuisine: {therestaurant.cuisine}</div>
                <div>reviews: {therestaurant.reviews}</div>
                <div>star: {therestaurant.star}</div>
            </div>
            <div className='res-left-des'>{therestaurant.description}</div>
            <div className='res-right-info'>
                <div>address:{therestaurant.address}</div>
                <div>city:{therestaurant.city}</div>
                <div>state:{therestaurant.state}</div>
                <div>zip_code:{therestaurant.zip_code}</div>
                <div>capacity:{therestaurant.capacity}</div>
                <div>open_time:{therestaurant.open_time}</div>
                <div>close_time:{therestaurant.close_time}</div>
            </div>
            <button>Edit</button>
            <button>Delete</button>

        </div>
    )
}

export default RestaurantDetails;
