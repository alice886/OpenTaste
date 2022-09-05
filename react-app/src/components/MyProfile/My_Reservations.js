import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { Modal } from '../context/Modal'
import { getMyReservationsThunk } from '../../store/reservation';


export default function MyReservations() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [showModal, setShowModal] = useState();
    const [resId, setResId] = useState();
    const myReservations = useSelector(state => state.reservation.reservations);

    useEffect(() => {
        dispatch(getMyReservationsThunk()).then(() => setLoaded(true))
    }, [dispatch, showModal])

    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)
    const handleEdit = (e, id) => {
        e.preventDefault();
        setShowModal(true);
        setResId(id);
    }

    const handleReservations = (e) => {
        e.preventDefault();
    }

    return loaded && (
        <div>
            <NavLink to='/listnewrestaurant'> List A New Restaurant</NavLink>
            {showModal && (<Modal onClose={() => setShowModal(false)}>
                {/* <EditRestaurant resId={resId} showModal={showModal} setShowModal={setShowModal} /> */}
            </Modal>)}
            <div className='myreservations-container'>
                <h3>- My Reservations -</h3>
                {myReservations?.map(reservation => {
                    return <div className='home-restaurant' key={reservation.id}>
                        <img src={reservation.restaurant.cover} height={'80px'} alt="restaurant cover"></img>
                        <div>
                            <NavLink to={`/restaurants/${reservation.restaurant_id}`}>{reservation.restaurant.name}</NavLink>
                        </div>
                        <div>{reservation.restaurant.address}</div>
                        <div>{reservation.restaurant.city}, {reservation.restaurant.state} {reservation.restaurant.zip_code}</div>
                        <div>Date : {reservation.reserve_datetime.slice(0, 16)}</div>
                        <div>Time : {reservation.reserve_datetime.slice(16, 22)}</div>
                        <div>Party Size : {reservation.party_size}</div>
                        <div>Occasion: {reservation.occasion}</div>
                        <div>My Requests: {reservation.special_request}</div>
                        <button onClick={handleReservations}>Edit Details</button>
                    </div>
                })
                }
            </div>


        </div >
    )
}
