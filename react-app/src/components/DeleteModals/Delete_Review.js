import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeReviewThunk } from "../../store/review";
import './deleteConfirmation.css'

export default function DeleteReview({ setDeleteReview, reviewId, setShowEditReviewModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleDelete = async e => {
        e.preventDefault()
        await dispatch(removeReviewThunk(reviewId))
        setDeleteReview(false)
        setShowEditReviewModal(false)
    }

    return (
        <div className='delete-confirmation-modal'>
            <div className='delete-confirmation-question'>Are you sure you want to delete this review?</div>
            <div>
                <button className='delete-confirmation-yes' onClick={handleDelete}>Yes</button>|
                <button className='delete-confirmation-no' onClick={() => setDeleteReview(false)}>No</button>
            </div>
        </div>
    )
}
