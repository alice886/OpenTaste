import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { createReservationThunk } from '../../store/reservation'
import './reservation_create.css'


export default function MakeReservation({ therestaurant }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const closeHour = Number(therestaurant.close_time.slice(0, 2))
    const openHour = Number(therestaurant.open_time.slice(0, 2))

    // to get today's dates
    const d = new Date()
    const todayMonth = d.getMonth() + 1
    const todayDate = d.getDate()
    const todayString = [d.getFullYear(), ('0' + todayMonth).slice(-2), ('0' + d.getDate()).slice(-2)].join('-')
    const nowHour = d.getHours();
    // to get available hours
    const availableHour_count = []
    // for (let i = nowHour + 1; i < therestaurant.close_time.slice(0, 2); i++) {
    const [reserveDate, setReserveDate] = useState(todayString);
    const [reserveTime, setReserveTime] = useState();
    if (new Date(reserveDate.split('-')) > d) {
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
    const restaurant_id = therestaurant?.id;

    const capacity_count = []
    for (let i = 1; i < 21; i++) {
        capacity_count.push(i)
    }

    const occasion_count = ['Anniversary', 'Family/Friend Gathering', 'Birthday', 'Business',
        'Celebration/Graduation', 'Proposal', 'Other Occasion', 'Nothing Special'];

    const inputRegex = /\s\s/;

    const newErrors = [];


    useEffect(() => {
        if (!sessionUser) {
            newErrors.push('Please log in to complete your reservation.')
        }
        if (sessionUser?.id === therestaurant?.owner_id) {
            newErrors.push(`Hello owner of ${therestaurant.name} ❣️`)
            newErrors.push(<br></br>)
            newErrors.push('Find customer reservations under [See Reservations]')
            newErrors.push('And you may not reserve at your own restaurant')
        }
        else {
            if (reserveDate === undefined) {
                newErrors.push('Please select a date')
            }
            if (availableHour_count.length > 0) {
                if (reserveTime === undefined) {
                    newErrors.push('Please select a time')
                }
                if (partySize === undefined) {
                    newErrors.push('Please select a party size of the visit')
                }
            }
            if (availableHour_count.length <= 0) {
                newErrors.push('No available timeslots on selected date.')
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
    }, [errors.length, newErrors.length, reserveDate, reserveTime, partySize, occasion, specialRequest, sessionUser])

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

    console.log(availableHour_count)

    // JS is so weird that you need to either add '-' or ' ' to recognize html date input
    // console.log('today is --', d)
    // console.log('browser date is --', reserveDate)
    // console.log('browser date is with empty string --', reserveDate + ' ')
    // console.log('if no string or split --', new Date(reserveDate))
    // console.log('with split --', new Date(reserveDate.split('-')))
    // console.log('with empty string --', new Date(reserveDate + ' '))
    // console.log('now it returns true --', new Date(reserveDate.split('-')) > d)

    return (
        <>
            <div className='create-reservation-container'>
                <h3>Make a Reservation</h3>
                <div className='create-error'>
                    {errors.map((error, ind) => (
                        <div className='create-res-error' key={ind}>* {error}</div>
                    ))}
                </div>
                <form className='create-new-reservation'>
                    <label>Date</label>
                    <input
                        type='date'
                        value={reserveDate}
                        min={todayString}
                        max='2023-12-31'
                        onChange={e => setReserveDate(e.target.value)}
                    ></input>
                    <label>Time</label>
                    <select className='create-res-input' value={reserveTime} onChange={e => setReserveTime(e.target.value)} required >
                        {/* <option value={''} selected disabled hidden>Select the hour</option>
                        {availableHour_count.map(each => {
                            <option value={each} onClick={e => setReserveTime(e.target.value)}>{each}</option>
                        })} */}
                        <option value={''} selected disabled hidden>Select the hour</option>
                        {(availableHour_count.length > 0) &&
                            availableHour_count.map(each => {
                                return <option value={each} onClick={e => setReserveTime(e.target.value)}>{each}</option>
                            })
                        }
                    </select>
                    <label>Party Size</label>
                    <select className='create-res-input' onChange={e => setPartySize(e.target.value)} max={20} required>
                        <option value={''} selected disabled hidden>Please select the party size</option>
                        {capacity_count.map(each => (
                            <option value={each} >{each}  people</option>
                        ))}
                    </select>
                    {/* <button>Find a Table</button> */}
                    <label>Occasion</label>
                    <select required className='create-res-input' onChange={e => setOccasion(e.target.value)} maxLength={30} >
                        <option value={''} selected disabled hidden>Please Select Your occasion</option>
                        {occasion_count.map(each => (
                            <option value={each} >{each}</option>
                        ))}
                    </select>
                    <label>Special Requests</label>
                    <textarea
                        type='textarea'
                        placeholder='Please enter your special request here'
                        onChange={e => setSpecialRequest(e.target.value)}
                        value={specialRequest}
                        maxLength={201}
                        className='create-res-input'
                    ></textarea>

                </form >
                {sessionUser?.id !== therestaurant?.owner_id && (<div className='create-party-note'>
                    <div>* Please contact the restaurant if your party size is over 20 people</div>
                </div>)}
                {sessionUser?.id !== therestaurant?.owner_id && (<div className='make-reservation-submit'>
                    <button className='make-reservation-submit' onClick={handleSubmit} disabled={isDisabled}>Submit</button>
                </div>)}
            </div>
        </>

    )
}
