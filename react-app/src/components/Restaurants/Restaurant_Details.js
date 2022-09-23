import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { Modal } from '../context/Modal'
import { getRestaurantDetailThunk } from '../../store/restaurant';
import EditRestaurant from '../Restaurants/Restaurant_Edit'
import ReservationDetails from '../Reservations/Business_Reservation'
import MakeReservation from '../Reservations/Reservation_Create'
import GoogleMapAPI from '../Gmap/gmap';
import './restaurant_details.css'
import defaultImg3 from '../../icons/defaultImg3.png'


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

    if (loaded && !therestaurant) {
        return <div className='restaurant-notfound'>uh oh, restaurant not found</div>
    }

    const userCheck = therestaurant?.owner_id === sessionUser?.id
    const dollarSigns = ['', '$', '$$', '$$$', '$$$$'];

    
    return loaded && therestaurant && (
        <>
            <img className='restaurant-detail-cover'
                src={therestaurant?.cover}
                onError={(e) => {
                    if (e.target.src !== defaultImg3) { e.target.onerror = null; e.target.src = defaultImg3; }
                }}
            />
            <div className='restaurant-all-container'>
                <div className='res-left-container'>
                    <div className='res-left-toggle'>
                        <button className='res-left-toggle-button' onClick={overviewToggle}>Overview</button>
                        {userCheck && sessionUser && (
                            <button className='res-left-toggle-button' onClick={reservationToggle}>{buttontitle}</button>
                        )}
                    </div>
                    <div className='res-left-name'>{therestaurant?.name}</div>
                    {(showReservations && sessionUser) ? < ReservationDetails showModal={showModal} /> : (
                        <>
                            <div className='res-left-info'>
                                <div>{dollarSigns[therestaurant?.price_range]} · {therestaurant?.cuisine}</div>
                                <div>{therestaurant?.description}</div>
                            </div>
                            <div className='res-right-info'>
                                {/* <div>Capacity:{therestaurant?.capacity}</div> */}
                                <div>Open at: {therestaurant?.open_time}</div>
                                <div>Close at: {therestaurant?.close_time}</div>
                                <br></br>
                                <div>Location:</div>
                                <div>{therestaurant?.address}</div>
                                <div>{therestaurant?.city}</div>
                                <div>{therestaurant?.state},  {therestaurant?.zip_code}</div>
                            </div>
                            <GoogleMapAPI therestaurant={therestaurant}/>
                        </>
                    )
                    }
                </div>
                <div className='res-right-container'>
                    {showModal && (<Modal onClose={() => setShowModal(false)}>
                        <EditRestaurant resId={therestaurant?.id} showModal={showModal} setShowModal={setShowModal} />
                    </Modal>)}
                    <div id="map"></div>
                    <div className='res-right-container2'>
                        {(sessionUser?.id === therestaurant?.owner_id) ? <div>
                            <div>You are the restaurant owner.</div>
                            <br></br>
                            <div>
                                <div>To view Customer Reservations,  </div>
                                <div>please go to the restaurant detail page </div>
                                <div> and view under tab [ See Reservations ] </div>
                            </div>
                        </div>
                            : <MakeReservation therestaurant={therestaurant} />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default RestaurantDetails;
