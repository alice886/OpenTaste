import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { createRestaurantThunk } from '../../store/restaurant'
import './create.css'

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
        history.push(`/restaurants/${newRestaurant.id}`)
    }


    return sessionUser && (
        <>
            <form className='create-new-restaurant'>
                <div>List Your Business</div>
                <div className='create-restaurant-container'>
                    {errors.map((error, ind) => (
                        <div className='create-res-error' key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <label>Name</label>
                    <input
                        type='text'
                        placeholder='Please enter the name here.'
                        onChange={e => setName(e.target.value)}
                        value={name}
                        maxLength={30}
                        className='create-res-input'
                    ></input>
                </div>
                <div>
                    <label>Price Range</label>
                    <select className='create-res-input' onChange={e => setPriceRange(e.target.value)}>
                        <option value={1} onClick={e => setPriceRange(e.target.value)}>$30 and under</option>
                        <option value={2} onClick={e => setPriceRange(e.target.value)}> $31 to $50</option>
                        <option value={3} onClick={e => setPriceRange(e.target.value)}> $50 to $100</option>
                        <option value={4} onClick={e => setPriceRange(e.target.value)}> $101 and over</option>
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
                    ></input>
                </div>
                <div>
                    <label>State</label>
                    <input
                        type='text'
                        placeholder='Please enter the state here.'
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
                        placeholder='Please enter the zip_code here.'
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
                        placeholder='Please enter the description here.'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        maxLength={300}
                        className='create-res-input'
                    ></input>
                </div>
                <div>
                    <label>Capacity</label>
                    <input
                        type='text'
                        placeholder='Please enter the capacity here.'
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
                        placeholder='Please enter the cuisine here.'
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
                    ></input>
                </div>
                <div>
                    <label>Business Hours: Close At</label>
                    <input
                        type='time'
                        onChange={e => setCloseTime(e.target.value)}
                        value={close_time}
                        className='create-res-input'
                    ></input>
                </div>
                <div>
                    <label>Cove Picture</label>
                    <input
                        type='text'
                        placeholder='Please add the cover picture link here.'
                        onChange={e => setCover(e.target.value)}
                        value={cover}
                        maxLength={300}
                        className='create-res-input'
                    ></input>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </form >
        </>

    )
}
