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
    const [open_time, setOpenTime] = useState('');
    const [close_time, setCloseTime] = useState('');
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    // const theRestaurant = useSelector(state => state.restaurant?.restaurant);
    const myrestaurants = useSelector(state => state.restaurant.restaurants);

    let theRestaurant;
    for (let i of myrestaurants) {
        if (i.id === resId) {
            theRestaurant = i
        }
    }

    useEffect(() => {
        dispatch(getAllRestaurantThunk()).then(() => setIsLoaded(true))
    }, [dispatch, theRestaurant?.id])

    const newErrors = [];

    useEffect(() => {
        if (!sessionUser) {
            newErrors.push('Please log in')
        }
        // else {
        //     if (price_range == undefined) {
        //         newErrors.push('* Please give this product a price range.')
        //     }
        //     if (description.length > 500) {
        //         newErrors.push('You may only enter description in 500 characters.')
        //     }
        // }
        setErrors(newErrors)
        if (!errors.length) setIsDisabled(false);
        else setIsDisabled(true)
    }, [errors.length])

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
                <h3>Edit Your Business</h3>
                <button onClick={handleDelete} className='edit-restaurant-delete'>Delete The Restaurant</button>
                {showDelete && <Modal><DeleteRestaurant setShowDelete={setShowDelete} resId={resId} setShowModal={setShowModal} object='restaurant' /></Modal>}
                <div>
                    {errors.map((error, ind) => (
                        <div className='create-res-error' key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <label> { }{theRestaurant?.name}</label>
                    <br></br>
                    <label> { }{theRestaurant?.price_range}</label>
                    <br></br>
                    <label> { }{theRestaurant?.address}</label>
                    <br></br>
                    <label> { }{theRestaurant?.city}</label>
                    <br></br>
                    <label> { }{theRestaurant?.state}</label>
                    <br></br>
                    <label> { }{theRestaurant?.zip_code}</label>
                    <br></br>
                    <label> { }{theRestaurant?.description}</label>
                    <br></br>
                    <label> { }{theRestaurant?.capacity}</label>
                    <br></br>
                    <label> { }{theRestaurant?.cuisine}</label>
                </div>
                <br></br>
                <div>
                    <label>Name</label>
                    <input
                        type='text'
                        placeholder='Please update the name here.'
                        onChange={e => setName(e.target.value)}
                        value={name}
                        maxLength={30}
                        className='create-res-input'
                    ></input>
                </div>
                <div>
                    <label>Price Range</label>
                    <select className='create-res-input' onChange={e => setPriceRange(e.target.value)}>
                        <option value={''} selected disabled hidden> Choose a price range </option>
                        <option value={1} >$30 and under</option>
                        <option value={2} > $31 to $50</option>
                        <option value={3} > $50 to $100</option>
                        <option value={4} > $101 and over</option>
                    </select>
                </div>
                <div>
                    <label>Address</label>
                    <input
                        type='text'
                        placeholder='Please update the address here.'
                        onChange={e => setAddress(e.target.value)}
                        value={address}
                        maxLength={30}
                        className='create-res-input'
                    ></input>
                </div>
                <div>
                    <label>City</label>
                    <input
                        type='text'
                        placeholder='Please update the city here.'
                        onChange={e => setCity(e.target.value)}
                        value={city}
                        maxLength={30}
                        className='create-res-input'
                    ></input>
                </div>
                <div>
                    <label>State</label>
                    <input
                        type='text'
                        placeholder='Please update the state here.'
                        onChange={e => setState(e.target.value)}
                        value={state}
                        maxLength={30}
                        className='create-res-input'
                    ></input>
                </div>
                <div>
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
                <div>
                    <label>Description</label>
                    <input
                        type='textarea'
                        placeholder='Please update the description here.'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        maxLength={30}
                        className='create-res-input'
                    ></input>
                </div>
                <div>
                    <label>Capacity</label>
                    <input
                        type='text'
                        placeholder='Please update the capacity here.'
                        onChange={e => setCapacity(e.target.value)}
                        value={capacity}
                        max={200}
                        className='create-res-input'
                    ></input>
                </div>
                <div>
                    <label>Cuisine</label>
                    <input
                        type='text'
                        placeholder='Please update the cuisine here.'
                        onChange={e => setCuisine(e.target.value)}
                        value={cuisine}
                        maxLength={30}
                        className='create-res-input'
                    ></input>
                </div>
                <div>
                    <label>Business Hours: Open At</label>
                    <input
                        type='time'
                        onChange={e => setOpenTime(e.target.value)}
                        value={open_time}
                        className='create-res-input'
                        defaultValue={''}
                    ></input>
                </div>
                <div>
                    <label>Business Hours: Close At</label>
                    <input
                        type='time'
                        onChange={e => setCloseTime(e.target.value)}
                        value={close_time}
                        className='create-res-input'
                        defaultValue={''}
                    ></input>
                </div>
                <div>
                    <label>Cove Picture</label>
                    <input
                        type='text'
                        placeholder='Please update the cover picture link here.'
                        onChange={e => setCover(e.target.value)}
                        value={cover}
                        maxLength={300}
                        className='create-res-input'
                    ></input>
                </div>
                <button onClick={handleSubmit} className='edit-restaurant-submit'>Submit Changes</button>
            </form>
        </>

    )
}
