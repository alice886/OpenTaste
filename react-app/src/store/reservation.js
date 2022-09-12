const GET_RESERVATION = 'reservation/GET_RESERVATION';
const GET_ONERESERVATION = 'reservation/GET_ONERESERVATION';
const POST_RESERVATION = 'reservation/POST_RESERVATION';
const EDIT_RESERVATION = 'reservation/EDIT_RESERVATION';
const DELETE_RESERVATION = 'reservation/DELETE_RESERVATION';

const getAllReservations = reservations => ({
    type: GET_RESERVATION,
    payload: reservations
});

const getReservationDetail = reservation => ({
    type: GET_ONERESERVATION,
    payload: reservation
});

const createAReservation = reservation => ({
    type: POST_RESERVATION,
    payload: reservation
})

const editAReservation = reservation => ({
    type: EDIT_RESERVATION,
    payload: reservation
})

const removeAReservation = id => ({
    type: DELETE_RESERVATION,
    payload: id
})

export const getAllReservationsThunk = (id) => async dispatch => {
    const response = await fetch(`/api/restaurants/${id}/reservations`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const allReservations = await response.json();
        dispatch(getAllReservations(allReservations));
        return allReservations;
    } else {
        const data = await response.json();
        return data.errors;
    }
}

export const getMyReservationsThunk = () => async dispatch => {
    const response = await fetch('/api/users/myreservations', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const allMyReservations = await response.json();
        dispatch(getAllReservations(allMyReservations));
        return allMyReservations;
    } else {
        const data = await response.json();
        return data.errors;
    }
}

export const getReservationDetailThunk = id => async dispatch => {
    const response = await fetch(`/api/reservations/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const theReservation = await response.json();
        dispatch(getReservationDetail(theReservation));
        return theReservation;
    } else {
        const data = await response.json();
        return data.errors;
    }
}

export const createReservationThunk = reservation => async dispatch => {
    const response = await fetch(`/api/reservations`, {
        method: 'POST',
        body: JSON.stringify(reservation),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    if (response.ok) {
        const newReservation = await response.json();
        dispatch(createAReservation(newReservation));
        console.log('its ok -01', newReservation)
        return newReservation;
    } else {
        const data = await response.json();
        console.log('its not ok -02', data.errors)
        return data.errors;
    }
}

export const editReservationThunk = (reservation, id) => async dispatch => {
    const response = await fetch(`/api/reservations/${id}`, {
        method: 'PUT',
        body: JSON.stringify(reservation),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    if (response.ok) {
        const editReservation = await response.json();
        dispatch(editAReservation(editReservation));
        console.log('ok')
        return editReservation;
    } else {
        const data = await response.json();
        console.log('NOT ok', data.errors)
        return data.errors;
    }
}

export const removeReservationThunk = (id) => async dispatch => {
    const response = await fetch(`/api/reservations/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }

    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeAReservation(id));
        console.log('ok', id)
        return data;
    } else {
        const data = await response.json();
        console.log('not ok', data)
        return data.errors;
    }
}

const reservationReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_RESERVATION: {
            const newState = {};
            action.payload.reservations.forEach(reservation => newState[reservation.id] = reservation);
            newState.reservations = [...action.payload.reservations]
            return newState;
        }
        case GET_ONERESERVATION: {
            const newState = {};
            newState.reservation = action.payload
            return newState;
        }
        case POST_RESERVATION: {
            // const newState = { ...action.payload, [action.payload.id]: action.payload }
            const newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState;
        }
        case EDIT_RESERVATION: {
            return { ...state, [action.payload.id]: action.payload };
        }
        case DELETE_RESERVATION: {
            const newState = { ...state }
            delete newState[action.payload]
            return newState;
        }
        default:
            return state;
    }
}

export default reservationReducer;
