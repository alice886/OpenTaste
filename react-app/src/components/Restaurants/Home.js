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

    const dollarSigns = ['', '$', '$$', '$$$', '$$$$'];

    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)

    return loaded && (
        <div>
            <NavLink to='/listnewrestaurant'> List Your Restaurant</NavLink>
            <br></br>
            <NavLink to='/myrestaurants'> My Restaurants</NavLink>
            <div className='find-your-table'>
                <h2>Find your table for any occasion</h2>
            </div>
            <div className='restaurants-container'>
                <h3>Browse restaurants on OpenTaste ... </h3>
                {restaurants?.map(restaurant => {
                    return <div className='home-restaurant' key={restaurant.id}>
                        <div className='home-res-cover'>
                            <img src={restaurant.cover} alt='restaurant img' height={'200px'}/>
                        </div>
                        <NavLink to={`/restaurants/${restaurant.id}`}>{restaurant.name}</NavLink>
                        <div>{dollarSigns[restaurant.price_range]} · {restaurant.cuisine} · {restaurant.city}</div>
                        <button>18:00</button>
                        <button>18:30</button>
                        <button>19:00</button>
                    </div>
                })
                }
            </div>

        </div>
    )
}


export default Home;
