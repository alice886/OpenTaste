import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { Modal } from '../context/Modal'
import { getMyReservationsThunk } from '../../store/reservation';
import EditReservation from '../Reservations/Reservation_Edit'


export default function MyReservations() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [showEditReser, setShowEditReser] = useState(false);
    const [resId, setResId] = useState();
    const myReservations = useSelector(state => state.reservation.reservations);

    useEffect(() => {
        dispatch(getMyReservationsThunk()).then(() => setLoaded(true))
    }, [dispatch, showEditReser])

    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)

    const handleEditReservations = (e, id) => {
        e.preventDefault();
        setResId(id);
        setShowEditReser(true)
    }

    return loaded && (
        <div>
            <NavLink to='/listnewrestaurant'> List A New Restaurant</NavLink>
            {showEditReser && (<Modal onClose={() => setShowEditReser(false)}>
                <EditReservation resId={resId} showEditReser={showEditReser} setShowEditReser={setShowEditReser} />
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
                        <button onClick={e => handleEditReservations(e, reservation.id)}>View/Edit Details</button>
                    </div>
                })
                }
            </div>


        </div >
    )
}
