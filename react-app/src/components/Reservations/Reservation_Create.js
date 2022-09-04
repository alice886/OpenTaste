import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom';
import { createRestaurantThunk } from '../../store/restaurant'

export default function MakeReservation({ therestaurant }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState();
    const [price_range, setPriceRange] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [state, setState] = useState();
    const [zip_code, setZipCode] = useState();
    const [description, setDescription] = useState();
    const [capacity, setCapacity] = useState();
    const [cuisine, setCuisine] = useState();
    const [cover, setCover] = useState();
    const [open_time, setOpenTime] = useState();
    const [close_time, setCloseTime] = useState();
    const [errors, setErrors] = useState([])
    const [isDisabled, setIsDisabled] = useState(true)

    const sessionUser = useSelector(state => state.session.user);

    const capacity_count = []
    for (let i = 1; i < 21; i++) {
        capacity_count.push(i)
    }

    const occasion_count = ['Anniversary', 'Family/Friend Gathering', 'Birthday', 'Business', 'Celebration/Graduation', 'Proposal', 'Other Occasion','Nothing Special']

    const newErrors = [];

    const zipcodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
    const coverRegex = /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$/;

    // to get today's dates
    const d = new Date()
    const todayMonth = d.getMonth() + 1
    const todayString = [d.getFullYear(), ('0' + todayMonth).slice(-2), ('0' + d.getDate()).slice(-2)].join('-')
    const nowHour = d.getHours();
    // to get available hours
    const availableHour_count = []
    for (let i = nowHour + 1; i < therestaurant.close_time.slice(0, 2); i++) {
        availableHour_count.push(i + ':00')
    }
    console.log('business hour is ', typeof availableHour_count)
    console.log('business hour is ', availableHour_count)
    availableHour_count.map(each => {
        console.log(each)
    })



    useEffect(() => {
        if (!sessionUser) {
            newErrors.push('Please log in')
        } else {
            if (description && description.length > 500) {
                newErrors.push('* You may only enter descriptions in 500 character.')
            }
            if (capacity === undefined) {
                newErrors.push('* Please select a capacity for your restaurant.')
            }
            if (cuisine === undefined) {
                newErrors.push('* Please select a cuisine type for your restaurant.')
            }
            if (open_time === undefined || close_time === undefined) {
                newErrors.push('* Please select a both Open Time and Close Time to specify your business hours.')
            }
        }
        setErrors(newErrors)
        if (!errors.length) setIsDisabled(false);
        else setIsDisabled(true)
    }, [errors.length, newErrors.length, name, price_range,
        address, city, state, zip_code, description?.length,
        capacity, cuisine, cover, open_time, close_time])

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            name,
            price_range,
            address,
            city,
            state,
            zip_code,
            description,
            capacity,
            cuisine,
            open_time,
            close_time,
            cover,
        }

        console.log('what is the payload', payload)
        const newRestaurant = await dispatch(createRestaurantThunk(payload));
        // console.log('what is the new restaurant', newRestaurant.payload['id'])
        if (newRestaurant) {
            history.push(`/restaurants/${newRestaurant.id}`)
        }
        else {
            setIsDisabled(true)
        }
    }

    return sessionUser && (
        <>
            <div className='create-container'>
                <h3>Make a Reservation</h3>
                <div>Please contact the restaurant if your party size is over 20 people,</div>
                <div>so the merchant can get well prepared and make accommondation arrangements for your reservation.</div>
                <div className='create-error'>
                    {errors.map((error, ind) => (
                        <div className='create-res-error' key={ind}>{error}</div>
                    ))}
                </div>
                <form className='create-new-reservation'>
                    <div>
                        <label>Date</label>
                        <input type='date' value={todayString} min={todayString} max='2023-12-31'></input>
                    </div>
                    <div>
                        <label>Time</label>
                        <select className='create-res-input' required>
                            <option value={''} selected disabled hidden>Select the hour</option>
                            {availableHour_count.map(each => {
                                return <option value={each}>{each}</option>
                            })}
                        </select>
                    </div >
                    <div>
                        <label>Party Size</label>
                        <select className='create-res-input' onChange={e => setCapacity(e.target.value)} max={999} required>
                            <option value={''} selected disabled hidden>Please select the capacity</option>
                            {capacity_count.map(each => (
                               <option value={each} >{each}  people</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Occasion</label>
                        <select required className='create-res-input' onChange={e => setCuisine(e.target.value)} maxLength={30} >
                            <option value={''} selected disabled hidden>Please Select the Applicable Occasion</option>
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
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                            maxLength={300}
                            className='create-res-input'
                            height={'300px'}
                        ></input>
                    </div>

                </form >
                <button onClick={handleSubmit} disabled={isDisabled}>Submit</button>
            </div>
        </>

    )
}
