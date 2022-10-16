import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Modal } from '../context/Modal';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { editReviewThunk, getMyReviewsThunk } from '../../store/review'
import { getAllRestaurantThunk } from '../../store/restaurant'
import DeleteReview from '../DeleteModals/Delete_Review';
import './review_modal.css'

export default function ReviewEditModal({ reviewRestaurant, reviewDate, reviewId, setShowEditReviewModal, theReview }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [partySize, setPartySize] = useState();
    const [reviewFood, setReviewFood] = useState(theReview?.food)
    const [reviewService, setReviewService] = useState(theReview?.service)
    const [reviewAmbience, setReviewAmbience] = useState(theReview?.ambience)
    const [reviewOverall, setReviewOverall] = useState(theReview?.overall)
    const [isDisabled, setIsDisabled] = useState(true)
    const [reviewComment, setReviewComment] = useState(theReview?.review_body)
    const [deleteReview, setDeleteReview] = useState(false)
    const [errors, setErrors] = useState([])

    const sessionUser = useSelector(state => state.session.user);

    const newErrors = [];
    useEffect(() => {
        if (!sessionUser) {
            newErrors.push('Please log in to complete your review!')
        }
        else {
            if (reviewFood * reviewService * reviewAmbience * reviewOverall == 0) {
                newErrors.push('Required fileds are marked with asterisk signs "*" ')
            }
            if (reviewComment?.length > 500) {
                newErrors.push('Max length for review body can only contain 500 characters.')
            }
        }
        setErrors(newErrors)
        if (!errors.length) setIsDisabled(false);
        else setIsDisabled(true)
    }, [errors?.length, newErrors?.length, reviewComment?.length, reviewFood * reviewService * reviewAmbience * reviewOverall])


    const handleUpdate = async e => {
        e.preventDefault();
        const payload = {
            food: reviewFood,
            service: reviewService,
            ambience: reviewAmbience,
            overall: reviewOverall,
            review_body: reviewComment,
            restaurant_id: reviewRestaurant?.id,
            reservation_id: reviewId,
        }
        const newreview = await dispatch(editReviewThunk(payload, theReview?.id))
        if (newreview) {
            window.alert('Thank you for your feedback!')
            history.push(`/myreservations`)
            setShowEditReviewModal(false)
        }
    }


    const starRange = [1, 2, 3, 4, 5];

    const handleFood = async e => {
        e.preventDefault();
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

    const whatRatingis = score => {
        if (score == 5) return 'Exceptional!';
        if (score == 4) return 'Awesome';
        if (score == 3) return 'Good';
        if (score == 2) return 'Okay';
        if (score == 1) return 'Welp...';
        if (score == 0) return '';
    }

    const handleDeleteConfirm = async e => {
        e.preventDefault();
        setDeleteReview(true);
    }
    // console.log('what is f/s/a/v', reviewFood, '/', reviewService, '/', reviewAmbience, '/', reviewOverall)
    // console.log('what is res id/ rev id', reviewRestaurant?.id, '/', reviewId)


    return (
        <div className='create-review-container-modal'>
            <button onClick={() => setShowEditReviewModal(false)}>x</button>
            {deleteReview && <Modal><DeleteReview setDeleteReview={setDeleteReview} reviewId={theReview?.id} setShowEditReviewModal={setShowEditReviewModal} /></Modal>}
            <form>
                <div>Update your review for {reviewRestaurant?.name} ?</div>
                <div>Rate your dinning reservation on {reviewDate}:</div>
                <div className="rating-button" >
                    <label>Food *</label>
                    {starRange.map((each) => {
                        return <button key={each} value={each} onClick={e => handleFood(e)}>
                            {(each <= reviewFood) ? <i class="fa-solid fa-star" ></i> : <i class="fa-regular fa-star"></i>}
                        </button>
                    })}
                    <div></div>
                    <label >{whatRatingis(reviewFood)}</label>
                </div>
                <div className="rating-button" >
                    <label>Service *</label>
                    {starRange.map((each) => {
                        return <button key={each} value={each} onClick={handleService}>
                            {(each <= reviewService) ? <i class="fa-solid fa-star"></i> : <i class="fa-regular fa-star"></i>}
                        </button>
                    })}
                    <div></div>
                    <label>{whatRatingis(reviewService)}</label>
                </div>
                <div className="rating-button" >
                    <label>Ambience *</label>
                    {starRange.map((each) => {
                        return <button key={each} value={each} onClick={handleAmbience}>
                            {(each <= reviewAmbience) ? <i class="fa-solid fa-star"></i> : <i class="fa-regular fa-star"></i>}
                        </button>
                    })}
                    <div></div>
                    <label>{whatRatingis(reviewAmbience)}</label>
                </div>
                <div className="rating-button" >
                    <label>Overall *</label>
                    {starRange.map((each) => {
                        return <button key={each} className="rating-stars" value={each} onClick={handleOverall}>
                            {(each <= reviewOverall) ? <i class="fa-solid fa-star"></i> : <i class="fa-regular fa-star"></i>}
                        </button>
                    })}
                    <div></div>
                    <label>{whatRatingis(reviewOverall)}</label>
                </div>
                <div className="rating-comments">
                    <textarea
                        placeholder='Reviewing with comments is optional'
                        maxLength={501}
                        value={reviewComment}
                        onChange={e => setReviewComment(e.target.value)}
                    >
                    </textarea>
                </div>
                <div className='review-errormsg-container'>
                    {errors.map((error, ind) => (
                        <div key={ind} className='review-error-msg'>* {error}</div>
                    ))}
                </div>
                <div className='review-butt-container'>
                    <button className='review-submit' disabled={isDisabled} onClick={handleUpdate}>Update</button>
                    <button className='review-delete' onClick={handleDeleteConfirm}>Delete Review</button>
                </div>
            </form>
        </div>


    )
}
