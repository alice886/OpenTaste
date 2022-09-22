import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeRestaurantThunk } from "../../store/restaurant";
import './deleteConfirmation.css'

export default function DeleteRestaurant({ setShowDelete, resId, setShowModal, object }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleDelete = async e => {
        e.preventDefault()
        await dispatch(removeRestaurantThunk(resId))
        setShowDelete(false)
        setShowModal(false)
        history.push('/myrestaurants')
    }

    return (
        <div className='delete-confirmation-modal'>
            <div className='delete-confirmation-question'>Are you sure you want to delete this {object}?</div>
            <div>
                <button className='delete-confirmation-yes' onClick={handleDelete}>Yes</button>|
                <button className='delete-confirmation-no' onClick={() => setShowDelete(false)}>No</button>
            </div>
        </div>
    )
}
