import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';

export default function HomeSearch() {
    const dispatch = useDispatch();
    const history = useHistory();
    // to get today's dates
    const d = new Date()
    const todayMonth = d.getMonth() + 1
    const todayString = [d.getFullYear(), ('0' + todayMonth).slice(-2), ('0' + d.getDate()).slice(-2)].join('-')
    const nowHour = d.getHours();
    const availableHour_count = []

    const [partySize, setPartySize] = useState(2);
    const [searchTime, setSearchTime] = useState();
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
        <>
            <div>
                <input
                    type='date'
                    value={searchDate}
                    min={todayString}
                    max='2023-12-31'
                    onChange={e => setSearchDate(e.target.value)}
                ></input>
            </div>
            <div>
                <select className='create-res-input' value={searchTime} onChange={e => setSearchTime(e.target.value)} required >
                    <option value={''} selected disabled hidden>Select the hour</option>
                    {(availableHour_count.length > 0) ?
                        availableHour_count.map(each => {
                            return <option value={each} onClick={e => setSearchTime(e.target.value)}>{each}</option>
                        })
                        : (<option value={''} selected disabled hidden>No available time on the selected date</option>)
                    }
                </select>
            </div>
            <div>
                <select className='create-res-input' onChange={e => setPartySize(e.target.value)} max={999} required>
                    <option value={''} selected disabled hidden>Please select the capacity</option>
                    {capacity_count.map(each => (
                        <option value={each} >{each}  people</option>
                    ))}
                    <option value={21} >Larger Party</option>
                </select>
            </div>
            <div>
                <input
                    type='text'
                    placeholder='Location, Restaurant, or Cuisine'
                    onChange={e => setKeyWord(e.target.value)}
                    value={keyWord}
                    maxLength={50}
                    className='create-res-input'
                    required
                ></input>
            </div>
        </>
    )
}
