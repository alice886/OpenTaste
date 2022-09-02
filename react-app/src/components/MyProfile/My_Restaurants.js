import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { Modal } from '../context/Modal'
import EditRestaurant from '../Restaurants/Restaurant_Edit'
import { getMyRestaurantThunk } from '../../store/restaurant';


export default function MyRestaurants() {
    const dispatch = useDispatch();
    const myrestaurants = useSelector(state => state.restaurant.restaurants)
    const [loaded, setLoaded] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [resId, setResId] = useState()

    useEffect(() => {
        dispatch(getMyRestaurantThunk()).then(() => setLoaded(true))
    }, [dispatch])

    // console.log('therestaurant id is --', restaurantId)
    // console.log('therestaurant detail is --', therestaurant)
    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)
    const handleEdit = (e, id) => {
        e.preventDefault();
        showModal ? setShowModal(false) : setShowModal(true)
        setResId(id);
        setShowModal(true);
    }
    console.log('click and valus is ', resId)
    return loaded && (
        <div>
            <NavLink to='/listnewrestaurant'> List A New Restaurant</NavLink>
            <div className='your-res'>
            </div>
            <div className='restaurants-container'>
                <h3>Restaurants you listed ... </h3>
                {myrestaurants?.map(restaurant => {
                    return <div className='home-restaurant' key={restaurant.id}>
                        <NavLink to={`/restaurants/${restaurant.id}`}>{restaurant.name}</NavLink>
                        <div>📍{restaurant.city}, {restaurant.state} {restaurant.zip_code}</div>
                        <button onClick={(e) => handleEdit(e, restaurant.id)}>Edit Details</button>
                        {/* {showModal && (<Modal>
                            <EditRestaurant restaurantId={restaurant.id} />
                        </Modal>)} */}
                    </div>
                })
                }
                {showModal && (<EditRestaurant resId={resId} />)}
            </div>

        </div >
    )
}
