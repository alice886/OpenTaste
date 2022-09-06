import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createRestaurantThunk } from '../../store/restaurant'
import './restaurant_create.css'

export default function ListNewRestaurant() {
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

    const states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA',
        'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME',
        'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM',
        'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX',
        'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY']

    const capacity_count = []
    for (let i = 10; i < 301; i += 10) {
        capacity_count.push(i)
    }

    const cuisine_count = ['American', 'Italian', 'Steakhouse', 'Seafood', 'French', 'Indian', 'Mexican',
        'Japanese', 'Chinese', 'Spanish', 'Greek', 'Asian', 'Continental', 'Filipino', 'Café', 'Wine',
        'Winery', 'Irish', 'Fushion/Eclectic', 'Tapas/Small Plates', 'Turkish', 'Persian', 'Burmese', 'Other']


    const zipcodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
    const coverRegex = /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$/;

    const newErrors = [];

    useEffect(() => {
        if (!sessionUser) {
            newErrors.push('Please log in')
        }
        else {
            if (name === undefined) {
                newErrors.push('* Please enter the name of your restaurant.')
            }
            if (price_range === undefined) {
                newErrors.push('* Please select a Price Range.')
            }
            if (address === undefined || city === undefined || state === undefined) {
                newErrors.push('* Please enter a valid address and make sure it has all the necessary informations (address/city/state info are required).')
            }
            if (!zip_code?.match(zipcodeRegex)) {
                newErrors.push('* Please enter valid 5 digits zip code')
            }
            if (description && description.length > 500) {
                newErrors.push('* You may only enter descriptions in 500 character.')
            }
            if (capacity === undefined) {
                newErrors.push('* Please select a capacity for your restaurant.')
            }
            if (cuisine === undefined) {
                newErrors.push('* Please select a cuisine type for your restaurant.')
            }
            if (cover === undefined || !cover?.match(coverRegex)) {
                newErrors.push('* Please input a valid picture address that ends with .jpg/.png/.gif/.jpeg.')
                newErrors.push('* E.g. "https://example.com/image.jpg/"')
                newErrors.push('* Horizontal picture is recommended for your restaurant cover.')
            }
            if (open_time === undefined || close_time === undefined) {
                newErrors.push('* Please select both Open Time and Close Time to specify your business hours.')
            }
            if (open_time > close_time) {
                newErrors.push('* Your close time may not be earlier than your open time.')
            }
            if ((close_time?.slice(0, 2) - open_time?.slice(0, 2)) < 4) {
                newErrors.push('* Your restaurant must have minimum 4 hours of open time.')
            }
            if ((close_time?.slice(0, 2) - open_time?.slice(0, 2)) === 4) {
                if (close_time?.slice(3, 5) < open_time?.slice(3, 5)) {
                    newErrors.push('* Your restaurant must have minimum 4 hours of open time.')
                }
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
    console.log(name)
    console.log(price_range)
    console.log(capacity)
    console.log('open time', open_time?.slice(0, 2))
    console.log('open time', open_time?.slice(3, 5))
    console.log('close time', close_time)
    console.log('open time', close_time?.slice(0, 2) - open_time?.slice(0, 2))
    console.log('type of zip', typeof zip_code)


    return sessionUser && (
        <>
            <div className='create-container'>
                <div className='create-title'>List Your Restaurant Now</div>
                <div className='create-form-container'>
                    <div className='create-error'>
                        {errors?.map((error, ind) => (
                            <div className='create-res-error' key={ind}>{error}</div>
                        ))}
                    </div>
                    <form className='create-new-restaurant'>
                        <div className='left-create'>
                            <div >
                                <label>Name</label>
                                <input
                                    type='text'
                                    placeholder='Please enter the name here.'
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                    maxLength={30}
                                    className='create-res-input'
                                    required
                                ></input>
                            </div>
                            <div>
                                <label>Price Range</label>
                                <select className='create-res-input' onChange={e => setPriceRange(e.target.value)} required>
                                    <option value={''} selected disabled hidden> Choose a price range </option>
                                    <option value={1} >$30 and under</option>
                                    <option value={2} > $31 to $50</option>
                                    <option value={3} > $50 to $100</option>
                                    <option value={4} > $101 and over</option>
                                </select>
                            </div >
                            <div>
                                <label>Address</label>
                                <input
                                    type='text'
                                    placeholder='Please enter the address here.'
                                    onChange={e => setAddress(e.target.value)}
                                    value={address}
                                    maxLength={30}
                                    className='create-res-input'
                                    required
                                ></input>
                            </div>
                            <div>
                                <label>City</label>
                                <input
                                    type='text'
                                    placeholder='Please enter the city here.'
                                    onChange={e => setCity(e.target.value)}
                                    value={city}
                                    maxLength={30}
                                    className='create-res-input'
                                    required
                                ></input>
                            </div>
                            <div>
                                <label>State</label>
                                <select className='create-res-input' onChange={e => setState(e.target.value)} required >
                                    <option value={''} selected disabled hidden>Choose the state</option>
                                    {states.map(state => (
                                        <option value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Zip Code</label>
                                <input
                                    type='text'
                                    placeholder='Please enter the zip code here.'
                                    onChange={e => setZipCode(e.target.value)}
                                    value={zip_code}
                                    maxLength={5}
                                    className='create-res-input'
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className='right-create'>
                            <div>
                                <label>Capacity</label>
                                <select className='create-res-input' onChange={e => setCapacity(e.target.value)} max={999} required>
                                    <option value={''} selected disabled hidden>Please select the capacity</option>
                                    {capacity_count.map(each => (
                                        <option value={each} >{each}  people</option>
                                    ))}
                                    <option value={999} >300 + people</option>
                                </select>
                            </div>
                            <div>
                                <label>Cuisine</label>
                                <select required className='create-res-input' onChange={e => setCuisine(e.target.value)} maxLength={30} >
                                    <option value={''} selected disabled hidden>Please select the cuisine</option>
                                    {cuisine_count.map(each => (
                                        <option value={each} >{each}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Open At</label>
                                <input
                                    type='time'
                                    onChange={e => setOpenTime(e.target.value)}
                                    value={open_time}
                                    className='create-res-input'
                                    required
                                ></input>
                            </div>
                            <div>
                                <label>Close At</label>
                                <input
                                    type='time'
                                    onChange={e => setCloseTime(e.target.value)}
                                    value={close_time}
                                    className='create-res-input'
                                    required
                                ></input>
                            </div>
                            <div>
                                <label>Cover Picture</label>
                                <input
                                    type='text'
                                    placeholder='Please add the cover picture link here.'
                                    onChange={e => setCover(e.target.value)}
                                    value={cover}
                                    maxLength={300}
                                    className='create-res-input'
                                    required
                                ></input>
                            </div>
                            <div>
                                <label>Description</label>
                                <input
                                    type='textarea'
                                    placeholder='Please enter the description here. &#10; You may leave this field empty.'
                                    onChange={e => setDescription(e.target.value)}
                                    value={description}
                                    maxLength={300}
                                    className='create-res-input'
                                    height={'300px'}
                                ></input>
                            </div>
                        </div>
                    </form >
                </div>
                <button onClick={handleSubmit} disabled={isDisabled}>Submit</button>
            </div>
        </>

    )
}
