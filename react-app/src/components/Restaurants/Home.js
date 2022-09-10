import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllRestaurantThunk } from '../../store/restaurant';
import { Modal } from '../context/Modal'
import MakeReservationModal from '../Reservations/Reservation_Create_Modal'
import HomeSearch from '../Search/home_search'
import defaultImg3 from '../../icons/defaultImg3.png'
import './home.css'

function Home() {
    const dispatch = useDispatch();
    const restaurants = useSelector(state => state.restaurant.restaurants)
    const [loaded, setLoaded] = useState(false)
    const [showHomeReserve, setShowHomeReserve] = useState(false)
    const [resId, setRestId] = useState()
    const [resTime, setResTime] = useState()

    // to get today's dates
    const d = new Date()
    const todayMonth = d.getMonth() + 1
    const todayString = [d.getFullYear(), ('0' + todayMonth).slice(-2), ('0' + d.getDate()).slice(-2)].join('-')
    const nowHour = d.getHours();

    // const slotGenerator = async (r) => {
    //     const closeHour = Number(r.close_time.slice(0, 2))
    //     const openHour = Number(r.open_time.slice(0, 2))
    //     const availableHour_count = []
    //     if (openHour > nowHour) {
    //         for (let i = openHour; i < openHour + 3; i++) {
    //             availableHour_count.push(i + ':00')
    //         }
    //     }
    //     if (nowHour > openHour && nowHour < closeHour) {
    //         for (let i = nowHour + 1; i < openHour + 4; i++) {
    //             availableHour_count.push(i + ':00')
    //         }
    //     }
    //     return availableHour_count;
    // }

    const handleHomeReserve = async (e, id) => {
        e.preventDefault();
        setRestId(id)
        setResTime(e.target.value)
        setShowHomeReserve(true)
    }

    const getHours = each => {
        return Number(each['close_time'].slice(0, 2));
    }

    useEffect(() => {
        dispatch(getAllRestaurantThunk()).then(() => setLoaded(true))
    }, [dispatch])

    const dollarSigns = ['', '$', '$$', '$$$', '$$$$'];

    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)
    console.log(showHomeReserve)

    return loaded && (
        <div >
            <div className='find-your-table'>
                <div className='find-banner'>Find your table for any occasion
                    {/* <HomeSearch /> */}
                </div>
            </div>
            <h3>Reserve a table now </h3>
            <div className='home-all-container'>
                {restaurants?.map(restaurant => {
                    return <div className='home-restaurants' key={restaurant.id}>
                        <NavLink className='home-res-nav-whole' to={`/restaurants/${restaurant.id}`}>
                            <div className='home-res-cover'>
                                <img src={restaurant.cover} alt='restaurant img' height={'200px'}
                                    onError={(e) => {
                                        if (e.target.src !== defaultImg3) { e.target.onerror = null; e.target.src = defaultImg3; }
                                    }} />
                            </div>
                            <div className='home-res-details'>
                                <div className='home-res-nav-div'>
                                    <NavLink className='home-res-nav' to={`/restaurants/${restaurant.id}`}>{restaurant.name}</NavLink>
                                </div>
                                <div className='home-res-dcl'>{dollarSigns[restaurant.price_range]} · {restaurant.cuisine} · {restaurant.city}</div>
                                <div className='home-res-timeslots'>
                                    <button onClick={e => handleHomeReserve(e, restaurant.id)} value={getHours(restaurant) - 3} disabled={getHours(restaurant) < nowHour}>{getHours(restaurant) - 3}:00</button>
                                    <button onClick={e => handleHomeReserve(e, restaurant.id)} value={getHours(restaurant) - 2} disabled={getHours(restaurant) < nowHour}>{getHours(restaurant) - 2}:00</button>
                                    <button onClick={e => handleHomeReserve(e, restaurant.id)} value={getHours(restaurant) - 1} disabled={getHours(restaurant) < nowHour}>{getHours(restaurant) - 1}:00</button>
                                    {/* <button onClick={e => handleHomeReserve(e, restaurant.id)} value={Number(restaurant.close_time.slice(0, 2)) - 3} >{Number(restaurant.close_time.slice(0, 2)) - 3}:00</button>
                                    <button onClick={e => handleHomeReserve(e, restaurant.id)} value={Number(restaurant.close_time.slice(0, 2)) - 2} >{Number(restaurant.close_time.slice(0, 2)) - 2}:00</button>
                                    <button onClick={e => handleHomeReserve(e, restaurant.id)} value={Number(restaurant.close_time.slice(0, 2)) - 1} >{Number(restaurant.close_time.slice(0, 2)) - 1}:00</button> */}
                                </div>
                            </div>
                        </NavLink>

                        {/* {restaurant => slotGenerator(restaurant).map(each => {
                            <div>{each}</div>
                        })} */}
                    </div >
                })
                }
            </div >
            {showHomeReserve && <Modal>
                <MakeReservationModal resId={resId} resTime={resTime} setShowHomeReserve={setShowHomeReserve} />
            </Modal>}

        </div >
    )
}


export default Home;
