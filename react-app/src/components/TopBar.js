import React, { useState, useEffect } from 'react';
import '../components/navbar.css'

const TopBar = () => {
    const d = new Date()
    const UTCd = new Date(d.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }))
    // const UTCd = new Date(d.toLocaleString('en-US', { timeZone: 'America/New_York' }))
    // console.log('ok lets see the time 1-->', d)
    // console.log('ok lets see the time 2-->', UTCd)
    // console.log('ok lets see the time 3-->', typeof UTCd)
    const todayMonth = d.getMonth() + 1
    const todayDate = d.getDate()
    const todayString = [d.getFullYear(), ('0' + todayMonth).slice(-2), ('0' + d.getDate()).slice(-2)].join('-')
    const nowHour = ('0' + d.getHours()).slice(-2);
    const nowMinutes = ('0' + d.getMinutes()).slice(-2);

    return (
        <div className='topbar-container'>
            <div>Welcome to OpenTaste!</div >
            {/* <div>Set Timezone for this site is Pacific Standard Time </div > */}
            <div>Today is {todayString}</div >
            <div>Page last refreshed at {nowHour}:{nowMinutes}</div >
        </div>
    );
}

export default TopBar;
