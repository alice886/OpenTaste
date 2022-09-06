import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Modal } from '../context/Modal'
import DeleteRestaurant from '../DeleteModals/Delete_Restaurant'
import { editRestaurantThunk, getRestaurantDetailThunk, getAllRestaurantThunk } from '../../store/restaurant'
import './restaurant_edit.css'

export default function EditRestaurant({ resId, showModal, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const myrestaurants = useSelector(state => state.restaurant.restaurants);
    let theRestaurant;
    for (let i of myrestaurants) {
        if (i.id === resId) {
            theRestaurant = i
        }
    }

    const [name, setName] = useState(theRestaurant?.name);
    const [price_range, setPriceRange] = useState(theRestaurant?.price_range);
    const [address, setAddress] = useState(theRestaurant?.address);
    const [city, setCity] = useState(theRestaurant?.city);
    const [state, setState] = useState(theRestaurant?.state);
    const [zip_code, setZipCode] = useState(theRestaurant?.zip_code);
    const [description, setDescription] = useState(theRestaurant?.description);
    const [capacity, setCapacity] = useState(theRestaurant?.capacity);
    const [cuisine, setCuisine] = useState(theRestaurant?.cuisine);
    const [cover, setCover] = useState();
    const [open_time, setOpenTime] = useState(theRestaurant?.open_time);
    const [close_time, setCloseTime] = useState(theRestaurant?.close_time);
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    // const theRestaurant = useSelector(state => state.restaurant?.restaurant);

    useEffect(() => {
        dispatch(getAllRestaurantThunk()).then(() => setIsLoaded(true))
    }, [dispatch, theRestaurant?.id])

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
            if (cover && !cover?.match(coverRegex)) {
                newErrors.push('* Please input a valid picture address that ends with .jpg/.png/.gif/.jpeg.')
                newErrors.push('* E.g. "https://example.com/image.jpg/"')
                newErrors.push('* Horizontal picture is recommended for your restaurant cover.')
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
            if (description.length > 500) {
                newErrors.push('You may only enter description in 500 characters.')
            }
        }
        setErrors(newErrors)
        if (!errors.length) setIsDisabled(false);
        else setIsDisabled(true)
    }, [errors.length,open_time,close_time, description,cover])

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            id: resId,
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
        const newRestaurant = await dispatch(editRestaurantThunk(payload));
        console.log('what the newres', newRestaurant)
        history.push(`/restaurants/${newRestaurant?.id}`)
        setShowModal(false)
    }

    const handleBack = async e => {
        e.preventDefault();
        setShowModal(false);
        console.log('what is theRestaurant', theRestaurant)
    }

    const handleDelete = async e => {
        e.preventDefault();
        setShowDelete(true)
    }


    return sessionUser && isLoaded && (
        <>
            <button className='cancel-restaurant-edit' onClick={handleBack}>x</button>
            <form className='edit-restaurant'>
                <div className='edit-restaurant-title'>Edit Your Business</div>
                <button onClick={handleDelete} className='edit-restaurant-delete'>Delete The Restaurant</button>
                {showDelete && <Modal><DeleteRestaurant setShowDelete={setShowDelete} resId={resId} setShowModal={setShowModal} object='restaurant' /></Modal>}
                <div>
                    <img src={theRestaurant?.cover} height={'80px'} />
                </div>
                <div>
                    {errors.map((error, ind) => (
                        <div className='create-res-error' key={ind}>{error}</div>
                    ))}
                </div>
                <div className='edit-restaurant-grid'>
                    <div className='edit-restaurant-left'>
                        <label>Name</label>
                        <input
                            type='text'
                            placeholder='Please update the name here.'
                            onChange={e => setName(e.target.value)}
                            value={name}
                            maxLength={30}
                            className='create-res-input'
                        ></input>
                        <label>Price Range</label>
                        <select className='create-res-input' onChange={e => setPriceRange(e.target.value)}>
                            <option value={''} selected disabled hidden> Choose a price range </option>
                            <option value={1} >$30 and under</option>
                            <option value={2} > $31 to $50</option>
                            <option value={3} > $50 to $100</option>
                            <option value={4} > $101 and over</option>
                        </select>
                        <label>Address</label>
                        <input
                            type='text'
                            placeholder='Please update the address here.'
                            onChange={e => setAddress(e.target.value)}
                            value={address}
                            maxLength={30}
                            className='create-res-input'
                        ></input>
                        <label>City</label>
                        <input
                            type='text'
                            placeholder='Please update the city here.'
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            maxLength={30}
                            className='create-res-input'
                        ></input>
                        <label>State</label>
                        <select className='create-res-input' onChange={e => setState(e.target.value)} required >
                            <option value={''} selected disabled hidden>Choose the state</option>
                            {states.map(state => (
                                <option value={state}>{state}</option>
                            ))}
                        </select>
                        <label>Zip Code</label>

                        <input
                            type='text'
                            placeholder='Please update the zip_code here.'
                            onChange={e => setZipCode(e.target.value)}
                            value={zip_code}
                            maxLength={30}
                            className='create-res-input'
                        ></input>
                    </div>
                    <div className='edit-restaurant-right'>
                        <label>Capacity</label>
                        <select className='create-res-input' onChange={e => setCapacity(e.target.value)} max={999} required>
                            <option value={''} selected disabled hidden>Please select the capacity</option>
                            {capacity_count.map(each => (
                                <option value={each} >{each}  people</option>
                            ))}
                            <option value={999} >300 + people</option>
                        </select>
                        <label>Cuisine</label>
                        <select required className='create-res-input' onChange={e => setCuisine(e.target.value)} maxLength={30} >
                            <option value={''} selected disabled hidden>Please select the cuisine</option>
                            {cuisine_count.map(each => (
                                <option value={each} >{each}</option>
                            ))}
                        </select>
                        <div>Current Opentime: {theRestaurant?.open_time}</div>
                        <label>Update Business Hours: Open At</label>
                        <input
                            type='time'
                            onChange={e => setOpenTime(e.target.value)}
                            value={open_time}
                            className='create-res-input'
                            defaultValue={''}
                        ></input>
                        <div>Current Closetime: {theRestaurant?.close_time}</div>
                        <label>Update Business Hours: Close At</label>
                        <input
                            type='time'
                            onChange={e => setCloseTime(e.target.value)}
                            value={close_time}
                            className='create-res-input'
                            defaultValue={''}
                        ></input>
                        <label>Cover Picture</label>
                        <input
                            type='text'
                            placeholder='Please update the cover picture link here.'
                            onChange={e => setCover(e.target.value)}
                            value={cover}
                            maxLength={300}
                            className='create-res-input'
                        ></input>
                    </div>
                </div>
                <div className='edit-restaurant-description'>
                    <label>Description</label>
                    <input
                        type='textarea'
                        placeholder='Please update the description here.'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        maxLength={30}
                        className='create-res-input'
                        rows="5"
                    ></input>
                </div>
                <button onClick={handleSubmit} className='edit-restaurant-submit'>Submit Changes</button>
            </form>
        </>

    )
}
