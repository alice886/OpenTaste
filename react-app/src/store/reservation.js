const GET_RESERVATION = 'restaurant/GET_RESERVATION';
const GET_ONERESERVATION = 'restaurant/GET_ONERESERVATION';
const POST_RESERVATION = 'restaurant/POST_RESERVATION';
const EDIT_RESERVATION = 'restaurant/EDIT_RESERVATION';
const DELETE_RESERVATION = 'restaurant/DELETE_RESERVATION';

const getAllReservations = restaurants => ({
    type: GET_RESERVATION,
    payload: restaurants
});

const getReservationDetail = restaurant => ({
    type: GET_ONERESERVATION,
    payload: restaurant
});

const createAReservation = restaurant => ({
    type: POST_RESERVATION,
    payload: restaurant
})

const editAReservation = restaurant => ({
    type: EDIT_RESERVATION,
    payload: restaurant
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
        const allRestaurant = await response.json();
        dispatch(getAllReservations(allRestaurant));
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
    } else {
        const data = await response.json();
        return data.errors;
    }
}

export const createReservationThunk = reservation => async dispatch => {
    const response = await fetch(`/api/reservations/`, {
        method: 'POST',
        body: JSON.stringify(reservation),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    if (response.ok) {
        const newReservation = await response.json();
        dispatch(createAReservation(newReservation));
        return newReservation;
    } else {
        const data = await response.json();
        // console.log('what is the matter -01', data)
        // console.log('what is the matter -02', data.errors)
        return data.errors;
    }
}

export const editReservationThunk = reservation => async dispatch => {
    const response = await fetch(`/api/reservations/${reservation.id}`, {
        method: 'PUT',
        body: JSON.stringify(reservation),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    if (response.ok) {
        const editReservation = await response.json();
        dispatch(editAReservation(editReservation));
        return editReservation;
    } else {
        const data = await response.json();
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
            newState.restaurant = action.payload
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
