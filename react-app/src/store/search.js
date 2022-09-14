const GET_SEARCH = 'search/GET_SEARCH';


const getSearch = restaurants => ({
    type: GET_SEARCH,
    payload: restaurants
});



export const searchRestaurantThunk = () => async dispatch => {
    const response = await fetch('/api/search', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        const searchRestaurant = await response.json();
        dispatch(getSearch(searchRestaurant));
        return searchRestaurant;
    } else {
        const data = await response.json();
        return data.errors;
    }
}

const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_SEARCH: {
            const newState = {};
            action.payload.forEach(restaurant => newState[restaurant.id] = restaurant);
            newState = [...action.payload]
            return newState;
        }
        default:
            return state;
    }
}

export default searchReducer;
