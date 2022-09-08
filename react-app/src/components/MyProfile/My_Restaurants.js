import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from "react-router-dom";
import { Modal } from '../context/Modal'
import EditRestaurant from '../Restaurants/Restaurant_Edit'
import { getMyRestaurantThunk } from '../../store/restaurant';
import './my-restaurants.css'


export default function MyRestaurants({ showMyRestaurants }) {
    const dispatch = useDispatch();
    const [restaurantloaded, setRestaurantLoaded] = useState(false);
    const [showModal, setShowModal] = useState();
    const [resId, setResId] = useState();
    // const [showReservations, setShowReservations] = useState(false);

    // const myrestaurants = useSelector(state => state.restaurant?.restaurants);
    const myrestaurants = useSelector(state => Object.values(state.restaurant).restaurants);
    const sessionUser = useSelector(state => state.session.user);

    // useEffect(() => {
    //     dispatch(getMyRestaurantThunk())
    //         .catch(
    //             async (res) => {
    //                 const data = await res.json();
    //                 if (data && data.status == 404) setRestaurantLoaded(true);
    //             }
    //         )
    // }, [dispatch, myrestaurants?.length, showModal])

    useEffect(() => {
        dispatch(getMyRestaurantThunk()).then(() => setRestaurantLoaded(true))
    }, [dispatch, myrestaurants, myrestaurants?.length, showModal, sessionUser, showMyRestaurants])

    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)
    const handleEdit = (e, id) => {
        e.preventDefault();
        setShowModal(true);
        setResId(id);
    }
    if (myrestaurants?.length == 0) {
        console.log('nothign')
    }

    // console.log(myrestaurants)
    // const handleReservations = (e) => {
    //     e.preventDefault();
    //     setShowReservations(true)
    // }
    if (!sessionUser) {
        return <Redirect to='/' />;
    }

    return (
        // return restaurantloaded && sessionUser && (
        <div className='myrestaurants-container'>
            <h3> My Restaurants </h3>
            <div>
                <button className='list-new-res-button'>
                    <NavLink to='/listnewrestaurant' className='list-new-res-button-nav'> List A New Restaurant</NavLink>
                </button>
            </div>
            {showModal && (<Modal onClose={() => setShowModal(false)}>
                <EditRestaurant resId={resId} showModal={showModal} setShowModal={setShowModal} />
            </Modal>)}
            <div>To view Customer Reservations,  </div>
            <div>please go to the restaurant detail page </div>
            <div> and view under tab [ See Reservations ] </div>
            <div className='my-restaurants-each-container'>
                {myrestaurants?.map(restaurant => {
                    return <div className='my-restaurant-each' key={restaurant.id}>
                        <div className='myrestaurant-cover'>
                            <img src={restaurant.cover} alt='restaurant img' height={'300px'} />
                        </div>
                        <div className='myrestaurant-details'>
                            <NavLink to={`/restaurants/${restaurant.id}`}>{restaurant.name}</NavLink>
                            <div>Location:</div>
                            <div>{restaurant.address},</div>
                            <div>{restaurant.city}, {restaurant.state} {restaurant.zip_code}</div>
                            <div>Cuisine: {restaurant.cuisine} </div>
                        </div>
                        <div className='myrestaurant-edit-button'>
                            <button className='each-rest-edit-butt' onClick={(e) => handleEdit(e, restaurant.id)}>Manage/Edit</button>
                        </div>
                        {/* <button onClick={handleReservations}>Check Reservations for This Restaurant</button> */}
                    </div>
                })
                }
            </div>


        </div >
    )
}
