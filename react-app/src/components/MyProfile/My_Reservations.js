import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from "react-router-dom";
import { Modal } from '../context/Modal'
import { getMyReservationsThunk } from '../../store/reservation';
import EditReservation from '../Reservations/Reservation_Edit'
import ReviewModal from '../Reviews/Review_Modal'
import defaultImg3 from '../../icons/defaultImg3.png'
import './my_reservations.css'


export default function MyReservations() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);
    const [showEditReser, setShowEditReser] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(true);
    const [resId, setResId] = useState();
    const myReservations = useSelector(state => state.reservation.reservations);
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getMyReservationsThunk()).then(() => setLoaded(true))
    }, [dispatch, showEditReser, sessionUser])

    let d = new Date()
    // d = new Date(d.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))
    const todayMonth = d.getMonth() + 1
    const todayDate = d.getDate()

    const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const validatePastReservations = time => {
        const resMonth = monthNames.indexOf(time.slice(8, 11));
        const resDate = time.slice(5, 8);
        if (resMonth < todayMonth) {
            return false;
        }
        if (resDate < todayDate && resMonth === todayMonth) {
            return false;
        }
        return true;

    }

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
            {showReviewModal && (<Modal onClose={() => setShowReviewModal(false)}>
                <ReviewModal />
            </Modal>)}
            <div >
                {myReservations?.length ? (myReservations?.map(reservation => {
                    return <div className='my-reservation-each' key={reservation.id}>
                        <div className='myreservation-cover'>
                            <img src={reservation.restaurant.cover} alt="restaurant cover"
                                onError={(e) => {
                                    if (e.target.src !== defaultImg3) { e.target.onerror = null; e.target.src = defaultImg3; }
                                }} ></img>
                        </div>
                        <div className='myrestaurant-details'>
                            <NavLink to={`/restaurants/${reservation.restaurant_id}`}>{reservation.restaurant.name}</NavLink>
                            <div>{reservation.restaurant.address}</div>
                            <div>{reservation.restaurant.city}, {reservation.restaurant.state} {reservation.restaurant.zip_code}</div>
                            <br></br>
                            <div>Date : {reservation.reserve_datetime.slice(0, 16)}</div>
                            <div>Time : {reservation.reserve_datetime.slice(16, 22)}</div>
                            <div>Party of : {reservation.party_size}</div>
                        </div>
                        {validatePastReservations(reservation.reserve_datetime) ? (<div className='myreservation-edit-button'>
                            <button onClick={e => handleEditReservations(e, reservation.id)}>View/Edit Details</button>
                        </div>) : (<div className='myreservation-expire'>
                            <div>Reservation Expired</div>
                            {/* <div className='rate-reservation'>
                                <button onClick={() => setShowReviewModal(true)}>Rate/Edit your experience</button>
                            </div> */}
                        </div>)}
                        <div className='rate-reservation'>
                            <button onClick={() => setShowReviewModal(true)}>Rate/Edit your experience</button>
                        </div>
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
