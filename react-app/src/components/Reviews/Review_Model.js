import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { createReservationThunk } from '../../store/reservation'
import { getAllRestaurantThunk } from '../../store/restaurant'

export default function ReviewModal({}) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const restaurants = useSelector(state => state.restaurant.restaurants)
    const [partySize, setPartySize] = useState();



    // useEffect(() => {
    //     if (!sessionUser) {
    //         newErrors.push('Please log in to complete your reservation!')
    //     }
    //     if (sessionUser?.id === therestaurant?.owner_id) {
    //         newErrors.push('You may not reserve your own restaurant.')
    //     }
    //     else {
            
    //         if (specialRequest?.match(inputRegex)) {
    //             newErrors.push('You may not have 2 consecutive whitespaces in the special request field')
    //         }
    //     }
    //     setErrors(newErrors)
    //     if (!errors.length) setIsDisabled(false);
    //     else setIsDisabled(true)
    // }, [errors.length, newErrors.length, reserveDate, reserveTime, partySize, occasion, specialRequest])

    const handleSubmit = async e => {
        e.preventDefault();
        const payload = {
            
        }

        
    }


    return (
        <div className='create-reservation-container-modal'>
            lalalalalal
        </div>


    )
}
