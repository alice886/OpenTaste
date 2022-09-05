import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Modal } from '../context/Modal'
import { editReservationThunk } from '../../store/reservation';
import DeleteReservation from '../DeleteModals/Delete_Reservation';

export default function EditReservation({ resId, showEditReser, setShowEditReser }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showDeleteReserv, setShowDeleteReserv] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector(state => state.session.user);
    const user_id = sessionUser.id;
    const myReservations = useSelector(state => state.reservation.reservations);

    let theReservation;
    for (let i of myReservations) {
        if (i.id == resId) {
            theReservation = i
        }
    }
    const closeHour = Number(theReservation.restaurant.close_time.slice(0, 2))
    const openHour = Number(theReservation.restaurant.open_time.slice(0, 2))
    let maydate = new Date(theReservation.reserve_datetime)
    const parsedDate = maydate.getFullYear() + '-' + ('0' + (maydate.getMonth() + 1)).slice(-2) + '-' + maydate.getDate()
    const parsedTime = (maydate.getHours() + 7) + ':' + maydate.getMinutes() + 0

    // console.log(maydate.getFullYear() + '-' + ('0' + (maydate.getMonth() + 1)).slice(-2) + '-' + maydate.getDate())
    // console.log((maydate.getHours() + 7) + ':' + maydate.getMinutes() + 0)

    // to get today's dates
    const d = new Date()
    const todayMonth = d.getMonth() + 1
    const todayString = [d.getFullYear(), ('0' + todayMonth).slice(-2), ('0' + d.getDate()).slice(-2)].join('-')
    const nowHour = d.getHours();
    // to get available hours
    const availableHour_count = []
    // for (let i = nowHour + 1; i < therestaurant.close_time.slice(0, 2); i++) {
    const [reserveDate, setReserveDate] = useState(parsedDate);
    const [reserveTime, setReserveTime] = useState(parsedTime);
    if (new Date(reserveDate) > d) {
        const startCount = closeHour - openHour
        for (let i = openHour + 1; i < closeHour; i++) {
            availableHour_count.push(i + ':00')
        }
    }
    else {
        for (let i = nowHour + 1; i < closeHour; i++) {
            availableHour_count.push(i + ':00')
        }
    }

    const [partySize, setPartySize] = useState();
    const [occasion, setOccasion] = useState();
    const [specialRequest, setSpecialRequest] = useState();
    const [isDisabled, setIsDisabled] = useState(true)

    const capacity_count = []
    for (let i = 1; i < 21; i++) {
        capacity_count.push(i)
    }

    const occasion_count = ['Anniversary', 'Family/Friend Gathering', 'Birthday', 'Business',
        'Celebration/Graduation', 'Proposal', 'Other Occasion', 'Nothing Special']

    const newErrors = [];

    useEffect(() => {
        if (!sessionUser) {
            newErrors.push('Please log in')
        } else {
            if (specialRequest && specialRequest.length > 200) {
                newErrors.push('* You may only enter descriptions in 200 character.')
            }
        }
        setErrors(newErrors)
        if (!errors.length) setIsDisabled(false);
        else setIsDisabled(true)
    }, [errors.length, newErrors.length, specialRequest])

    const handleEditSubmit = async e => {
        e.preventDefault();
        const payload = {
            party_size: partySize,
            occasion,
            special_request: specialRequest,
            reserve_date: reserveDate,
            reserve_time: reserveTime,
        }
        const editedReservation = await dispatch(editReservationThunk(payload, resId))
        if (editedReservation) {
            history.push(`/myreservations`)
            setShowEditReser(false)
        }
        else {
            setIsDisabled(true)
        }
    }

    const handleDeleteReser = async e => {
        e.preventDefault();
        setShowDeleteReserv(true);
    }


    return (
        <>
            <button onClick={() => setShowEditReser(false)}>x</button>
            <h1>Edit Reservation </h1>
            {showDeleteReserv && <Modal><DeleteReservation setShowDeleteReserv={setShowDeleteReserv} resId={resId} setShowEditReser={setShowEditReser} object='reservation' /></Modal>}
            <div>
                <img src={theReservation.restaurant.cover} height={'70px'}></img>
                <div>{theReservation.restaurant.name}</div>
                <div>{theReservation.restaurant.address}</div>
                <div>{theReservation.restaurant.city}, {theReservation.restaurant.state}  {theReservation.restaurant.zip_code}</div>
                <div>Date: {theReservation.reserve_datetime.slice(0, 16)}</div>
                <div>Time: {theReservation.reserve_datetime.slice(16, 22)}</div>
                <div>Reserved for party of {theReservation.party_size}</div>
                <div>Occasion: {theReservation.occasion}</div>
                <div>Special request: {theReservation.special_request}</div>
            </div>
            <div>
                <div className='edit-error'>
                    {errors.map((error, ind) => (
                        <div className='edit-res-error' key={ind}>{error}</div>
                    ))}
                </div>
                <form className='edit-reservation'>
                    <div>
                        <label>Date</label>
                        <input
                            type='date'
                            value={reserveDate}
                            min={todayString}
                            max='2023-12-31'
                            onChange={e => setReserveDate(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Time</label>
                        <select className='edit-res-input' value={reserveTime} onChange={e => setReserveTime(e.target.value)} required >
                            <option defaultValue={''} selected disabled hidden>Update the hour here</option>
                            {(availableHour_count.length > 0) ?
                                availableHour_count.map(each => {
                                    return <option key={each} value={each} onClick={e => setReserveTime(e.target.value)}>{each}</option>
                                })
                                : (<option value={''} selected disabled hidden>No available time on the selected date</option>)
                            }
                        </select>
                    </div >
                    <div>
                        <label>Party Size</label>
                        <select className='edit-res-input' onChange={e => setPartySize(e.target.value)} max={20} required>
                            <option defaultValue={''} selected disabled hidden>Update the party size here</option>
                            {capacity_count.map(each => (
                                <option key={each} value={each} >{each}  people</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Occasion</label>
                        <select required className='edit-res-input' onChange={e => setOccasion(e.target.value)} maxLength={30} >
                            <option defaultValue={''} selected disabled hidden>Update Your Occasion Here</option>
                            {occasion_count.map(each => (
                                <option key={each} value={each} >{each}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Special Requests</label>
                        <input
                            type='textarea'
                            placeholder='Please enter your special request here.'
                            onChange={e => setSpecialRequest(e.target.value)}
                            value={specialRequest}
                            maxLength={201}
                            className='edit-res-input'
                        ></input>
                    </div>

                </form >

                <div>Please contact the restaurant if your party size is over 20 people,</div>
                <div>so the merchant can get well prepared and make accommondation arrangements for your reservation.</div>
            </div>
            <button onClick={handleEditSubmit}>Update This Reservation</button>
            <button onClick={handleDeleteReser}>Cancel This Reservation</button>
        </>
    )
}