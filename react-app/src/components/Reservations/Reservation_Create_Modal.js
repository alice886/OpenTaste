import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { createReservationThunk } from '../../store/reservation'
import './reservation_create_modal.css'
import defaultImg3 from '../../icons/defaultImg3.png'

export default function MakeReservationModal({ resId, resTime, setShowHomeReserve }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const restaurants = useSelector(state => state.restaurant.restaurants)

    let therestaurant;
    for (let i of restaurants) {
        if (i.id === resId) {
            therestaurant = i
        }
    }
    const closeHour = Number(therestaurant.close_time.slice(0, 2))
    const openHour = Number(therestaurant.open_time.slice(0, 2))

    // to get today's dates
    let d = new Date();
    // d = new Date(d.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))
    const todayMonth = d.getMonth() + 1
    const todayDate = d.getDate()
    const todayString = [d.getFullYear(), ('0' + todayMonth).slice(-2), ('0' + d.getDate()).slice(-2)].join('-')
    const nowHour = d.getHours();
    // to get available hours
    const availableHour_count = []
    // for (let i = nowHour + 1; i < therestaurant.close_time.slice(0, 2); i++) {
    const [reserveDate, setReserveDate] = useState(todayString);
    const [reserveTime, setReserveTime] = useState((resTime + ':00'));

    if (new Date(reserveDate.split('-')) > d) {
        // const startCount = closeHour - openHour
        for (let i = openHour + 1; i < closeHour; i++) {
            availableHour_count.push(i + ':00')
        }
    }
    else {
        if (nowHour < openHour) {
            for (let i = openHour + 1; i < closeHour; i++) {
                availableHour_count.push(i + ':00')

            }
        }
        else {
            for (let i = nowHour + 1; i < closeHour; i++) {
                availableHour_count.push(i + ':00')
            }
        }
    }

    const [partySize, setPartySize] = useState();
    const [occasion, setOccasion] = useState();
    const [specialRequest, setSpecialRequest] = useState();
    const [errors, setErrors] = useState([])
    const [isDisabled, setIsDisabled] = useState(true)

    const sessionUser = useSelector(state => state.session.user);
    // const user_id = sessionUser?.id;
    const restaurant_id = therestaurant?.id;

    const capacity_count = []
    for (let i = 1; i < 21; i++) {
        capacity_count.push(i)
    }

    const occasion_count = ['Anniversary', 'Family/Friend Gathering', 'Birthday', 'Business',
        'Celebration/Graduation', 'Proposal', 'Other Occasion', 'Nothing Special']

    const inputRegex = /\s\s/;

    const newErrors = [];


    useEffect(() => {
        if (!sessionUser) {
            newErrors.push('Please log in to complete your reservation!')
        }
        if (sessionUser?.id === therestaurant?.owner_id) {
            newErrors.push('You may not reserve your own restaurant.')
        }
        else {
            if (reserveDate === undefined) {
                newErrors.push('Please select a date')
            }
            if (reserveTime === undefined) {
                newErrors.push('Please select a time')
            }
            if (reserveDate?.slice(0, 4) !== '2022') {
                newErrors.push('You may only reserve dates in the year of 2022')
            }
            if (reserveDate?.slice(5, 7) - todayMonth < 0) {
                newErrors.push('You may not select dates from previous months')
            }
            if (reserveDate?.slice(5, 7) - todayMonth == 0) {
                if (reserveDate?.slice(8, 10) - todayDate < 0) {
                    newErrors.push('You may not select dates before today')
                }
            }
            if (availableHour_count?.length <= 0) {
                newErrors.push('Please choose another day for available timeslots')
            }
            if (partySize === undefined) {
                newErrors.push('Please select a party size of the visit')
            }
            if (specialRequest && specialRequest.length > 200) {
                newErrors.push('You may only enter descriptions in 200 character')
            }
            if (specialRequest?.length && specialRequest?.length < 2) {
                newErrors.push("If you choose to provide a special request, please at least enter 2 characters in input fields")
            }
            if (specialRequest?.match(inputRegex)) {
                newErrors.push('You may not have 2 consecutive whitespaces in the special request field')
            }
        }
        setErrors(newErrors)
        if (!errors.length) setIsDisabled(false);
        else setIsDisabled(true)
    }, [errors.length, newErrors.length, reserveDate, reserveTime, partySize, occasion, specialRequest])

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            party_size: partySize,
            occasion,
            special_request: specialRequest,
            restaurant_id,
            reserve_date: reserveDate,
            reserve_time: reserveTime,
        }

        console.log('what is the payload', payload)
        const newReservation = await dispatch(createReservationThunk(payload));

        if (newReservation) {
            history.push(`/myreservations`)
        }
        else {
            setIsDisabled(true)
        }
    }

    // const countDown = (timeLeft) => {
    //     const minutes = Math.floor(timeLeft / 60);
    //     const seconds = timeLeft % 60;
    //     if (timeLeft > 0) {
    //         if (seconds < 10) {
    //             seconds = `0${seconds}`;
    //         }
    //         return `We’re holding this table for you for ${minutes}:${seconds}`
    //     }
    //     if (minutes == 0 && seconds <= 0) {
    //         return 'You can still try to complete your reservation, but this table may no longer be available. Please refresh your page.'
    //     }
    // }
    // const startTimer = (time) => {
    //     let timePassed = 0;
    //     let timeLeft = time;
    //     const timerInternal = setInterval(() => {
    //         timePassed = timePassed += 60;
    //         timeLeft = time - timePassed;
    //         const result = countDown(timeLeft)
    //         if (timeLeft == 0) {
    //             console.log('You can still try to complete your reservation, but this table may no longer be available. Please refresh your page.')
    //             clearInterval(timerInternal);
    //         }
    //         console.log(result);
    //     }, 1000)
    // }

    // const countDownNote = startTimer(300);
    // console.log('countdown is ----', countDown)

    let reserveNote = 'You can still try to complete your reservation, we will hold this table for 5 minutes.';
    const changeReserveNote = () => {
        const countDown = setInterval(() => {
            setShowHomeReserve(false)
            clearInterval(countDown);
        }, 300000)
    }
    changeReserveNote();

    return (
        <div className='create-reservation-container-modal'>
            <button className='home-modal-cancel' onClick={() => setShowHomeReserve(false)}>x</button>
            {(sessionUser?.id !== therestaurant?.owner_id) && (
                <div>
                    <div id='timer-label' className='timer-label-mo'>You can still try to complete your reservation, </div>
                    <div id='timer-label' className='timer-label-mo'>we will hold this table for 5 minutes.</div>
                </div>
            )}
            <div className='home-reserve-mo-detail'>
                <div>
                    <img src={therestaurant.cover} height={'100px'}
                        onError={(e) => {
                            if (e.target.src !== defaultImg3) { e.target.onerror = null; e.target.src = defaultImg3; }
                        }}
                    />
                </div>
                <div>
                    <div>Reserving at </div>
                    <div><NavLink to={`/restaurants/${therestaurant?.id}`}>{therestaurant.name}</NavLink></div>
                    {/* <div>Business Hours:</div>
                    <div>{therestaurant.open_time} - {therestaurant.close_time}</div> */}

                </div>
            </div>
            <div className='create-error-mo'>
                {errors.map((error, ind) => (
                    <div className='create-res-error-mo' key={ind}>* {error}</div>
                ))}
            </div>
            {(sessionUser?.id !== therestaurant?.owner_id) && <form className='create-new-reservation-mo'>
                <div >Required fields are marked with an *</div>
                <label>Date *</label>
                <input
                    type='date'
                    value={reserveDate}
                    min={todayString}
                    max='2023-12-31'
                    onChange={e => setReserveDate(e.target.value)}
                ></input>
                <label>Time *</label>
                <select className='create-res-input-mo' value={reserveTime} onChange={e => setReserveTime(e.target.value)} required >
                    <option value={''} selected disabled hidden>Select the hour</option>
                    {(availableHour_count.length > 0) ?
                        availableHour_count.map(each => {
                            return <option key={each} value={each} onClick={e => setReserveTime(e.target.value)}>{each}</option>
                        })
                        : (<option value={''} selected disabled hidden>* No available time on the selected date</option>)
                    }
                </select>
                <label>Party Size *</label>
                <select className='create-res-input-mo' onChange={e => setPartySize(e.target.value)} max={20} required>
                    <option value={''} selected disabled hidden>Please select the party size</option>
                    {capacity_count.map(each => (
                        <option value={each} key={each}>{each}  people</option>
                    ))}
                </select>
                <label>Occasion</label>
                <select required className='create-res-input-mo' onChange={e => setOccasion(e.target.value)} maxLength={30} >
                    <option value={''} selected disabled hidden>Please Select Your Occasion (not required)</option>
                    {occasion_count.map(each => (
                        <option value={each} key={each}>{each}</option>
                    ))}
                </select>
                <label>Special Requests</label>
                <textarea
                    type='textarea'
                    placeholder='Add a special request here'
                    onChange={e => setSpecialRequest(e.target.value)}
                    value={specialRequest}
                    maxLength={201}
                    className='create-res-input-mo'
                ></textarea>


            </form >}
            {(sessionUser?.id !== therestaurant?.owner_id) &&
                (
                    <div>
                        <div>* Please contact the restaurant if your party size is over 20 people</div>
                        <div className='home-reserve-modal-submit'>
                            <button onClick={handleSubmit} disabled={isDisabled}>Complete Reservation</button>
                        </div>
                    </div>
                )}
        </div>


    )
}
