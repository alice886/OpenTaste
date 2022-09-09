import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from "react-router-dom";
import { Modal } from '../context/Modal'
import { getMyReservationsThunk } from '../../store/reservation';
import EditReservation from '../Reservations/Reservation_Edit'
// import moment from 'moment'
import './my_reservations.css'


export default function MyReservations() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [showEditReser, setShowEditReser] = useState(false);
    const [resId, setResId] = useState();
    const myReservations = useSelector(state => state.reservation.reservations);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getMyReservationsThunk()).then(() => setLoaded(true))
    }, [dispatch, showEditReser, sessionUser])

    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)

    const d = new Date()
    const todayMonth = d.getMonth() + 1
    const todayDate = d.getDate()


    const handleEditReservations = (e, id) => {
        e.preventDefault();
        setResId(id);
        setShowEditReser(true)
    }

    // console.log('myreservations--', myReservations)

    if (!sessionUser) {
        return <Redirect to='/' />;
    }

    return loaded && sessionUser && (
        <div className='myreservation-container'>
            <h3 className='title-my-reservations'>- My Reservations -</h3>
            {showEditReser && (<Modal onClose={() => setShowEditReser(false)}>
                <EditReservation resId={resId} showEditReser={showEditReser} setShowEditReser={setShowEditReser} />
            </Modal>)}
            <div >
                {myReservations?.length ? (myReservations?.map(reservation => {
                    return <div className='my-reservation-each' key={reservation.id}>
                        <div className='myreservation-cover'>
                            <img src={reservation.restaurant.cover} alt="restaurant cover"></img>
                        </div>
                        <div className='myrestaurant-details'>
                            <NavLink to={`/restaurants/${reservation.restaurant_id}`}>{reservation.restaurant.name}</NavLink>
                            <div>{reservation.restaurant.address}</div>
                            <div>{reservation.restaurant.city}, {reservation.restaurant.state} {reservation.restaurant.zip_code}</div>
                            <br></br>
                            <div>Date : {reservation.reserve_datetime.slice(0, 16)}</div>
                            <div>Time : {reservation.reserve_datetime.slice(16, 22)}</div>
                            <div>Party of : {reservation.party_size}</div>
                            <div>Day : {reservation.reserve_datetime.slice(5, 8)}</div>
                            {/* <div>Month : {moment().month(reservation.reserve_datetime.slice(8, 11))}</div> */}
                        </div>
                        {(<div className='myreservation-edit-button'>
                            <button onClick={e => handleEditReservations(e, reservation.id)}>View/Edit Details</button>
                        </div>)}
                    </div>
                })) : (<div className='no-reservation'>
                    <h3 className='no-reserv-h3'>You have no reservations yet</h3>
                    <NavLink to='/'> Back to Home</NavLink>
                </div>)
                }
            </div>


        </div >
    )
}
