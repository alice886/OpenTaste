import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';

export default function HomeSearch() {
    const dispatch = useDispatch();
    const history = useHistory();
    // to get today's dates
    let d = new Date()
    d = new Date(d.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))
    const todayMonth = d.getMonth() + 1
    const todayString = [d.getFullYear(), ('0' + todayMonth).slice(-2), ('0' + d.getDate()).slice(-2)].join('-')
    const nowHour = d.getHours();
    const availableHour_count = []

    const [partySize, setPartySize] = useState(2);
    const [searchTime, setSearchTime] = useState(('0' + (nowHour + 1)).slice(-2) + ':00');
    const [searchDate, setSearchDate] = useState(todayString);
    const [keyWord, setKeyWord] = useState()

    const capacity_count = []
    for (let i = 1; i < 21; i += 1) {
        capacity_count.push(i)
    }

    if (new Date(searchDate) > d) {
        for (let i = 0; i < 24; i++) {
            availableHour_count.push(('0' + i).slice(-2) + ':00')
        }
    }
    else {
        for (let i = nowHour + 1; i < 24; i++) {
            availableHour_count.push(i + ':00')

        }
    }

    return (
        <div className='home-search-container'>
            <div >
                <input
                    type='date'
                    value={searchDate}
                    min={todayString}
                    max='2023-12-31'
                    onChange={e => setSearchDate(e.target.value)}
                    className='home-search-dattimeppl'
                ></input>
            </div>
            <div>
                <select className='home-search-dattimeppl' value={searchTime} onChange={e => setSearchTime(e.target.value)} required >
                    {(availableHour_count.length > 0) ?
                        availableHour_count.map(each => {
                            return <option value={each} key={each} onClick={e => setSearchTime(e.target.value)}>{each}</option>
                        })
                        : (<option value={''} selected disabled hidden>* No available time on the selected date</option>)
                    }
                </select>
            </div>
            <div>
                <select className='home-search-dattimeppl' onChange={e => setPartySize(e.target.value)} max={999} required>
                    <option value={1} >1 People</option>
                    <option value={2} selected >2 People</option>
                    {capacity_count.map(each => (
                        <option value={each} key={each}>{each}  people</option>
                    ))}
                    <option value={21} >Larger Party</option>
                </select>
            </div>
            <div>
                <input
                    type='text'
                    placeholder='  🔎 Location, Restaurant, or Cuisine'
                    onChange={e => setKeyWord(e.target.value)}
                    value={keyWord}
                    maxLength={50}
                    className='home-search-input'
                    required
                ></input>
            </div>
            <button className='home-search-button'>Let's go</button>
        </div>
    )
}
