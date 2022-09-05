import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { createReservationThunk } from '../../store/reservation'

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
    const d = new Date()
    const todayMonth = d.getMonth() + 1
    const todayString = [d.getFullYear(), ('0' + todayMonth).slice(-2), ('0' + d.getDate()).slice(-2)].join('-')
    const nowHour = d.getHours();
    // to get available hours
    const availableHour_count = []
    // for (let i = nowHour + 1; i < therestaurant.close_time.slice(0, 2); i++) {
    const [reserveDate, setReserveDate] = useState(todayString);
    const [reserveTime, setReserveTime] = useState((resTime + ':00'));
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
    const [errors, setErrors] = useState([])
    const [isDisabled, setIsDisabled] = useState(true)

    const sessionUser = useSelector(state => state.session.user);
    const user_id = sessionUser.id;
    const restaurant_id = therestaurant.id;

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
        }
        if (sessionUser.id === therestaurant.owner_id) {
            newErrors.push('You may not reserve your own restaurant.')
        }
        else {
            if (reserveDate === undefined) {
                newErrors.push('* Please select a date')
            }
            if (reserveTime === undefined) {
                newErrors.push('* Please select a time')
            }
            if (partySize === undefined) {
                newErrors.push('* Please select a party size of the visit.')
            }
            if (specialRequest && specialRequest.length > 200) {
                newErrors.push('* You may only enter descriptions in 200 character.')
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

    return sessionUser && (
        <>
            <div className='create-container'>
                <button onClick={() => setShowHomeReserve(false)}>x</button>
                <div id='timer-label' className='timer-label'>{reserveNote}</div>
                <h3>Make a Reservation at </h3>
                <div className='homeres-restaurant-container'>
                    <div>{therestaurant.name}</div>
                    <img src={therestaurant.cover} height={'100px'}></img>
                    <div>Business Hours: {therestaurant.open_time} - {therestaurant.close_time}</div>
                </div>
                <div className='create-error'>
                    {errors.map((error, ind) => (
                        <div className='create-res-error' key={ind}>{error}</div>
                    ))}
                </div>
                <form className='create-new-reservation'>
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
                        <select className='create-res-input' value={reserveTime} onChange={e => setReserveTime(e.target.value)} required >
                            <option value={''} selected disabled hidden>Select the hour</option>
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
                        <select className='create-res-input' onChange={e => setPartySize(e.target.value)} max={20} required>
                            <option value={''} selected disabled hidden>Please select the party size</option>
                            {capacity_count.map(each => (
                                <option value={each} key={each}>{each}  people</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Occasion</label>
                        <select required className='create-res-input' onChange={e => setOccasion(e.target.value)} maxLength={30} >
                            <option value={''} selected disabled hidden>Please Select Your Occasion</option>
                            {occasion_count.map(each => (
                                <option value={each} key={each}>{each}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Special Requests</label>
                        <input
                            type='textarea'
                            placeholder='Add a special request here.'
                            onChange={e => setSpecialRequest(e.target.value)}
                            value={specialRequest}
                            maxLength={201}
                            className='create-res-input'
                        ></input>
                    </div>

                </form >
                <div>* Please contact the restaurant if your party size is over 20 people,</div>
                <div>so the merchant can get well prepared and make accommondation arrangements for your reservation.</div>
                <button onClick={handleSubmit} disabled={isDisabled}>Complete Reservation</button>
            </div>
        </>

    )
}
