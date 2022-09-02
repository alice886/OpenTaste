import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Modal } from '../context/Modal'
import DeleteRestaurant from '../DeleteRestaurant/Delete_Modal'
import { getRestaurantDetailThunk, editRestaurantThunk, getMyRestaurantThunk } from '../../store/restaurant'

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
    const [errors, setErrors] = useState([])
    const [isDisabled, setIsDisabled] = useState(true)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const sessionUser = useSelector(state => state.session.user);
    const theRestaurant = useSelector(state => state.restaurant?.restaurant);
    const myrestaurants = useSelector(state => state.restaurant.restaurants);

    useEffect(() => {
        dispatch(getRestaurantDetailThunk(resId)).then(() => setIsLoaded(true))
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
        }
        const newRestaurant = await dispatch(editRestaurantThunk(payload));
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
            <div>Edit Your Business</div>
            <form className='edit-restaurant'>
                <button onClick={handleBack}>X</button>
                <button onClick={handleDelete}>Delete The Restaurant</button>
                {showDelete && <Modal><DeleteRestaurant setShowDelete={setShowDelete} resId={resId} setShowModal={setShowModal} /></Modal>}
                <div>
                    {errors.map((error, ind) => (
                        <div className='create-res-error' key={ind}>{error}</div>
                    ))}
                </div>
                <label>Current name:{theRestaurant?.name}</label>
                <label>Current price_range:{theRestaurant?.price_range}</label>
                <label>Current address:{theRestaurant?.address}</label>
                <label>Current city:{theRestaurant?.city}</label>
                <label>Current state:{theRestaurant?.state}</label>
                <label>Current zip_code:{theRestaurant?.zip_code}</label>
                <label>Current description:{theRestaurant?.description}</label>
                <label>Current capacity:{theRestaurant?.capacity}</label>
                <label>Current cuisine:{theRestaurant?.cuisine}</label>
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
                    <label>Price Range</label>
                    <input
                        type='text'
                        placeholder='Please update the price_range here.'
                        onChange={e => setPriceRange(e.target.value)}
                        value={price_range}
                        maxLength={30}
                        className='create-res-input'
                    ></input>
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
                    <input
                        type='text'
                        placeholder='Please update the state here.'
                        onChange={e => setState(e.target.value)}
                        value={state}
                        maxLength={30}
                        className='create-res-input'
                    ></input>
                    <label>Zip Code</label>

                    <input
                        type='text'
                        placeholder='Please update the zip_code here.'
                        onChange={e => setZipCode(e.target.value)}
                        value={zip_code}
                        maxLength={30}
                        className='create-res-input'
                    ></input>
                    <label>Description</label>
                    <input
                        type='textarea'
                        placeholder='Please update the description here.'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        maxLength={30}
                        className='create-res-input'
                    ></input>
                    <label>Capacity</label>
                    <input
                        type='text'
                        placeholder='Please update the capacity here.'
                        onChange={e => setCapacity(e.target.value)}
                        value={capacity}
                        max={200}
                        className='create-res-input'
                    ></input>
                    <label>Cuisine</label>
                    <input
                        type='text'
                        placeholder='Please update the cuisine here.'
                        onChange={e => setCuisine(e.target.value)}
                        value={cuisine}
                        maxLength={30}
                        className='create-res-input'
                    ></input>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </form>
        </>

    )
}
