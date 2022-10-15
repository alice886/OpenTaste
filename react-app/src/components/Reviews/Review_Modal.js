import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { createReservationThunk } from '../../store/reservation'
import { getAllRestaurantThunk } from '../../store/restaurant'
import './review_modal.css'

export default function ReviewModal({ }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const restaurants = useSelector(state => state.restaurant.restaurants)
    const [partySize, setPartySize] = useState();
    const [reviewFood, setReviewFood] = useState(0)
    const [reviewService, setReviewService] = useState(0)
    const [reviewAmbience, setReviewAmbience] = useState(0)
    const [reviewOverall, setReviewOverall] = useState(0)
    const [allstars, setAllstars] = useState('')



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
    const starRange = [1, 2, 3, 4, 5];

    const handleFood = async e => {
        e.preventDefault();
        console.log('what is the val of food', e.target.value)
        setReviewFood(e.target.value);
    }
    const handleService = async e => {
        e.preventDefault();
        setReviewService(e.target.value);
    }
    const handleAmbience = async e => {
        e.preventDefault();
        setReviewAmbience(e.target.value);
    }
    const handleOverall = async e => {
        e.preventDefault();
        setReviewOverall(e.target.value);
    }

    console.log('what is f/s/a/v', reviewFood, '/', reviewService, '/', reviewAmbience, '/', reviewOverall)


    return (
        <div className='create-reservation-container-modal'>
            <form>
                <div>How was your experience at XXX ?</div>
                <div>Rate your dinning experience now</div>
                <div className="rating-button" >
                    <label>Food</label>
                    {starRange.map((each) => {
                        return <button key={each} value={each} onClick={e => handleFood(e)}>
                            {(each <= reviewFood) ? <i class="fa-solid fa-star" ></i> : <i class="fa-regular fa-star"></i>}
                        </button>
                    })}
                </div>
                <div className="rating-button" >
                    <label>Service</label>
                    {starRange.map((each) => {
                        return <button key={each} value={each} onClick={handleService}>
                            {(each <= reviewService) ? <i class="fa-solid fa-star"></i> : <i class="fa-regular fa-star"></i>}
                        </button>
                    })}
                </div>
                <div className="rating-button" >
                    <label>Ambience</label>
                    {starRange.map((each) => {
                        return <button key={each} value={each} onClick={handleAmbience}>
                            {(each <= reviewAmbience) ? <i class="fa-solid fa-star"></i> : <i class="fa-regular fa-star"></i>}
                        </button>
                    })}
                </div>
                <div className="rating-button" >
                    <label>Overall</label>
                    {starRange.map((each) => {
                        return <button key={each} className="rating-stars" value={each} onClick={handleOverall}>
                            {(each <= reviewOverall) ? <i class="fa-solid fa-star"></i> : <i class="fa-regular fa-star"></i>}
                        </button>
                    })}
                </div>
            </form>
        </div>


    )
}
