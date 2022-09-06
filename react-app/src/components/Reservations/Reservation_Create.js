import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { createReservationThunk } from '../../store/reservation'


export default function MakeReservation({ therestaurant }) {
    const dispatch = useDispatch();
    const history = useHistory();
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
    const [reserveTime, setReserveTime] = useState();
    if (new Date(reserveDate) > d) {
        const startCount = closeHour - openHour
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
    const user_id = sessionUser?.id;
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
            newErrors.push('Please log in to complete your reservation.')
        }
        if (sessionUser?.id === therestaurant.owner_id) {
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

    return (
        <>
            <div className='create-reservation-container'>
                <h3>Make a Reservation</h3>
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
                                    return <option value={each} onClick={e => setReserveTime(e.target.value)}>{each}</option>
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
                                <option value={each} >{each}  people</option>
                            ))}
                        </select>
                    </div>
                    <button>Find a Table</button>
                    <div>
                        <label>Occasion</label>
                        <select required className='create-res-input' onChange={e => setOccasion(e.target.value)} maxLength={30} >
                            <option value={''} selected disabled hidden>Please Select Your Occasion</option>
                            {occasion_count.map(each => (
                                <option value={each} >{each}</option>
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
                            className='create-res-input'
                        ></input>
                    </div>

                </form >
                <div>* Please contact the restaurant if your party size is over 20 people,</div>
                <div>so the merchant can get well prepared and make accommondation arrangements for your reservation.</div>
                <button onClick={handleSubmit} disabled={isDisabled}>Submit</button>
            </div>
        </>

    )
}
