import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllRestaurantThunk } from '../../store/restaurant';
import { Modal } from '../context/Modal'
import MakeReservationModal from '../Reservations/Reservation_Create_Modal'
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

    useEffect(() => {
        dispatch(getAllRestaurantThunk()).then(() => setLoaded(true))
    }, [dispatch])

    const dollarSigns = ['', '$', '$$', '$$$', '$$$$'];

    // console.log('aws route for images -- dont delete', restaurants[3].images[0].img)
    console.log(showHomeReserve)

    return loaded && (
        <div>
            <div className='find-your-table'>
                <div className='find-banner'>Find your table for any occasion</div>
            </div>
            <div className='restaurants-container'>
                <h3>Browse restaurants on OpenTaste ... </h3>
                {restaurants?.map(restaurant => {
                    return <div className='home-restaurant' key={restaurant.id}>
                        <div className='home-res-cover'>
                            <img src={restaurant.cover} alt='restaurant img' height={'200px'} />
                        </div>
                        <NavLink to={`/restaurants/${restaurant.id}`}>{restaurant.name}</NavLink>
                        <div>{dollarSigns[restaurant.price_range]} · {restaurant.cuisine} · {restaurant.city}</div>
                        <button onClick={e => handleHomeReserve(e, restaurant.id)} value={Number(restaurant.close_time.slice(0, 2)) - 3} >{Number(restaurant.close_time.slice(0, 2)) - 3}:00</button>
                        <button onClick={e => handleHomeReserve(e, restaurant.id)} value={Number(restaurant.close_time.slice(0, 2)) - 2} >{Number(restaurant.close_time.slice(0, 2)) - 2}:00</button>
                        <button onClick={e => handleHomeReserve(e, restaurant.id)} value={Number(restaurant.close_time.slice(0, 2)) - 1} >{Number(restaurant.close_time.slice(0, 2)) - 1}:00</button>

                        {/* {restaurant => slotGenerator(restaurant).map(each => {
                            <div>{each}</div>
                        })} */}
                    </div>
                })
                }
            </div>
            {showHomeReserve && <Modal>
                <MakeReservationModal resId={resId} resTime={resTime} setShowHomeReserve={setShowHomeReserve} />
            </Modal>}

        </div>
    )
}


export default Home;
