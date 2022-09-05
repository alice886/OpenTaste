import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { Modal } from '../context/Modal'
import EditRestaurant from '../Restaurants/Restaurant_Edit'
import { getMyRestaurantThunk } from '../../store/restaurant';
import ReservationDetails from '../Reservations/Business_Reservation';


export default function MyRestaurants() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [showModal, setShowModal] = useState();
    const [resId, setResId] = useState();
    const [showReservations, setShowReservations] = useState(false);
    const myrestaurants = useSelector(state => state.restaurant.restaurants);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getMyRestaurantThunk()).then(() => setLoaded(true))
    }, [dispatch, showModal, showReservations])

    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)
    const handleEdit = (e, id) => {
        e.preventDefault();
        setShowModal(true);
        setResId(id);
    }

    // const handleReservations = (e) => {
    //     e.preventDefault();
    //     setShowReservations(true)
    // }

    return loaded && sessionUser && (
        <div>
            <NavLink to='/listnewrestaurant'> List A New Restaurant</NavLink>
            {showModal && (<Modal onClose={() => setShowModal(false)}>
                <EditRestaurant resId={resId} showModal={showModal} setShowModal={setShowModal} />
            </Modal>)}
            <div className='myrestaurants-container'>
                <h3>- My Restaurants -</h3>
                {myrestaurants?.map(restaurant => {
                    return <div className='home-restaurant' key={restaurant.id}>
                        <div className='myrestaurant-cover'>
                            <img src={restaurant.cover} alt='restaurant img' height={'300px'} />
                        </div>
                        <NavLink to={`/restaurants/${restaurant.id}`}>{restaurant.name}</NavLink>
                        <div>📍{restaurant.city}, {restaurant.state} {restaurant.zip_code}</div>
                        <button onClick={(e) => handleEdit(e, restaurant.id)}>Manage/Edit This Business</button>
                        {/* <button onClick={handleReservations}>Check Reservations for This Restaurant</button> */}
                    </div>
                })
                }
            </div>


        </div >
    )
}
