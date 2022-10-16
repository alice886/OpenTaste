const GET_REVIEW = 'review/GET_REVIEW';
const GET_MYREVIEW = 'review/GET_MYREVIEW';
const POST_REVIEW = 'review/POST_REVIEW';
const EDIT_REVIEW = 'review/EDIT_REVIEW';
const DELETE_REVIEW = 'review/DELETE_REVIEW';

const getAllReviews = reviews => ({
    type: GET_REVIEW,
    payload: reviews
});

const getMyReviews = review => ({
    type: GET_MYREVIEW,
    payload: review
});

const createAReview = review => ({
    type: POST_REVIEW,
    payload: review
})

const editAReview = review => ({
    type: EDIT_REVIEW,
    payload: review
})

const removeAReview = id => ({
    type: DELETE_REVIEW,
    payload: id
})

export const getAllReviewsThunk = (id) => async dispatch => {
    const response = await fetch(`/api/restaurants/${id}/reviews`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const allReviews = await response.json();
        dispatch(getAllReviews(allReviews));
        return allReviews;
    } else {
        const data = await response.json();
        return data.errors;
    }
}

export const getMyReviewsThunk = () => async dispatch => {
    const response = await fetch('/api/reviews/myreviews', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const allMyReviews = await response.json();
        dispatch(getMyReviews(allMyReviews));
        return allMyReviews;
    } else {
        const data = await response.json();
        return data.errors;
    }
}

export const createReviewThunk = reservation => async dispatch => {
    const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify(reservation),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    if (response.ok) {
        const newReview = await response.json();
        dispatch(createAReview(newReview));
        console.log('its ok -01', newReview)
        return newReview;
    } else {
        const data = await response.json();
        console.log('its not ok -02', data.errors)
        return data.errors;
    }
}

export const editReviewThunk = (reviewpayload, id) => async dispatch => {
    const response = await fetch(`/api/reviews/myreviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify(reviewpayload),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    if (response.ok) {
        const editReview = await response.json();
        dispatch(editAReview(editReview));
        console.log('ok')
        return editReview;
    } else {
        const data = await response.json();
        console.log('NOT ok', data.errors)
        return data.errors;
    }
}

export const removeReviewThunk = (id) => async dispatch => {
    const response = await fetch(`/api/reviews/myreviews/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }

    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeAReview(id));
        console.log('ok', id)
        return data;
    } else {
        const data = await response.json();
        console.log('not ok', data)
        return data.errors;
    }
}

const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_REVIEW: {
            let newState = {};
            action.payload.reviews.map(review => newState[review.id] = review);
            newState.allreviews = [...action.payload.reviews]
            return newState;
        }
        case GET_MYREVIEW: {
            const newState = {};
            action.payload.reviews.forEach(review => newState[review.id] = review);
            newState.myreviews = [...action.payload.reviews]
            return newState;
        }
        case POST_REVIEW: {
            // const newState = { ...action.payload, [action.payload.id]: action.payload }
            const newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState;
        }
        case EDIT_REVIEW: {
            return { ...state, [action.payload.id]: action.payload };
        }
        case DELETE_REVIEW: {
            const newState = { ...state }
            delete newState[action.payload]
            return newState;
        }
        default:
            return state;
    }
}

export default reviewReducer;
