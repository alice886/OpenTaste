import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllRestaurantThunk } from '../../store/restaurant';

function Home() {
    const dispatch = useDispatch();
    const restaurants = useSelector(state => state.restaurant.restaurants)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllRestaurantThunk()).then(() => setLoaded(true))
    }, [dispatch])

    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)

    return loaded && (
        <div>
            <div className='find-your-table'>
                <h2>Find your table for any occasion</h2>
            </div>
            <div className='restaurants-container'>
                <h3>Available for you ... </h3>
                {restaurants.map(restaurant => {
                    return <div className='home-restaurant' key={restaurant.id}>
                        <NavLink to={`/restaurants/${restaurant.id}`}>{restaurant.name}</NavLink>
                        <div>🧂{restaurant.cuisine}</div>
                    </div>
                })
                }

            </div>

        </div>
    )
}


export default Home;
