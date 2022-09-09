import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom';
import { Modal } from '../context/Modal'
import DeleteRestaurant from '../DeleteModals/Delete_Restaurant'
import { editRestaurantThunk, getRestaurantDetailThunk, getAllRestaurantThunk } from '../../store/restaurant'
import Uploadicon from '../../icons/Uploadicon.png';
import Deleteicon from '../../icons/Deleteicon.png';
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
    const [zip_code, setZipCode] = useState(String(theRestaurant?.zip_code));
    const [description, setDescription] = useState(theRestaurant?.description);
    const [capacity, setCapacity] = useState(theRestaurant?.capacity);
    const [cuisine, setCuisine] = useState(theRestaurant?.cuisine);
    const [cover, setCover] = useState(theRestaurant?.cover);
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
    }, [dispatch, theRestaurant?.id, showModal])

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

    const priceRangeDetail = ['', '$30 and under', '$31 to $50', '$50 to $100', '$101 and over'];

    const zipcodeRegex = /^[0-9]{5}(?:-[0-9]{4})?$/;
    const coverRegex = /^http[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$/;
    const inputRegex = /\s\s/;

    const newErrors = [];

    useEffect(() => {
        if (!sessionUser) {
            newErrors.push('Please log in')
        }
        else {
            if (zip_code.length !== 5 || !zip_code.match(zipcodeRegex)) {
                newErrors.push('Please enter valid 5 digits zip code')
            }
            if (cover && !cover?.match(coverRegex)) {
                newErrors.push('* Please input a valid picture address that ends with .jpg/.png/.gif/.jpeg')
                newErrors.push('* E.g. "https://example.com/image.jpg/"')
                newErrors.push('* Please try another image link')
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
            if (name?.length < 2 || address?.length < 2 || city?.length < 2) {
                newErrors.push('Please at least enter 2 characters in input fields.')
            }
            if (name?.match(inputRegex)) {
                newErrors.push("You may not have 2 consecutive whitespaces in the name field.")
            }
            if (address?.match(inputRegex)) {
                newErrors.push("You may not have 2 consecutive whitespaces in the address field.")
            }
            if (city?.match(inputRegex)) {
                newErrors.push("You may not have 2 consecutive whitespaces in the city field.")
            }
            if (description?.match(inputRegex)) {
                newErrors.push("You may not have 2 consecutive whitespaces in the description field.")
            }
            if (name?.length > 30) {
                newErrors.push('You may only enter name in 30 characters.')
            }
            if (address?.length > 30) {
                newErrors.push('You may only enter address in 30 characters.')
            }
            if (city?.length > 30) {
                newErrors.push('You may only enter city name in 30 characters.')
            }
            if (description?.length > 500) {
                newErrors.push('You may only enter description in 500 characters.')
            }
        }
        setErrors(newErrors)
        if (!errors.length) setIsDisabled(false);
        else setIsDisabled(true)
    }, [errors.length, open_time, close_time, description, cover, name, city, address, zip_code])


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
                <div className='edit-restaurant-imgdelete'>
                    <div className='edit-restaurant-title'>Edit Your Business</div>
                    <img src={cover} height={'90px'} />
                    <div >{name}</div>
                </div>
                {showDelete && <Modal><DeleteRestaurant setShowDelete={setShowDelete} resId={resId} setShowModal={setShowModal} object='restaurant' /></Modal>}
                <div>
                    {errors.map((error, ind) => (
                        <div className='edit-res-error' key={ind}>* {error}</div>
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
                            maxLength={31}
                            className='edit-res-input'
                            pattern="[^\s]+"
                            required
                        ></input>
                        <label>Price Range</label>
                        <select className='edit-res-input' onChange={e => setPriceRange(e.target.value)}>
                            <option value={price_range} selected hidden> {priceRangeDetail[price_range]} </option>
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
                            maxLength={31}
                            className='edit-res-input'
                            required
                        ></input>
                        <label>City</label>
                        <input
                            type='text'
                            placeholder='Please update the city here.'
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            maxLength={31}
                            className='edit-res-input'
                            required
                        ></input>
                        <label>State</label>
                        <select className='edit-res-input' onChange={e => setState(e.target.value)} required >
                            <option value={state} selected hidden>{state}</option>
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
                            maxLength={5}
                            className='edit-res-input'
                            required
                        ></input>
                    </div>
                    <div className='edit-restaurant-right'>
                        <label>Capacity</label>
                        <select className='edit-res-input' onChange={e => setCapacity(e.target.value)} max={999} required>
                            {/* <option value={''} selected disabled hidden>Please select the capacity</option> */}
                            <option value={capacity} selected hidden>{capacity} people</option>
                            {capacity_count.map(each => (
                                <option value={each} >{each}  people</option>
                            ))}
                            <option value={999} >300 + people</option>
                        </select>
                        <label>Cuisine</label>
                        <select required className='edit-res-input' onChange={e => setCuisine(e.target.value)} maxLength={30} >
                            <option value={cuisine} selected hidden>{cuisine}</option>
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
                            className='edit-res-input'
                            defaultValue={''}
                            required
                        ></input>
                        <div>Current Closetime: {theRestaurant?.close_time}</div>
                        <label>Update Business Hours: Close At</label>
                        <input
                            type='time'
                            onChange={e => setCloseTime(e.target.value)}
                            value={close_time}
                            className='edit-res-input'
                            defaultValue={''}
                            required
                        ></input>
                        <label>Cover Picture</label>
                        <input
                            type='text'
                            placeholder='Please update the cover picture link here.'
                            onChange={e => setCover(e.target.value)}
                            value={cover}
                            maxLength={300}
                            className='edit-res-input'
                            required
                        ></input>
                    </div>
                </div>
                <div className='edit-restaurant-description'>
                    <label>Description</label>
                    <textarea
                        type='textarea'
                        placeholder='Please update the description here.'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        maxLength={501}
                        className='edit-res-input'
                        rows="5"
                    ></textarea>
                </div>
                <div className='edit-restaurant-button'>
                    {/* <button onClick={handleSubmit} className='edit-restaurant-submit' disabled={isDisabled}>Submit Changes</button>
                    <button onClick={handleDelete} className='edit-restaurant-delete'>Delete The Restaurant</button> */}
                    <button onClick={handleSubmit} disabled={isDisabled} > Update This Restaurant
                        {/* <input className='edit-restaurant-img' type='image' src={Uploadicon} alt='edit icon' disabled={isDisabled}></input> */}
                    </button>
                    <button onClick={handleDelete}> Delete This Restaurant
                        {/* <input className='edit-restaurant-img' type='image' src={Deleteicon} alt='edit icon'></input> */}
                    </button>
                </div>
            </form>
        </>

    )
}
