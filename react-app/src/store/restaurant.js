const GET_RESTAURANT = 'session/GET_RESTAURANT';
const POST_RESTAURANT = 'session/POST_RESTAURANT';
const EDIT_RESTAURANT = 'session/EDIT_RESTAURANT';
const DELETE_RESTAURANT = 'session/DELETE_RESTAURANT';

const getAllRestaurant = () => ({
    type: GET_RESTAURANT,
    payload: restaurants
});

const getRestaurantDetails = () => ({
    type: GET_RESTAURANT,
    payload: restaurant
});

const createARestaurant = () => ({
    type: POST_RESTAURANT,
    payload: restaurant
})

const editARestaurant = () => ({
    type: EDIT_RESTAURANT,
    payload: restaurant
})

const removeARestaurant = () => ({
    type: DELETE_RESTAURANT,
    payload: id
})

export const getAllRestaurantThunk = () => dispatch => {
    const response = await fetch('/api/restaurants/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getAllRestaurant(data));
    } else {
        const data = await response.json();
        return data.errors;
    }
}
