const GET_RESTAURANT = 'restaurant/GET_RESTAURANT';
const GET_ONERESTAURANT = 'restaurant/GET_ONERESTAURANT';
const POST_RESTAURANT = 'restaurant/POST_RESTAURANT';
const EDIT_RESTAURANT = 'restaurant/EDIT_RESTAURANT';
const DELETE_RESTAURANT = 'restaurant/DELETE_RESTAURANT';

const getAllRestaurant = restaurants => ({
    type: GET_RESTAURANT,
    payload: restaurants
});

const getRestaurantDetail = restaurant => ({
    type: GET_ONERESTAURANT,
    payload: restaurant
});

const createARestaurant = restaurant => ({
    type: POST_RESTAURANT,
    payload: restaurant
})

const editARestaurant = restaurant => ({
    type: EDIT_RESTAURANT,
    payload: restaurant
})

const removeARestaurant = id => ({
    type: DELETE_RESTAURANT,
    payload: id
})

export const getAllRestaurantThunk = () => async dispatch => {
    const response = await fetch('/api/restaurants/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const allRestaurant = await response.json();
        dispatch(getAllRestaurant(allRestaurant));
    } else {
        const data = await response.json();
        return data.errors;
    }
}

export const getMyRestaurantThunk = () => async dispatch => {
    const response = await fetch('/api/users/myrestaurants', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const allMyRestaurant = await response.json();
        dispatch(getAllRestaurant(allMyRestaurant));

    }
    // else if (response.status == 404) {
    //     const allMyRestaurant = await response.json();
    //     dispatch(getAllRestaurant({}));
    // }
    else {
        const data = await response.json();
        return data.errors;
    }
}

export const getRestaurantDetailThunk = id => async dispatch => {
    const response = await fetch(`/api/restaurants/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const theRestaurant = await response.json();
        dispatch(getRestaurantDetail(theRestaurant));
    } else {
        const data = await response.json();
        return data.errors;
    }
}

export const createRestaurantThunk = restaurant => async dispatch => {
    const response = await fetch(`/api/restaurants/`, {
        method: 'POST',
        body: JSON.stringify(restaurant),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    if (response.ok) {
        const newRestaurant = await response.json();
        dispatch(createARestaurant(newRestaurant));
        return newRestaurant;
    } else {
        const data = await response.json();
        // console.log('what is the matter -01', data)
        // console.log('what is the matter -02', data.errors)
        return data.errors;
    }
}

export const editRestaurantThunk = restaurant => async dispatch => {
    const response = await fetch(`/api/restaurants/${restaurant.id}`, {
        method: 'PUT',
        body: JSON.stringify(restaurant),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    if (response.ok) {
        const editRestaurant = await response.json();
        dispatch(editARestaurant(editRestaurant));
        return editRestaurant;
    } else {
        const data = await response.json();
        return data.errors;
    }
}

export const removeRestaurantThunk = (id) => async dispatch => {
    const response = await fetch(`/api/restaurants/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }

    });
    if (response.ok) {
        const data = await response.json();
        dispatch(removeARestaurant(id));
        // console.log('ok', id)
        return data;
    } else {
        const data = await response.json();
        // console.log('not ok-------', data.errors)
        return data.errors;
    }
}

const restaurantReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_RESTAURANT: {
            const newState = {};
            action.payload.restaurants.forEach(restaurant => newState[restaurant.id] = restaurant);
            newState.restaurants = [...action.payload.restaurants]
            return newState;
        }
        case GET_ONERESTAURANT: {
            const newState = {};
            newState.restaurant = action.payload
            return newState;
        }
        case POST_RESTAURANT: {
            // const newState = { ...action.payload, [action.payload.id]: action.payload }
            const newState = { ...state }
            newState[action.payload.id] = action.payload
            return newState;
        }
        case EDIT_RESTAURANT: {
            return { ...state, [action.payload.id]: action.payload };
        }
        case DELETE_RESTAURANT: {
            const newState = { ...state }
            delete newState[action.payload]
            return newState;
        }
        default:
            return state;
    }
}

export default restaurantReducer;
