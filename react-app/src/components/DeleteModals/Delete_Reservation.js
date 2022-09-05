import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeReservationThunk } from "../../store/reservation";
import './deleteConfirmation.css'

export default function DeleteReservation({ setShowDeleteReserv, resId, setShowEditReser, object }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleDelete = async e => {
        e.preventDefault()
        await dispatch(removeReservationThunk(resId))
        setShowDeleteReserv(false)
        setShowEditReser(false)
        history.push('/myreservations')
        console.log('delete modal , id is ', resId)
    }

    return (
        <div className='delete-confirmation-modal'>
            <h1 className='delete-confirmation-question'>Are you sure you want to delete this {object}?</h1>
            <button className='delete-confirmation-yes' onClick={handleDelete}>Yes</button>
            <button className='delete-confirmation-no' onClick={() => setShowDeleteReserv(false)}>No</button>
        </div>
    )
}
